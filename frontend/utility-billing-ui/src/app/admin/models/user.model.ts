export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CONSUMER' | 'BILLING_OFFICER' | 'ACCOUNTS_OFFICER';
  active: boolean;
}
