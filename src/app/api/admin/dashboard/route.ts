import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { User, Book, Painting, Order } from '@/lib/models';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Get counts for each content type
    const [totalBooks, totalPaintings, totalOrders, totalUsers] = await Promise.all([
      Book.countDocuments(),
      Painting.countDocuments(),
      Order.countDocuments(),
      User.countDocuments()
    ]);

    // Get recent orders with customer details
    const recentOrders = await Order.find()
      .populate('customer', 'name email')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const dashboardStats = {
      totalBooks,
      totalPaintings,
      totalOrders,
      totalUsers,
      recentOrders: recentOrders.map(order => {
        const orderDoc = order as unknown as { _id: mongoose.Types.ObjectId };
        return {
          _id: orderDoc._id.toString(),
          orderId: order.orderId,
          customer: {
            name: order.customer?.name || 'Unknown',
            email: order.customer?.email || 'Unknown'
          },
          total: order.total,
          status: order.status,
          createdAt: order.createdAt
        };
      })
    };

    return NextResponse.json(dashboardStats);
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}