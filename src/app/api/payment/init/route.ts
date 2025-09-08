import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Order } from '@/lib/models';
import { sslcommerzService } from '@/lib/sslcommerz';
import type { PaymentData } from '@/lib/sslcommerz';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      items,
      customerInfo,
      shippingInfo,
      totalAmount,
      currency = 'BDT',
    } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required' },
        { status: 400 }
      );
    }

    if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return NextResponse.json(
        { error: 'Customer information is required' },
        { status: 400 }
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: 'Valid total amount is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Generate transaction ID
    const transactionId = sslcommerzService.generateTransactionId('AYMAN');

    // Create order in database
    const order = new Order({
      orderId: transactionId,
      items: items.map((item: {
        id: string;
        type: string;
        title: string;
        price: number;
        quantity: number;
        format?: string;
      }) => ({
        type: item.type,
        itemId: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        format: item.format,
      })),
      customer: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
      },
      shipping: shippingInfo || {
        address: customerInfo.address || '',
        city: customerInfo.city || '',
        country: customerInfo.country || 'Bangladesh',
      },
      payment: {
        method: 'sslcommerz',
        transactionId,
        amount: totalAmount,
        currency,
        status: 'pending',
      },
      total: totalAmount,
      status: 'pending',
    });

    await order.save();

    // Prepare payment data for SSLCommerz
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    const paymentData: PaymentData = {
      total_amount: totalAmount,
      currency,
      tran_id: transactionId,
      success_url: `${baseUrl}/api/payment/success`,
      fail_url: `${baseUrl}/api/payment/fail`,
      cancel_url: `${baseUrl}/api/payment/cancel`,
      ipn_url: `${baseUrl}/api/payment/ipn`,
      cus_name: customerInfo.name,
      cus_email: customerInfo.email,
      cus_add1: shippingInfo?.address || customerInfo.address || 'N/A',
      cus_city: shippingInfo?.city || customerInfo.city || 'Dhaka',
      cus_country: shippingInfo?.country || customerInfo.country || 'Bangladesh',
      cus_phone: customerInfo.phone,
      product_name: items.length === 1 ? items[0].title : `${items.length} items`,
      product_category: items[0].type === 'book' ? 'Books' : 'Paintings',
      product_profile: 'general',
      value_a: order._id.toString(), // Store order ID for reference
    };

    // Initialize payment with SSLCommerz
    const paymentResponse = await sslcommerzService.initPayment(paymentData);

    if (paymentResponse.status !== 'SUCCESS') {
      // Update order status to failed
      await Order.findByIdAndUpdate(order._id, {
        'payment.status': 'failed',
        status: 'cancelled',
      });

      return NextResponse.json(
        { error: paymentResponse.failedreason || 'Payment initialization failed' },
        { status: 400 }
      );
    }

    // Return payment URL
    return NextResponse.json({
      success: true,
      data: {
        orderId: order._id.toString(),
        transactionId,
        paymentUrl: paymentResponse.GatewayPageURL,
        sessionkey: paymentResponse.sessionkey,
      },
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    );
  }
}