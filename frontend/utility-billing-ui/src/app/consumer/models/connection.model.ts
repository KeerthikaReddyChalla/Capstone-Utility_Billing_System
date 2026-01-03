export interface Connection {
  id: string;
  utilityId: string;
  tariffType: string;
  status: 'PENDING' | 'ACTIVE' | 'REJECTED';
  createdAt?: string;
  active: boolean;
}
