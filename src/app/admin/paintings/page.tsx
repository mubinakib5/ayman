'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Painting } from '@/types';

export default function AdminPaintingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.role !== 'admin') {
      router.push('/auth/signin');
      return;
    }

    fetchPaintings();
  }, [session, status, router]);

  const fetchPaintings = async () => {
    try {
      const response = await fetch('/api/admin/paintings');
      if (response.ok) {
        const data = await response.json();
        setPaintings(data);
      }
    } catch (error) {
      console.error('Error fetching paintings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (paintingId: string) => {
    if (!confirm('Are you sure you want to delete this painting?')) return;
    
    setDeleteLoading(paintingId);
    try {
      const response = await fetch(`/api/admin/paintings/${paintingId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setPaintings(paintings.filter(painting => painting._id !== paintingId));
      } else {
        alert('Failed to delete painting');
      }
    } catch (error) {
      console.error('Error deleting painting:', error);
      alert('Error deleting painting');
    } finally {
      setDeleteLoading(null);
    }
  };

  const toggleActive = async (paintingId: string, currentActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/paintings/${paintingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: !currentActive }),
      });
      
      if (response.ok) {
        setPaintings(paintings.map(painting => 
          painting._id === paintingId ? { ...painting, active: !currentActive } : painting
        ));
      }
    } catch (error) {
      console.error('Error updating painting status:', error);
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="text-gold hover:text-yellow-400 transition-colors"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gold">Manage Paintings</h1>
            </div>
            <Link
              href="/admin/paintings/new"
              className="bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Add New Painting
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {paintings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No paintings found</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first painting.</p>
            <Link
              href="/admin/paintings/new"
              className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Add New Painting
            </Link>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-gold font-semibold">Painting</th>
                    <th className="px-6 py-4 text-left text-gold font-semibold">Dimensions</th>
                    <th className="px-6 py-4 text-left text-gold font-semibold">Price</th>
                    <th className="px-6 py-4 text-left text-gold font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-gold font-semibold">Featured</th>
                    <th className="px-6 py-4 text-left text-gold font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paintings.map((painting) => (
                    <tr key={painting._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          {painting.images && painting.images.length > 0 && (
                            <img
                              src={painting.images[0]}
                              alt={painting.title}
                              className="w-16 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <div className="font-semibold text-white">{painting.title}</div>
                            <div className="text-sm text-gray-400">{painting.medium}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {`${painting.dimensions.width} x ${painting.dimensions.height} ${painting.dimensions.unit}`}
                      </td>
                      <td className="px-6 py-4 text-gold font-semibold">
                        {painting.price ? `$${painting.price}` : 'Not for sale'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleActive(painting._id, painting.active)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            painting.active
                              ? 'bg-green-900 text-green-300 hover:bg-green-800'
                              : 'bg-red-900 text-red-300 hover:bg-red-800'
                          } transition-colors`}
                        >
                          {painting.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          painting.featured ? 'bg-gold text-black' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {painting.featured ? 'Featured' : 'Regular'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/paintings/${painting._id}/edit`}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(painting._id)}
                            disabled={deleteLoading === painting._id}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                          >
                            {deleteLoading === painting._id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}