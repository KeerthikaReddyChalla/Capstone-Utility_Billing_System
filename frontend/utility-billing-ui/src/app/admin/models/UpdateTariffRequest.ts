export interface UpdateTariffRequest {
  name: string;
  ratePerUnit: number;
  effectiveFrom?: string; 
}
