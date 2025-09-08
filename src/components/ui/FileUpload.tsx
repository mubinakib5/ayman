'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useFileUpload, UseFileUploadOptions, UploadProgress } from '@/hooks/useFileUpload';
import { CloudinaryUploadResult } from '@/lib/cloudinary';

export interface FileUploadProps extends UseFileUploadOptions {
  onUploadComplete?: (result: CloudinaryUploadResult) => void;
  onUploadError?: (error: string) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function FileUpload({
  onUploadComplete,
  onUploadError,
  accept,
  multiple = false,
  disabled = false,
  className = '',
  children,
  ...uploadOptions
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<CloudinaryUploadResult[]>([]);

  const { uploadFile, isUploading, progress, error, clearError } = useFileUpload({
    ...uploadOptions,
    onSuccess: (result) => {
      setUploadedFiles(prev => [...prev, result]);
      onUploadComplete?.(result);
      uploadOptions.onSuccess?.(result);
    },
    onError: (error) => {
      onUploadError?.(error);
      uploadOptions.onError?.(error);
    },
  });

  const handleFiles = useCallback(async (files: FileList) => {
    if (disabled || isUploading) return;

    clearError();
    const fileArray = Array.from(files);

    if (!multiple && fileArray.length > 1) {
      onUploadError?.('Only one file is allowed');
      return;
    }

    for (const file of fileArray) {
      await uploadFile(file);
      if (!multiple) break; // Only upload one file if multiple is false
    }
  }, [disabled, isUploading, multiple, uploadFile, clearError, onUploadError]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled || isUploading) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  }, [disabled, isUploading, handleFiles]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input value to allow uploading the same file again
    e.target.value = '';
  }, [handleFiles]);

  const openFileDialog = useCallback(() => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  }, [disabled, isUploading]);

  const defaultClassName = `
    relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
    ${dragActive ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 hover:border-gray-400'}
    ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : ''}
    ${error ? 'border-red-300 bg-red-50' : ''}
  `.trim();

  return (
    <div className={className}>
      <div
        className={defaultClassName}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled || isUploading}
        />

        {children ? (
          children
        ) : (
          <div className="space-y-2">
            <div className="text-4xl text-gray-400">📁</div>
            <div className="text-lg font-medium text-gray-700">
              {isUploading ? 'Uploading...' : 'Drop files here or click to browse'}
            </div>
            <div className="text-sm text-gray-500">
              {accept ? `Accepted formats: ${accept}` : 'All file types accepted'}
            </div>
          </div>
        )}

        {isUploading && progress && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {progress.percentage}% ({(progress.loaded / (1024 * 1024)).toFixed(1)}MB / {(progress.total / (1024 * 1024)).toFixed(1)}MB)
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-green-50 border border-green-200 rounded p-2">
              <div className="flex items-center space-x-2">
                <div className="text-green-600">✓</div>
                <div className="text-sm">
                  <div className="font-medium">{file.public_id}</div>
                  <div className="text-gray-500">
                    {file.format.toUpperCase()} • {(file.bytes / (1024 * 1024)).toFixed(1)}MB
                  </div>
                </div>
              </div>
              <a
                href={file.secure_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;