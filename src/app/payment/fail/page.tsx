'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
  customer: {
    name: string;
    email: string;
  };
}

export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transactionId = searchParams.get('transaction');
  const orderId = searchParams.get('order');
  const failureReason = searchParams.get('reason') || 'Payment processing failed';

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
          {/* Failure Header */}
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
            <p className="text-gray-600">Unfortunately, your payment could not be processed.</p>
          </div>

          {/* Failure Details */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-red-900 mb-2">What happened?</h2>
            <p className="text-red-800 mb-4">{failureReason}</p>
            
            {transactionId && (
              <p className="text-sm text-red-700">
                <span className="font-medium">Transaction ID:</span> {transactionId}
              </p>
            )}
            {orderDetails && (
              <p className="text-sm text-red-700">
                <span className="font-medium">Order ID:</span> {orderDetails.orderId}
              </p>
            )}
          </div>

          {/* Common Reasons */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-yellow-900 mb-2">Common reasons for payment failure:</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Insufficient funds in your account</li>
              <li>• Incorrect card details or expired card</li>
              <li>• Network connectivity issues</li>
              <li>• Bank security restrictions</li>
              <li>• Transaction limit exceeded</li>
            </ul>
          </div>

          {/* Order Details */}
          {orderDetails && (
            <div className="border-t border-gray-200 pt-6 mb-6">
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
                  <span>Total Amount</span>
                  <span>৳{orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">What can you do next?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Check your payment details and try again</li>
              <li>• Contact your bank if you suspect a security block</li>
              <li>• Try using a different payment method</li>
              <li>• Contact our support team if the problem persists</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/checkout"
              className="flex-1 bg-yellow-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/contact"
              className="flex-1 bg-gray-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/"
              className="flex-1 border border-gray-300 text-gray-700 text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}