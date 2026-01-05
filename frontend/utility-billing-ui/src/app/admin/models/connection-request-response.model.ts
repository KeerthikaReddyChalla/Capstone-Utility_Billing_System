export interface ConnectionRequestResponse {
  id: string;
  consumerId: string;
  utilityId: string;
  tariffType: string;
  status: 'PENDING';
  requestedAt: string;
}
