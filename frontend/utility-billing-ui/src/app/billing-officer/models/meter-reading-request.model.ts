export interface MeterReadingRequest {
  connectionId: string;
  currentReading: number;
  readingDate: string; // ISO string
}