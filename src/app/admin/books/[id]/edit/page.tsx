'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Book } from '@/types';

interface BookFormData {
  title: string;
  author: string;
  description: string;
  price: string;
  category: string;
  coverImage: string;
  pdfFile: string;
  featured: boolean;
  active: boolean;
}

interface EditBookPageProps {
  params: {
    id: string;
  };
}

export default function EditBookPage({ params }: EditBookPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    description: '',
    price: '',
    category: '',
    coverImage: '',
    pdfFile: '',
    featured: false,
    active: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    uploadFile: uploadCover,
    isUploading: uploadingCover,
    error: coverError
  } = useFileUpload();

  const {
    uploadFile: uploadPdf,
    isUploading: uploadingPdf,
    error: pdfError
  } = useFileUpload();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.role !== 'admin') {
      router.push('/auth/signin');
      return;
    }

    fetchBook();
  }, [session, status, router, params.id]);

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/admin/books/${params.id}`);
      if (response.ok) {
        const bookData = await response.json();
        setBook(bookData);
        setFormData({
          title: bookData.title || '',
          author: bookData.author || '',
          description: bookData.description || '',
          price: bookData.price?.toString() || '',
          category: bookData.category || '',
          coverImage: bookData.coverImage || '',
          pdfFile: bookData.pdfFile || '',
          featured: bookData.featured || false,
          active: bookData.active !== undefined ? bookData.active : true
        });
      } else if (response.status === 404) {
        router.push('/admin/books');
      }
    } catch (error) {
      console.error('Error fetching book:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadCover(file);
      if (result) {
        setFormData(prev => ({ ...prev, coverImage: result.secure_url }));
      }
    } catch (error) {
      console.error('Cover upload error:', error);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadPdf(file);
      if (result) {
        setFormData(prev => ({ ...prev, pdfFile: result.secure_url }));
      }
    } catch (error) {
      console.error('PDF upload error:', error);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (isNaN(parseFloat(formData.price))) newErrors.price = 'Price must be a valid number';
    if (!formData.category.trim()) newErrors.category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/books/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/books');
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.error || 'Failed to update book' });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setErrors({ submit: 'An error occurred while updating the book' });
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gold text-xl">Loading...</div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400 text-xl">Book not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-6">
            <Link
              href="/admin/books"
              className="text-gold hover:text-yellow-400 transition-colors"
            >
              ← Back to Books
            </Link>
            <h1 className="text-3xl font-bold text-gold">Edit Book</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg border border-gray-800 p-8">
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gold mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="Enter book title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gold mb-2">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="Enter author name"
              />
              {errors.author && <p className="mt-1 text-sm text-red-400">{errors.author}</p>}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gold mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-sm text-red-400">{errors.price}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gold mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Science">Science</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Poetry">Poetry</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-400">{errors.category}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gold mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold focus:border-transparent"
              placeholder="Enter book description"
            />
            {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
          </div>

          {/* Cover Image Upload */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gold mb-2">
              Cover Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                disabled={uploadingCover}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-black hover:file:bg-yellow-400 file:cursor-pointer"
              />
              {uploadingCover && <span className="text-gold">Uploading...</span>}
            </div>
            {coverError && <p className="mt-1 text-sm text-red-400">{coverError}</p>}
            {formData.coverImage && (
              <div className="mt-2">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-32 h-40 object-cover rounded-lg border border-gray-700"
                />
              </div>
            )}
          </div>

          {/* PDF File Upload */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gold mb-2">
              PDF File
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                disabled={uploadingPdf}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-black hover:file:bg-yellow-400 file:cursor-pointer"
              />
              {uploadingPdf && <span className="text-gold">Uploading...</span>}
            </div>
            {pdfError && <p className="mt-1 text-sm text-red-400">{pdfError}</p>}
            {formData.pdfFile && (
              <div className="mt-2">
                <p className="text-green-400 text-sm">✓ PDF file available</p>
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="mt-6 flex items-center space-x-8">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 text-gold bg-gray-800 border-gray-700 rounded focus:ring-gold focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-300">Featured Book</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
                className="w-4 h-4 text-gold bg-gray-800 border-gray-700 rounded focus:ring-gold focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-300">Active</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex items-center justify-end space-x-4">
            <Link
              href="/admin/books"
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving || uploadingCover || uploadingPdf}
              className="px-6 py-2 bg-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}