'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalBooks: number;
  totalPaintings: number;
  totalOrders: number;
  totalUsers: number;
  recentOrders: Array<{
    _id: string;
    orderId: string;
    customer: { name: string; email: string };
    total: number;
    status: string;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.role !== 'admin') {
      router.push('/auth/signin');
      return;
    }

    fetchDashboardStats();
  }, [session, status, router]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
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
            <div>
              <h1 className="text-3xl font-bold text-gold">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back, {session.user?.name}</p>
            </div>
            <Link
              href="/"
              className="bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              View Site
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            href="/admin/books"
            className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-gold transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-gold">Books</h3>
                <p className="text-2xl font-bold text-gold mt-2">{stats?.totalBooks || 0}</p>
              </div>
              <div className="text-gold text-3xl">📚</div>
            </div>
            <p className="text-gray-400 mt-2">Manage books and PDFs</p>
          </Link>

          <Link
            href="/admin/paintings"
            className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-gold transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-gold">Paintings</h3>
                <p className="text-2xl font-bold text-gold mt-2">{stats?.totalPaintings || 0}</p>
              </div>
              <div className="text-gold text-3xl">🎨</div>
            </div>
            <p className="text-gray-400 mt-2">Manage artwork collection</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-gold transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-gold">Orders</h3>
                <p className="text-2xl font-bold text-gold mt-2">{stats?.totalOrders || 0}</p>
              </div>
              <div className="text-gold text-3xl">📦</div>
            </div>
            <p className="text-gray-400 mt-2">View and manage orders</p>
          </Link>

          <Link
            href="/admin/users"
            className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-gold transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-gold">Users</h3>
                <p className="text-2xl font-bold text-gold mt-2">{stats?.totalUsers || 0}</p>
              </div>
              <div className="text-gold text-3xl">👥</div>
            </div>
            <p className="text-gray-400 mt-2">Manage user accounts</p>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-gray-900 rounded-lg border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-gold">Recent Orders</h2>
          </div>
          <div className="p-6">
            {stats?.recentOrders && stats.recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-800">
                      <th className="pb-3 text-gray-400">Order ID</th>
                      <th className="pb-3 text-gray-400">Customer</th>
                      <th className="pb-3 text-gray-400">Total</th>
                      <th className="pb-3 text-gray-400">Status</th>
                      <th className="pb-3 text-gray-400">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order) => (
                      <tr key={order._id} className="border-b border-gray-800 last:border-b-0">
                        <td className="py-3 text-gold font-mono">{order.orderId}</td>
                        <td className="py-3">
                          <div>
                            <div className="text-white">{order.customer.name}</div>
                            <div className="text-gray-400 text-sm">{order.customer.email}</div>
                          </div>
                        </td>
                        <td className="py-3 text-gold font-semibold">${order.total}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'completed' ? 'bg-green-900 text-green-300' :
                            order.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-red-900 text-red-300'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400">No recent orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}