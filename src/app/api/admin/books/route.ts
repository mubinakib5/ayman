import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { Book } from '@/lib/models';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .lean();

    const formattedBooks = books.map(book => {
      const bookDoc = book as unknown as { _id: mongoose.Types.ObjectId };
      return {
        ...book,
        _id: bookDoc._id.toString()
      };
    });

    return NextResponse.json(formattedBooks);
  } catch (error) {
    console.error('Books API error:', error);
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
      author,
      description,
      price,
      category,
      coverImage,
      pdfFile,
      featured,
      active
    } = body;

    // Validate required fields
    if (!title || !author || !description || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const book = new Book({
      title,
      author,
      description,
      price: parseFloat(price),
      category,
      coverImage,
      pdfFile,
      featured: featured || false,
      active: active !== undefined ? active : true
    });

    await book.save();

    const bookObj = book.toObject();
    return NextResponse.json({
      ...bookObj,
      _id: book._id.toString()
    }, { status: 201 });
  } catch (error) {
    console.error('Create book error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}