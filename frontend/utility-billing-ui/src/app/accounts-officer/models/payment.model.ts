export interface Payment {
  paymentId: string;              // MongoDB ID
  billId: string;
  consumerId: string;
  amount: number;
  method: 'CARD' | 'UPI' | 'CASH';
  status: 'INITIATED' | 'COMPLETED' | 'FAILED';
  transactionId?: string;
  paidAt: string;          // ISO date
}
