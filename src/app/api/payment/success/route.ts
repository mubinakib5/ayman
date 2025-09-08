import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Order } from '@/lib/models';
import { sslcommerzService } from '@/lib/sslcommerz';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data: Record<string, string> = {};
    
    // Convert FormData to object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const {
      val_id,
      tran_id,
      amount,
      card_type,
      store_amount,
      card_no,
      bank_tran_id,
      status,
      tran_date,
      currency,
      card_issuer,
      card_brand,
      card_issuer_country,
      card_issuer_country_code,
      value_a, // This contains our order ID
    } = data;

    if (!val_id || !tran_id) {
      return NextResponse.redirect(new URL('/payment/failed?error=invalid_response', request.url));
    }

    // Connect to database
    await connectToDatabase();

    // Validate payment with SSLCommerz
    const validation = await sslcommerzService.validatePayment(val_id);

    if (!sslcommerzService.isPaymentSuccessful(validation.status)) {
      // Update order status to failed
      if (value_a) {
        await Order.findByIdAndUpdate(value_a, {
          'payment.status': 'failed',
          'payment.validationId': val_id,
          'payment.bankTransactionId': bank_tran_id,
          'payment.cardType': card_type,
          'payment.cardNo': card_no,
          status: 'cancelled',
        });
      }

      return NextResponse.redirect(
        new URL(`/payment/failed?transaction=${tran_id}&reason=${validation.status}`, request.url)
      );
    }

    // Verify transaction details match
    if (validation.tran_id !== tran_id || parseFloat(validation.amount) !== parseFloat(amount)) {
      return NextResponse.redirect(
        new URL('/payment/failed?error=validation_mismatch', request.url)
      );
    }

    // Update order in database
    let order = null;
    if (value_a) {
      order = await Order.findByIdAndUpdate(
        value_a,
        {
          'payment.status': 'completed',
          'payment.validationId': val_id,
          'payment.bankTransactionId': bank_tran_id,
          'payment.cardType': card_type,
          'payment.cardNo': card_no,
          'payment.cardIssuer': card_issuer,
          'payment.cardBrand': card_brand,
          'payment.cardIssuerCountry': card_issuer_country,
          'payment.paidAt': new Date(tran_date),
          status: 'confirmed',
        },
        { new: true }
      );
    }

    // Redirect to success page
    const successUrl = new URL('/payment/success', request.url);
    successUrl.searchParams.set('transaction', tran_id);
    if (order) {
      successUrl.searchParams.set('order', order._id.toString());
    }

    return NextResponse.redirect(successUrl);
  } catch (error) {
    console.error('Payment success callback error:', error);
    return NextResponse.redirect(
      new URL('/payment/failed?error=processing_error', request.url)
    );
  }
}

// Handle GET requests (some gateways might use GET)
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