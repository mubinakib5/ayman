import mongoose, { Schema, Document } from 'mongoose';
import { Book as BookType } from '@/types';
import { slugify } from '@/lib/utils';

export interface BookDocument extends Omit<BookType, '_id'>, Document {}

const BookSchema = new Schema<BookDocument>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  coverImage: {
    type: String,
    required: [true, 'Cover image is required'],
  },
  pdfUrl: {
    type: String,
    required: [true, 'PDF URL is required'],
  },
  previewImages: {
    type: [String],
    default: [],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters'],
  },
  publishedYear: {
    type: Number,
    required: [true, 'Published year is required'],
    min: [1900, 'Published year must be after 1900'],
    max: [new Date().getFullYear(), 'Published year cannot be in the future'],
  },
  pages: {
    type: Number,
    required: [true, 'Number of pages is required'],
    min: [1, 'Pages must be at least 1'],
  },
  isbn: {
    type: String,
    trim: true,
    match: [/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/, 'Please enter a valid ISBN'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Generate slug before saving
BookSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title);
  }
  next();
});

// Indexes for better query performance
BookSchema.index({ slug: 1 });
BookSchema.index({ category: 1 });
BookSchema.index({ featured: 1, active: 1 });
BookSchema.index({ active: 1, createdAt: -1 });
BookSchema.index({ title: 'text', description: 'text', author: 'text' });

export const Book = mongoose.models.Book || mongoose.model<BookDocument>('Book', BookSchema);