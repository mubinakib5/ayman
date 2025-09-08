import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Order } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data: Record<string, string> = {};
    
    // Convert FormData to object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const {
      tran_id,
      val_id,
      amount,
      card_type,
      store_amount,
      card_no,
      bank_tran_id,
      status,
      value_a, // Order ID
    } = data;

    // Connect to database
    await connectToDatabase();

    // Update order status to cancelled
    if (value_a && tran_id) {
      await Order.findByIdAndUpdate(value_a, {
        'payment.status': 'cancelled',
        'payment.validationId': val_id,
        'payment.bankTransactionId': bank_tran_id,
        'payment.cardType': card_type,
        'payment.cardNo': card_no,
        'payment.failureReason': 'Payment cancelled by user',
        status: 'cancelled',
      });
    }

    // Redirect to cancellation page
    const cancelUrl = new URL('/payment/cancelled', request.url);
    if (tran_id) {
      cancelUrl.searchParams.set('transaction', tran_id);
    }

    return NextResponse.redirect(cancelUrl);
  } catch (error) {
    console.error('Payment cancellation callback error:', error);
    return NextResponse.redirect(
      new URL('/payment/failed?error=processing_error', request.url)
    );
  }
}

// Handle GET requests
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const data: Record<string, string> = {};
  
  // Convert search params to object
  searchParams.forEach((value, key) => {
    data[key] = value;
  });

  // Create a mock FormData and process like POST
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Create a new request with FormData
  const mockRequest = new Request(request.url, {
    method: 'POST',
    body: formData,
  });

  return POST(mockRequest as NextRequest);
}