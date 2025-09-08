'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Book } from '@/types';

export default function AdminBooksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.role !== 'admin') {
      router.push('/auth/signin');
      return;
    }

    fetchBooks();
  }, [session, status, router]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/admin/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    setDeleteLoading(bookId);
    try {
      const response = await fetch(`/api/admin/books/${bookId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setBooks(books.filter(book => book._id !== bookId));
      } else {
        alert('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Error deleting book');
    } finally {
      setDeleteLoading(null);
    }
  };

  const toggleActive = async (bookId: string, currentActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/books/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: !currentActive }),
      });
      
      if (response.ok) {
        setBooks(books.map(book => 
          book._id === bookId ? { ...book, active: !currentActive } : book
        ));
      }
    } catch (error) {
      console.error('Error updating book status:', error);
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
              <h1 className="text-3xl font-bold text-gold">Manage Books</h1>
            </div>
            <Link
              href="/admin/books/new"
              className="bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Add New Book
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {books.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No books found</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first book.</p>
            <Link
              href="/admin/books/new"
              className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Add New Book
            </Link>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-gold font-semibold">Book</th>
                    <th className="px-6 py-4 text-left text-gold font-semibold">Author</th>
                    <th className="px-6 py-4 text-left text-gold font-semibold">Price</th>
                    <th className="px-6 py-4 text-left text-gold font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-gold font-semibold">Featured</th>
                    <th className="px-6 py-4 text-left text-gold font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          {book.coverImage && (
                            <img
                              src={book.coverImage}
                              alt={book.title}
                              className="w-12 h-16 object-cover rounded"
                            />
                          )}
                          <div>
                            <div className="font-semibold text-white">{book.title}</div>
                            <div className="text-sm text-gray-400">{book.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{book.author}</td>
                      <td className="px-6 py-4 text-gold font-semibold">${book.price}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleActive(book._id, book.active)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            book.active
                              ? 'bg-green-900 text-green-300 hover:bg-green-800'
                              : 'bg-red-900 text-red-300 hover:bg-red-800'
                          } transition-colors`}
                        >
                          {book.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          book.featured ? 'bg-gold text-black' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {book.featured ? 'Featured' : 'Regular'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/books/${book._id}/edit`}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(book._id)}
                            disabled={deleteLoading === book._id}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                          >
                            {deleteLoading === book._id ? 'Deleting...' : 'Delete'}
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