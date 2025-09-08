import mongoose, { Schema, Document } from 'mongoose';
import { Timeline as TimelineType } from '@/types';

export interface TimelineDocument extends Omit<TimelineType, '_id'>, Document {}

const TimelineSchema = new Schema<TimelineDocument>({
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear() + 10, 'Year cannot be too far in the future'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  image: {
    type: String,
  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
    min: [0, 'Order cannot be negative'],
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
TimelineSchema.index({ active: 1, order: 1 });
TimelineSchema.index({ year: -1 });
TimelineSchema.index({ order: 1 });

export const Timeline = mongoose.models.Timeline || mongoose.model<TimelineDocument>('Timeline', TimelineSchema);