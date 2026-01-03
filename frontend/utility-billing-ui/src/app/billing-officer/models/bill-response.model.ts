export interface BillResponse {
  id: string;              
  consumerId: string;
  connectionId: string;
  utilityId: string;

  billingCycle: string;     
  unitsConsumed: number;
  amount: number;
  status: 'GENERATED' | 'PAID' | 'DUE' | 'OVERDUE';

  consumerName: string;
  consumerEmail: string;
  utilityName: string;
}
