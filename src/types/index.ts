export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface Book {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  coverImage: string;
  pdfUrl: string;
  previewImages: string[];
  author: string;
  publishedYear: number;
  pages: number;
  isbn?: string;
  category: string;
  tags: string[];
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Painting {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price?: number;
  images: string[];
  category: string;
  medium: string;
  dimensions: {
    width: number;
    height: number;
    unit: 'cm' | 'inch';
  };
  year: number;
  forSale: boolean;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  orderId: string;
  userId: string;
  items: OrderItem[];
  total: number;
  currency: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';
  paymentMethod: 'SSLCOMMERZ';
  paymentId?: string;
  transactionId?: string;
  shippingAddress?: ShippingAddress;
  customerInfo: CustomerInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  type: 'BOOK' | 'PAINTING';
  itemId: string;
  title: string;
  price: number;
  quantity: number;
  downloadToken?: string;
  downloadExpiresAt?: Date;
  downloadCount?: number;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Media {
  _id: string;
  title: string;
  slug: string;
  description: string;
  type: 'INTERVIEW' | 'ARTICLE' | 'VIDEO';
  url?: string;
  embedCode?: string;
  thumbnail: string;
  publishedDate: Date;
  source: string;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Timeline {
  _id: string;
  year: number;
  title: string;
  description: string;
  image?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AboutSection {
  _id: string;
  section: 'BIOGRAPHY' | 'JOURNEY' | 'VISION';
  title: string;
  content: string;
  image?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  type: 'BOOK' | 'PAINTING';
  itemId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface SearchResult {
  type: 'BOOK' | 'PAINTING' | 'MEDIA' | 'BLOG';
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  url: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface SSLCommerzConfig {
  store_id: string;
  store_passwd: string;
  total_amount: number;
  currency: string;
  tran_id: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  ipn_url: string;
  cus_name: string;
  cus_email: string;
  cus_add1: string;
  cus_city: string;
  cus_state: string;
  cus_postcode: string;
  cus_country: string;
  cus_phone: string;
  product_name: string;
  product_category: string;
  product_profile: string;
}

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  resource_type: string;
  bytes: number;
  width?: number;
  height?: number;
}

export interface DownloadLog {
  _id: string;
  userId: string;
  orderId: string;
  itemId: string;
  downloadToken: string;
  ipAddress: string;
  userAgent: string;
  downloadedAt: Date;
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logoUrl: string;
  faviconUrl: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  contactEmail: string;
  contactPhone: string;
  address: string;
  heroSection: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    ctaText: string;
    ctaUrl: string;
  };
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
  updatedAt: Date;
}