export interface ConnectionRequest {
  id: string;
  consumerId: string;
  utilityId: string;
  tariffType: string;
  status: 'PENDING' | 'ACTIVE' | 'REJECTED';
  requestedAt: string;
}
