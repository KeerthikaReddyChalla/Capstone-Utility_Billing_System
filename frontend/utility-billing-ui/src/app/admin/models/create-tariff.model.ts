export interface CreateTariffRequest {
  utilityId: string;
  name: string;
  ratePerUnit: number;
  effectiveFrom: string;
}
