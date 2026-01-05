export interface MeterReadingResponse {
  id: string;
  connectionId: string;
  consumerId: string;
  utilityId: string;
  readingValue: number;
  readingDate: string;
  createdAt: string;
}
