import mongoose, { Schema, Document } from 'mongoose';
import { Painting as PaintingType } from '@/types';
import { slugify } from '@/lib/utils';

export interface PaintingDocument extends Omit<PaintingType, '_id'>, Document {}

const PaintingSchema = new Schema<PaintingDocument>({
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
    min: [0, 'Price cannot be negative'],
  },
  images: {
    type: [String],
    required: [true, 'At least one image is required'],
    validate: {
      validator: function(v: string[]) {
        return v && v.length > 0;
      },
      message: 'At least one image is required',
    },
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  medium: {
    type: String,
    required: [true, 'Medium is required'],
    trim: true,
  },
  dimensions: {
    width: {
      type: Number,
      required: [true, 'Width is required'],
      min: [0, 'Width cannot be negative'],
    },
    height: {
      type: Number,
      required: [true, 'Height is required'],
      min: [0, 'Height cannot be negative'],
    },
    unit: {
      type: String,
      enum: ['cm', 'inch'],
      required: [true, 'Unit is required'],
    },
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear(), 'Year cannot be in the future'],
  },
  forSale: {
    type: Boolean,
    default: false,
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
PaintingSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title);
  }
  next();
});

// Validate price when forSale is true
PaintingSchema.pre('save', function(next) {
  if (this.forSale && (!this.price || this.price <= 0)) {
    return next(new Error('Price is required when painting is for sale'));
  }
  next();
});

// Indexes for better query performance
PaintingSchema.index({ slug: 1 });
PaintingSchema.index({ category: 1 });
PaintingSchema.index({ forSale: 1, active: 1 });
PaintingSchema.index({ featured: 1, active: 1 });
PaintingSchema.index({ active: 1, createdAt: -1 });
PaintingSchema.index({ title: 'text', description: 'text', medium: 'text' });

export const Painting = mongoose.models.Painting || mongoose.model<PaintingDocument>('Painting', PaintingSchema);