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

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
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
          {/* Cancellation Header */}
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
              <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
            <p className="text-gray-600">You have cancelled the payment process.</p>
          </div>

          {/* Cancellation Details */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-orange-900 mb-2">Transaction Cancelled</h2>
            <p className="text-orange-800 mb-4">
              No payment has been processed. Your order has been cancelled and no charges have been made to your account.
            </p>
            
            {transactionId && (
              <p className="text-sm text-orange-700">
                <span className="font-medium">Transaction ID:</span> {transactionId}
              </p>
            )}
            {orderDetails && (
              <p className="text-sm text-orange-700">
                <span className="font-medium">Order ID:</span> {orderDetails.orderId}
              </p>
            )}
          </div>

          {/* Order Details */}
          {orderDetails && (
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cancelled Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 opacity-75">
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
                <div className="flex justify-between items-center text-lg font-bold opacity-75">
                  <span>Total Amount (Not Charged)</span>
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

          {/* Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">What happens now?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your order has been cancelled and removed from our system</li>
              <li>• No payment has been processed or charged</li>
              <li>• Your cart items are still saved if you want to try again</li>
              <li>• You can continue shopping or contact us if you need assistance</li>
            </ul>
          </div>

          {/* Reasons for Cancellation */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Common reasons for cancellation:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Changed your mind about the purchase</li>
              <li>• Want to review the order details again</li>
              <li>• Prefer to use a different payment method</li>
              <li>• Need to update shipping or billing information</li>
              <li>• Technical issues during the payment process</li>
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
              href="/cart"
              className="flex-1 bg-gray-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Review Cart
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