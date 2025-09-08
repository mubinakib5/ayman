'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface ShippingInfo {
  address: string;
  city: string;
  state?: string;
  postcode?: string;
  country: string;
  sameAsCustomer: boolean;
}

export function CheckoutForm() {
  const { state: cartState, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Bangladesh',
  });

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    address: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Bangladesh',
    sameAsCustomer: true,
  });

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    
    // Auto-fill shipping info if same as customer
    if (shippingInfo.sameAsCustomer) {
      if (field === 'address' || field === 'city' || field === 'country') {
        setShippingInfo(prev => ({ ...prev, [field]: value }));
      }
    }
  };

  const handleShippingInfoChange = (field: keyof ShippingInfo, value: string | boolean) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): string | null => {
    if (!customerInfo.name.trim()) return 'Name is required';
    if (!customerInfo.email.trim()) return 'Email is required';
    if (!customerInfo.phone.trim()) return 'Phone is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) return 'Please enter a valid email';
    
    // Phone validation (basic)
    if (customerInfo.phone.length < 10) return 'Please enter a valid phone number';
    
    // Check if any physical items require shipping
    const hasPhysicalItems = cartState.items.some(item => 
      item.type === 'painting' || (item.type === 'book' && item.format === 'physical')
    );
    
    if (hasPhysicalItems) {
      if (!shippingInfo.address.trim()) return 'Shipping address is required';
      if (!shippingInfo.city.trim()) return 'Shipping city is required';
      if (!shippingInfo.country.trim()) return 'Shipping country is required';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (cartState.items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        items: cartState.items,
        customerInfo,
        shippingInfo: shippingInfo.sameAsCustomer ? {
          address: customerInfo.address || '',
          city: customerInfo.city || '',
          country: customerInfo.country || 'Bangladesh',
        } : shippingInfo,
        totalAmount: cartState.total,
        currency: 'BDT',
      };

      // Initialize payment
      const response = await fetch('/api/payment/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to initialize payment');
      }

      // Clear cart and redirect to payment gateway
      clearCart();
      window.location.href = result.data.paymentUrl;
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during checkout');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartState.items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some items to your cart before checkout.</p>
        <button
          onClick={() => router.push('/books')}
          className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Browse Books
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartState.items.map((item, index) => (
              <div key={`${item.id}-${item.type}-${index}`} className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">
                    {item.type === 'book' && item.format && `${item.format} • `}
                    Qty: {item.quantity}
                  </p>
                </div>
                <span className="font-medium">৳{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>৳{cartState.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={customerInfo.name}
                onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={customerInfo.email}
                onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={customerInfo.phone}
                onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={customerInfo.address}
                onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  value={customerInfo.city}
                  onChange={(e) => handleCustomerInfoChange('city', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <select
                  value={customerInfo.country}
                  onChange={(e) => handleCustomerInfoChange('country', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          {cartState.items.some(item => 
            item.type === 'painting' || (item.type === 'book' && item.format === 'physical')
          ) && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={shippingInfo.sameAsCustomer}
                    onChange={(e) => handleShippingInfoChange('sameAsCustomer', e.target.checked)}
                    className="mr-2"
                  />
                  Same as customer information
                </label>
              </div>
              {!shippingInfo.sameAsCustomer && (
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Shipping Address *"
                    value={shippingInfo.address}
                    onChange={(e) => handleShippingInfoChange('address', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City *"
                      value={shippingInfo.city}
                      onChange={(e) => handleShippingInfoChange('city', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State/Province"
                      value={shippingInfo.state}
                      onChange={(e) => handleShippingInfoChange('state', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={shippingInfo.postcode}
                      onChange={(e) => handleShippingInfoChange('postcode', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <select
                      value={shippingInfo.country}
                      onChange={(e) => handleShippingInfoChange('country', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    >
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="India">India</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? 'Processing...' : `Pay ৳${cartState.total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;