import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  format: string;
  resource_type: string;
  bytes: number;
}

export interface UploadOptions {
  folder?: string;
  public_id?: string;
  resource_type?: 'image' | 'video' | 'raw' | 'auto';
  format?: string;
  transformation?: Record<string, unknown>[];
  tags?: string[];
}

/**
 * Upload file to Cloudinary
 */
export async function uploadToCloudinary(
  file: string | Buffer,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  try {
    const uploadOptions = {
      folder: options.folder || 'ayman-portfolio',
      resource_type: options.resource_type || 'auto',
      ...options,
    };

    // Convert Buffer to base64 data URL if needed
    const fileToUpload = Buffer.isBuffer(file) 
      ? `data:application/octet-stream;base64,${file.toString('base64')}`
      : file;

    const result = await cloudinary.uploader.upload(fileToUpload, uploadOptions);
    
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
}

/**
 * Delete file from Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete file from Cloudinary');
  }
}

/**
 * Generate optimized image URL with transformations
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
    crop?: string;
    gravity?: string;
  } = {}
): string {
  const transformation = [];
  
  if (options.width || options.height) {
    const resize: Record<string, unknown> = { crop: options.crop || 'fill' };
    if (options.width) resize.width = options.width;
    if (options.height) resize.height = options.height;
    if (options.gravity) resize.gravity = options.gravity;
    transformation.push(resize);
  }
  
  if (options.quality) {
    transformation.push({ quality: options.quality });
  }
  
  if (options.format) {
    transformation.push({ format: options.format });
  }
  
  return cloudinary.url(publicId, {
    transformation,
    secure: true,
  });
}

/**
 * Generate thumbnail URL for images
 */
export function getThumbnailUrl(
  publicId: string,
  size: 'small' | 'medium' | 'large' = 'medium'
): string {
  const sizes = {
    small: { width: 150, height: 150 },
    medium: { width: 300, height: 300 },
    large: { width: 600, height: 600 },
  };
  
  return getOptimizedImageUrl(publicId, {
    ...sizes[size],
    quality: 'auto',
    format: 'webp',
    crop: 'fill',
    gravity: 'center',
  });
}

/**
 * Upload multiple files to Cloudinary
 */
export async function uploadMultipleFiles(
  files: (string | Buffer)[],
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult[]> {
  try {
    const uploadPromises = files.map(file => uploadToCloudinary(file, options));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw new Error('Failed to upload multiple files');
  }
}

/**
 * Get file info from Cloudinary
 */
export async function getFileInfo(publicId: string): Promise<Record<string, unknown>> {
  try {
    return await cloudinary.api.resource(publicId);
  } catch (error) {
    console.error('Get file info error:', error);
    throw new Error('Failed to get file information');
  }
}

export default cloudinary;