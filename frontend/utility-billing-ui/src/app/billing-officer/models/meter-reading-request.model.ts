export interface MeterReadingRequest {
  connectionId: string;
  consumerId: string;
  utilityId: string;
  readingValue: number;
  readingDate: string | Date;
}
