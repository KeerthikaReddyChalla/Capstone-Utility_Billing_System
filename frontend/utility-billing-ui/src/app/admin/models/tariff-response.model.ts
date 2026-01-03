export interface TariffResponse {
  id: string;
  utilityId: string;
  name: string;
  ratePerUnit: number;
  effectiveFrom: Date | null;
}
