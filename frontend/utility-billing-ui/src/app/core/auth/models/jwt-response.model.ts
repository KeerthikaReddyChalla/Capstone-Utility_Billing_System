export interface JwtResponse {
  token: string;
  email: string;
  role: 'ADMIN' | 'BILLING_OFFICER' | 'ACCOUNTS_OFFICER' | 'CONSUMER';
}
