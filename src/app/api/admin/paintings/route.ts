import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { Painting } from '@/lib/models';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const paintings = await Painting.find()
      .sort({ createdAt: -1 })
      .lean();

    const formattedPaintings = paintings.map(painting => {
      const paintingDoc = painting as unknown as { _id: mongoose.Types.ObjectId };
      return {
        ...painting,
        _id: paintingDoc._id.toString()
      };
    });

    return NextResponse.json(formattedPaintings);
  } catch (error) {
    console.error('Paintings API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      price,
      medium,
      dimensions,
      year,
      image,
      featured,
      active,
      forSale
    } = body;

    // Validate required fields
    if (!title || !description || !medium || !dimensions) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const painting = new Painting({
      title,
      description,
      price: price ? parseFloat(price) : undefined,
      medium,
      dimensions,
      year: year ? parseInt(year) : undefined,
      image,
      featured: featured || false,
      active: active !== undefined ? active : true,
      forSale: forSale !== undefined ? forSale : !!price
    });

    await painting.save();

    const paintingObj = painting.toObject();
    return NextResponse.json({
      ...paintingObj,
      _id: painting._id.toString()
    }, { status: 201 });
  } catch (error) {
    console.error('Create painting error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}