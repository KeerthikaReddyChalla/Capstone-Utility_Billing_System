import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
@Injectable({ providedIn: 'root' })
export class PaymentService {

  private baseUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  sendOtp(email: string) {
    return this.http.post(`${this.baseUrl}/send-otp`, null, {
      params: { email }
    });
  }

  verifyOtpAndPay(payload: any) {
    return this.http.post(`${this.baseUrl}/verify-otp`, payload);
  }
}
