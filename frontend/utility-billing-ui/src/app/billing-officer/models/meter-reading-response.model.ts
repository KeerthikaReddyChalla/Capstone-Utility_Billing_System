export interface MeterReadingResponse {
  id: string;
  connectionId: string;
  consumerName: string;
  meterNumber: string;
  utilityName: string;
  previousReading: number;
  currentReading: number;
  unitsConsumed: number;
  readingDate: string;
  status: 'PENDING' | 'VERIFIED' | 'DISPUTED';
}
