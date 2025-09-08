'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface OrderDetails {
  _id: string;
  orderId: string;
  items: Array<{
    type: string;
    title: string;
    price: number;
    quantity: number;
    format?: string;
  }>;
  total: number;
  status: string;
  payment: {
    transactionId: string;
    amount: number;
    status: string;
    paidAt?: string;
  };
  customer: {
    name: string;
    email: string;
  };
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transactionId = searchParams.get('transaction');
  const orderId = searchParams.get('order');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (response.ok) {
          const order = await response.json();
          setOrderDetails(order);
        } else {
          setError('Failed to fetch order details');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
          </div>

          {/* Transaction Details */}
          {transactionId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Transaction Details</h2>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Transaction ID:</span> {transactionId}
              </p>
              {orderDetails && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Order ID:</span> {orderDetails.orderId}
                </p>
              )}
            </div>
          )}

          {/* Order Details */}
          {orderDetails && (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        {item.type === 'book' && item.format && `${item.format} • `}
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium text-gray-900">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Paid</span>
                  <span>৳{orderDetails.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">What&apos;s Next?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• You will receive an order confirmation email at {orderDetails.customer.email}</li>
                  {orderDetails.items.some(item => item.type === 'book' && item.format === 'digital') && (
                    <li>• Digital books will be available for download in your account</li>
                  )}
                  {orderDetails.items.some(item => 
                    item.type === 'painting' || (item.type === 'book' && item.format === 'physical')
                  ) && (
                    <li>• Physical items will be shipped to your provided address</li>
                  )}
                  <li>• You can track your order status in your account dashboard</li>
                </ul>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/"
              className="flex-1 bg-yellow-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Continue Shopping
            </Link>
            {orderDetails && (
              <button
                onClick={() => window.print()}
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Print Receipt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-gold">Loading...</div></div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}