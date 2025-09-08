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
      value_a, // Order ID
      store_id,
      store_passwd,
    } = data;

    // Verify IPN authenticity
    const isValidIPN = await sslcommerzService.verifyIPN(data);
    if (!isValidIPN) {
      console.error('Invalid IPN received:', data);
      return NextResponse.json({ status: 'INVALID' }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();

    // Validate payment with SSLCommerz
    const validation = await sslcommerzService.validatePayment(val_id, store_id, store_passwd);

    if (!validation || !tran_id || !value_a) {
      console.error('Missing required IPN data:', { val_id, tran_id, value_a });
      return NextResponse.json({ status: 'INVALID' }, { status: 400 });
    }

    // Find the order
    const order = await Order.findById(value_a);
    if (!order) {
      console.error('Order not found for IPN:', value_a);
      return NextResponse.json({ status: 'INVALID' }, { status: 404 });
    }

    // Check if payment is successful
    if (sslcommerzService.isPaymentSuccessful(validation.status)) {
      // Verify transaction details match
      if (validation.tran_id !== tran_id || parseFloat(validation.amount) !== parseFloat(amount)) {
        console.error('Transaction validation mismatch:', {
          expected: { tran_id, amount },
          received: { tran_id: validation.tran_id, amount: validation.amount }
        });
        return NextResponse.json({ status: 'INVALID' }, { status: 400 });
      }

      // Update order to confirmed status
      await Order.findByIdAndUpdate(value_a, {
        'payment.status': 'completed',
        'payment.validationId': val_id,
        'payment.bankTransactionId': bank_tran_id,
        'payment.cardType': card_type,
        'payment.cardNo': card_no,
        'payment.cardIssuer': card_issuer,
        'payment.cardBrand': card_brand,
        'payment.cardIssuerCountry': card_issuer_country,
        'payment.paidAt': new Date(tran_date),
        'payment.ipnVerified': true,
        status: 'confirmed',
      });

      console.log('Payment confirmed via IPN:', {
        orderId: value_a,
        transactionId: tran_id,
        amount,
        validationId: val_id
      });

      return NextResponse.json({ status: 'OK' });
    } else if (sslcommerzService.isPaymentFailed(validation.status)) {
      // Update order to failed status
      await Order.findByIdAndUpdate(value_a, {
        'payment.status': 'failed',
        'payment.validationId': val_id,
        'payment.bankTransactionId': bank_tran_id,
        'payment.cardType': card_type,
        'payment.cardNo': card_no,
        'payment.failureReason': validation.status,
        'payment.ipnVerified': true,
        status: 'cancelled',
      });

      console.log('Payment failed via IPN:', {
        orderId: value_a,
        transactionId: tran_id,
        status: validation.status
      });

      return NextResponse.json({ status: 'OK' });
    } else {
      // Payment is in pending or unknown state
      await Order.findByIdAndUpdate(value_a, {
        'payment.validationId': val_id,
        'payment.bankTransactionId': bank_tran_id,
        'payment.cardType': card_type,
        'payment.cardNo': card_no,
        'payment.ipnVerified': true,
      });

      console.log('Payment status updated via IPN:', {
        orderId: value_a,
        transactionId: tran_id,
        status: validation.status
      });

      return NextResponse.json({ status: 'OK' });
    }
  } catch (error) {
    console.error('IPN processing error:', error);
    return NextResponse.json({ status: 'ERROR' }, { status: 500 });
  }
}

// IPN only supports POST requests
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}