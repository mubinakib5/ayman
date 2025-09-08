'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Painting } from '@/types';

interface PaintingFormData {
  title: string;
  description: string;
  price: string;
  medium: string;
  dimensions: string;
  year: string;
  image: string;
  featured: boolean;
  active: boolean;
  forSale: boolean;
}

interface EditPaintingPageProps {
  params: {
    id: string;
  };
}

export default function EditPaintingPage({ params }: EditPaintingPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [painting, setPainting] = useState<Painting | null>(null);
  const [formData, setFormData] = useState<PaintingFormData>({
    title: '',
    description: '',
    price: '',
    medium: '',
    dimensions: '',
    year: '',
    image: '',
    featured: false,
    active: true,
    forSale: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    uploadFile: uploadImage,
    isUploading: uploadingImage,
    error: imageError
  } = useFileUpload();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.role !== 'admin') {
      router.push('/auth/signin');
      return;
    }

    fetchPainting();
  }, [session, status, router, params.id]);

  const fetchPainting = async () => {
    try {
      const response = await fetch(`/api/admin/paintings/${params.id}`);
      if (response.ok) {
        const paintingData = await response.json();
        setPainting(paintingData);
        setFormData({
          title: paintingData.title || '',
          description: paintingData.description || '',
          price: paintingData.price?.toString() || '',
          medium: paintingData.medium || '',
          dimensions: paintingData.dimensions || '',
          year: paintingData.year?.toString() || '',
          image: paintingData.image || '',
          featured: paintingData.featured || false,
          active: paintingData.active !== undefined ? paintingData.active : true,
          forSale: paintingData.forSale !== undefined ? paintingData.forSale : false
        });
      } else if (response.status === 404) {
        router.push('/admin/paintings');
      }
    } catch (error) {
      console.error('Error fetching painting:', error);
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadImage(file);
      if (result) {
        setFormData(prev => ({ ...prev, image: result.secure_url }));
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.medium.trim()) newErrors.medium = 'Medium is required';
    if (!formData.dimensions.trim()) newErrors.dimensions = 'Dimensions are required';
    if (formData.price && isNaN(parseFloat(formData.price))) {
      newErrors.price = 'Price must be a valid number';
    }
    if (formData.year && (isNaN(parseInt(formData.year)) || parseInt(formData.year) < 1000 || parseInt(formData.year) > new Date().getFullYear())) {
      newErrors.year = 'Year must be a valid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/paintings/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/paintings');
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.error || 'Failed to update painting' });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setErrors({ submit: 'An error occurred while updating the painting' });
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

  if (!painting) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400 text-xl">Painting not found</div>
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
              href="/admin/paintings"
              className="text-gold hover:text-yellow-400 transition-colors"
            >
              ← Back to Paintings
            </Link>
            <h1 className="text-3xl font-bold text-gold">Edit Painting</h1>
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
                placeholder="Enter painting title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
            </div>

            {/* Medium */}
            <div>
              <label htmlFor="medium" className="block text-sm font-medium text-gold mb-2">
                Medium *
              </label>
              <input
                type="text"
                id="medium"
                name="medium"
                value={formData.medium}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="e.g., Oil on canvas, Watercolor, Acrylic"
              />
              {errors.medium && <p className="mt-1 text-sm text-red-400">{errors.medium}</p>}
            </div>

            {/* Dimensions */}
            <div>
              <label htmlFor="dimensions" className="block text-sm font-medium text-gold mb-2">
                Dimensions *
              </label>
              <input
                type="text"
                id="dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="e.g., 24 x 36 inches, 60 x 90 cm"
              />
              {errors.dimensions && <p className="mt-1 text-sm text-red-400">{errors.dimensions}</p>}
            </div>

            {/* Year */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gold mb-2">
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                min="1000"
                max={new Date().getFullYear()}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="e.g., 2023"
              />
              {errors.year && <p className="mt-1 text-sm text-red-400">{errors.year}</p>}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gold mb-2">
                Price ($)
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
                placeholder="0.00 (leave empty if not for sale)"
              />
              {errors.price && <p className="mt-1 text-sm text-red-400">{errors.price}</p>}
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
              placeholder="Enter painting description"
            />
            {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
          </div>

          {/* Image Upload */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gold mb-2">
              Painting Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-black hover:file:bg-yellow-400 file:cursor-pointer"
              />
              {uploadingImage && <span className="text-gold">Uploading...</span>}
            </div>
            {imageError && <p className="mt-1 text-sm text-red-400">{imageError}</p>}
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Painting preview"
                  className="w-48 h-32 object-cover rounded-lg border border-gray-700"
                />
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="mt-6 flex items-center space-x-8">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="forSale"
                checked={formData.forSale}
                onChange={handleInputChange}
                className="w-4 h-4 text-gold bg-gray-800 border-gray-700 rounded focus:ring-gold focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-300">For Sale</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 text-gold bg-gray-800 border-gray-700 rounded focus:ring-gold focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-300">Featured Painting</span>
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
              href="/admin/paintings"
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving || uploadingImage}
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