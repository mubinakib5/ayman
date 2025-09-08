import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { Painting } from '@/lib/models';
import mongoose from 'mongoose';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid painting ID' }, { status: 400 });
    }

    await connectToDatabase();

    const painting = await Painting.findById(id).lean();

    if (!painting) {
      return NextResponse.json({ error: 'Painting not found' }, { status: 404 });
    }

    const paintingDoc = painting as unknown as { _id: mongoose.Types.ObjectId };
    return NextResponse.json({
      ...painting,
      _id: paintingDoc._id.toString()
    });
  } catch (error) {
    console.error('Get painting error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid painting ID' }, { status: 400 });
    }

    await connectToDatabase();

    const updateData: Partial<{
      title: string;
      description: string;
      price: number;
      medium: string;
      dimensions: string;
      year: number;
      image: string;
      featured: boolean;
      active: boolean;
      forSale: boolean;
      updatedAt: Date;
    }> = {};
    
    // Only update provided fields
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.price !== undefined) updateData.price = body.price ? parseFloat(body.price) : undefined;
    if (body.medium !== undefined) updateData.medium = body.medium;
    if (body.dimensions !== undefined) updateData.dimensions = body.dimensions;
    if (body.year !== undefined) updateData.year = body.year ? parseInt(body.year) : undefined;
    if (body.image !== undefined) updateData.image = body.image;
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.active !== undefined) updateData.active = body.active;
    if (body.forSale !== undefined) updateData.forSale = body.forSale;

    updateData.updatedAt = new Date();

    const painting = await Painting.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!painting) {
      return NextResponse.json({ error: 'Painting not found' }, { status: 404 });
    }

    const paintingDoc = painting as unknown as { _id: mongoose.Types.ObjectId };
    return NextResponse.json({
      ...painting,
      _id: paintingDoc._id.toString()
    });
  } catch (error) {
    console.error('Update painting error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid painting ID' }, { status: 400 });
    }

    await connectToDatabase();

    const painting = await Painting.findByIdAndDelete(id);

    if (!painting) {
      return NextResponse.json({ error: 'Painting not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Painting deleted successfully' });
  } catch (error) {
    console.error('Delete painting error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}