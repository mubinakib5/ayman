'use client';

import { useState, useCallback } from 'react';
import { CloudinaryUploadResult } from '@/lib/cloudinary';

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UseFileUploadOptions {
  folder?: string;
  tags?: string[];
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  onProgress?: (progress: UploadProgress) => void;
  onSuccess?: (result: CloudinaryUploadResult) => void;
  onError?: (error: string) => void;
}

export interface UseFileUploadReturn {
  uploadFile: (file: File) => Promise<CloudinaryUploadResult | null>;
  deleteFile: (publicId: string, resourceType?: 'image' | 'video' | 'raw') => Promise<boolean>;
  isUploading: boolean;
  progress: UploadProgress | null;
  error: string | null;
  clearError: () => void;
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_ALLOWED_TYPES = [
  'image/jpeg',
  'image/png', 
  'image/webp',
  'image/gif',
  'application/pdf'
];

export function useFileUpload(options: UseFileUploadOptions = {}): UseFileUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    folder,
    tags,
    maxSize = DEFAULT_MAX_SIZE,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    onProgress,
    onSuccess,
    onError,
  } = options;

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const validateFile = useCallback((file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
    }

    if (file.size > maxSize) {
      return `File too large. Maximum size: ${(maxSize / (1024 * 1024)).toFixed(1)}MB`;
    }

    return null;
  }, [allowedTypes, maxSize]);

  const uploadFile = useCallback(async (file: File): Promise<CloudinaryUploadResult | null> => {
    try {
      setError(null);
      setProgress(null);

      // Validate file
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        onError?.(validationError);
        return null;
      }

      setIsUploading(true);

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      if (folder) formData.append('folder', folder);
      if (tags) formData.append('tags', tags.join(','));

      // Upload with progress tracking
      const xhr = new XMLHttpRequest();
      
      return new Promise<CloudinaryUploadResult | null>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progressData: UploadProgress = {
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100),
            };
            setProgress(progressData);
            onProgress?.(progressData);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              if (response.success) {
                onSuccess?.(response.data);
                resolve(response.data);
              } else {
                const errorMsg = response.error || 'Upload failed';
                setError(errorMsg);
                onError?.(errorMsg);
                resolve(null);
              }
            } catch (parseError) {
              const errorMsg = 'Invalid response from server';
              setError(errorMsg);
              onError?.(errorMsg);
              resolve(null);
            }
          } else {
            const errorMsg = `Upload failed with status: ${xhr.status}`;
            setError(errorMsg);
            onError?.(errorMsg);
            resolve(null);
          }
        });

        xhr.addEventListener('error', () => {
          const errorMsg = 'Network error during upload';
          setError(errorMsg);
          onError?.(errorMsg);
          resolve(null);
        });

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMsg);
      onError?.(errorMsg);
      return null;
    } finally {
      setIsUploading(false);
      setProgress(null);
    }
  }, [folder, tags, validateFile, onProgress, onSuccess, onError]);

  const deleteFile = useCallback(async (
    publicId: string, 
    resourceType: 'image' | 'video' | 'raw' = 'image'
  ): Promise<boolean> => {
    try {
      setError(null);

      const response = await fetch(
        `/api/upload?publicId=${encodeURIComponent(publicId)}&resourceType=${resourceType}`,
        {
          method: 'DELETE',
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        return true;
      } else {
        const errorMsg = result.error || 'Delete failed';
        setError(errorMsg);
        onError?.(errorMsg);
        return false;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Delete failed';
      setError(errorMsg);
      onError?.(errorMsg);
      return false;
    }
  }, [onError]);

  return {
    uploadFile,
    deleteFile,
    isUploading,
    progress,
    error,
    clearError,
  };
}