import mongoose, { Schema, Document } from 'mongoose';
import { AboutSection as AboutSectionType } from '@/types';

export interface AboutSectionDocument extends Omit<AboutSectionType, '_id'>, Document {}

const AboutSectionSchema = new Schema<AboutSectionDocument>({
  section: {
    type: String,
    enum: ['BIOGRAPHY', 'JOURNEY', 'VISION'],
    required: [true, 'Section type is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
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

// Ensure unique section and order combination
AboutSectionSchema.index({ section: 1, order: 1 }, { unique: true });
AboutSectionSchema.index({ active: 1, order: 1 });

export const AboutSection = mongoose.models.AboutSection || mongoose.model<AboutSectionDocument>('AboutSection', AboutSectionSchema);