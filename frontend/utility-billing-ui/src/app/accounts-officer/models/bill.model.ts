export interface Bill {
  id: string;              // MongoDB ID
  billId: string;          // BILL-2024-001
  consumerId: string;
  connectionId: string;
  utilityType: string;     // ELECTRICITY | WATER | GAS | INTERNET
  amount: number;
  dueDate: string;         // ISO date string
  status: 'PAID' | 'GENERATED' | 'OVERDUE';
  createdAt: string;       // ISO date
}
