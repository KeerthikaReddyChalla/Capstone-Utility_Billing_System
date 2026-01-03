export interface MeterReadingResponse {
  id: string;
  connectionId: string;
  previousReading: number;
  currentReading: number;
  consumption: number;
  readingDate: string;
}
