import mongoose, { Schema, Document } from 'mongoose';
import { Media as MediaType } from '@/types';
import { slugify } from '@/lib/utils';

export interface MediaDocument extends Omit<MediaType, '_id'>, Document {}

const MediaSchema = new Schema<MediaDocument>({
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
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  type: {
    type: String,
    enum: ['INTERVIEW', 'ARTICLE', 'VIDEO'],
    required: [true, 'Media type is required'],
  },
  url: {
    type: String,
    trim: true,
  },
  embedCode: {
    type: String,
    trim: true,
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail is required'],
  },
  publishedDate: {
    type: Date,
    required: [true, 'Published date is required'],
  },
  source: {
    type: String,
    required: [true, 'Source is required'],
    trim: true,
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
MediaSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title);
  }
  next();
});

// Validate that either url or embedCode is provided
MediaSchema.pre('save', function(next) {
  if (!this.url && !this.embedCode) {
    return next(new Error('Either URL or embed code must be provided'));
  }
  next();
});

// Indexes for better query performance
MediaSchema.index({ slug: 1 });
MediaSchema.index({ type: 1, active: 1 });
MediaSchema.index({ featured: 1, active: 1 });
MediaSchema.index({ active: 1, publishedDate: -1 });
MediaSchema.index({ title: 'text', description: 'text', source: 'text' });

export const Media = mongoose.models.Media || mongoose.model<MediaDocument>('Media', MediaSchema);