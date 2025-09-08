import crypto from 'crypto';

export interface SSLCommerzConfig {
  store_id: string;
  store_passwd: string;
  is_live: boolean;
}

export interface PaymentData {
  total_amount: number;
  currency: string;
  tran_id: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  ipn_url?: string;
  cus_name: string;
  cus_email: string;
  cus_add1: string;
  cus_add2?: string;
  cus_city: string;
  cus_state?: string;
  cus_postcode?: string;
  cus_country: string;
  cus_phone: string;
  cus_fax?: string;
  ship_name?: string;
  ship_add1?: string;
  ship_add2?: string;
  ship_city?: string;
  ship_state?: string;
  ship_postcode?: string;
  ship_country?: string;
  product_name: string;
  product_category: string;
  product_profile: string;
  value_a?: string;
  value_b?: string;
  value_c?: string;
  value_d?: string;
}

export interface SSLCommerzResponse {
  status: string;
  failedreason?: string;
  sessionkey?: string;
  gw?: Record<string, unknown>;
  redirectGatewayURL?: string;
  directPaymentURLBank?: string;
  directPaymentURLCard?: string;
  directPaymentURL?: string;
  redirectGatewayURLFailed?: string;
  GatewayPageURL?: string;
}

export interface ValidationResponse {
  status: string;
  tran_date: string;
  tran_id: string;
  val_id: string;
  amount: string;
  store_amount: string;
  currency: string;
  bank_tran_id: string;
  card_type: string;
  card_no: string;
  card_issuer: string;
  card_brand: string;
  card_issuer_country: string;
  card_issuer_country_code: string;
  currency_type: string;
  currency_amount: string;
  currency_rate: string;
  base_fair: string;
  value_a: string;
  value_b: string;
  value_c: string;
  value_d: string;
  risk_level: string;
  risk_title: string;
}

class SSLCommerzService {
  private config: SSLCommerzConfig;
  private baseUrl: string;

  constructor() {
    this.config = {
      store_id: process.env.SSLCOMMERZ_STORE_ID || '',
      store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD || '',
      is_live: process.env.SSLCOMMERZ_IS_LIVE === 'true',
    };

    this.baseUrl = this.config.is_live
      ? 'https://securepay.sslcommerz.com'
      : 'https://sandbox.sslcommerz.com';
  }

  /**
   * Initialize payment session
   */
  async initPayment(paymentData: PaymentData): Promise<SSLCommerzResponse> {
    try {
      const data = {
        store_id: this.config.store_id,
        store_passwd: this.config.store_passwd,
        ...paymentData,
      };

      const response = await fetch(`${this.baseUrl}/gwprocess/v4/api.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data as Record<string, string>),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('SSLCommerz init payment error:', error);
      throw new Error('Failed to initialize payment');
    }
  }

  /**
   * Validate payment
   */
  async validatePayment(valId: string, storeId?: string, storePasswd?: string): Promise<ValidationResponse> {
    try {
      const data = {
        val_id: valId,
        store_id: storeId || this.config.store_id,
        store_passwd: storePasswd || this.config.store_passwd,
      };

      const response = await fetch(`${this.baseUrl}/validator/api/validationserverAPI.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('SSLCommerz validate payment error:', error);
      throw new Error('Failed to validate payment');
    }
  }

  /**
   * Generate transaction ID
   */
  generateTransactionId(prefix = 'TXN'): string {
    const timestamp = Date.now();
    const random = crypto.randomBytes(4).toString('hex').toUpperCase();
    return `${prefix}_${timestamp}_${random}`;
  }

  /**
   * Verify IPN (Instant Payment Notification)
   */
  async verifyIPN(ipnData: Record<string, string>): Promise<boolean> {
    try {
      const { val_id, store_id, store_passwd } = ipnData;
      
      if (!val_id) {
        return false;
      }

      const validation = await this.validatePayment(val_id, store_id, store_passwd);
      return validation.status === 'VALID' || validation.status === 'VALIDATED';
    } catch (error) {
      console.error('IPN verification error:', error);
      return false;
    }
  }

  /**
   * Check if payment is successful
   */
  isPaymentSuccessful(status: string): boolean {
    return ['VALID', 'VALIDATED'].includes(status.toUpperCase());
  }

  /**
   * Check if payment failed
   */
  isPaymentFailed(status: string): boolean {
    return ['FAILED', 'CANCELLED', 'UNATTEMPTED'].includes(status.toUpperCase());
  }

  /**
   * Get payment status message
   */
  getStatusMessage(status: string): string {
    const statusMessages: Record<string, string> = {
      'VALID': 'Payment successful',
      'VALIDATED': 'Payment validated',
      'FAILED': 'Payment failed',
      'CANCELLED': 'Payment cancelled',
      'UNATTEMPTED': 'Payment not attempted',
      'PENDING': 'Payment pending',
    };

    return statusMessages[status.toUpperCase()] || 'Unknown payment status';
  }
}

// Export singleton instance
export const sslcommerzService = new SSLCommerzService();
export default sslcommerzService;