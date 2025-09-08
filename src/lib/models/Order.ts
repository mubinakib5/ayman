import mongoose, { Schema, Document } from 'mongoose';
import { Order as OrderType, OrderItem, ShippingAddress, CustomerInfo } from '@/types';
import { generateOrderId } from '@/lib/utils';

export interface OrderDocument extends Omit<OrderType, '_id'>, Document {}

const OrderItemSchema = new Schema<OrderItem>({
  type: {
    type: String,
    enum: ['BOOK', 'PAINTING'],
    required: [true, 'Item type is required'],
  },
  itemId: {
    type: String,
    required: [true, 'Item ID is required'],
  },
  title: {
    type: String,
    required: [true, 'Item title is required'],
  },
  price: {
    type: Number,
    required: [true, 'Item price is required'],
    min: [0, 'Price cannot be negative'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
  downloadToken: {
    type: String,
  },
  downloadExpiresAt: {
    type: Date,
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
}, { _id: false });

const ShippingAddressSchema = new Schema<ShippingAddress>({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
  },
}, { _id: false });

const CustomerInfoSchema = new Schema<CustomerInfo>({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Customer email is required'],
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Customer phone is required'],
    trim: true,
  },
}, { _id: false });

const OrderSchema = new Schema<OrderDocument>({
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: String,
  },
  items: {
    type: [OrderItemSchema],
    required: [true, 'Order items are required'],
    validate: {
      validator: function(v: OrderItem[]) {
        return v && v.length > 0;
      },
      message: 'At least one item is required',
    },
  },
  total: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total cannot be negative'],
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    default: 'BDT',
  },
  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'FAILED', 'CANCELLED'],
    default: 'PENDING',
  },
  paymentMethod: {
    type: String,
    enum: ['SSLCOMMERZ'],
    required: [true, 'Payment method is required'],
  },
  paymentId: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  shippingAddress: {
    type: ShippingAddressSchema,
  },
  customerInfo: {
    type: CustomerInfoSchema,
    required: [true, 'Customer information is required'],
  },
}, {
  timestamps: true,
});

// Generate order ID before saving
OrderSchema.pre('save', function(next) {
  if (this.isNew && !this.orderId) {
    this.orderId = generateOrderId();
  }
  next();
});

// Calculate total from items
OrderSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  next();
});

// Indexes for better query performance
OrderSchema.index({ orderId: 1 });
OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ paymentId: 1 });
OrderSchema.index({ transactionId: 1 });
OrderSchema.index({ 'customerInfo.email': 1 });

export const Order = mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);