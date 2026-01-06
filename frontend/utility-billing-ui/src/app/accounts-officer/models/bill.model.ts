export interface Bill {
  id: string;           
  billId: string;         
  consumerId: string;
  connectionId: string;
  utilityType: string;     
  amount: number;
  dueDate: string;   
  status: 'PAID' | 'GENERATED' | 'OVERDUE';
  createdAt: string;  
}
