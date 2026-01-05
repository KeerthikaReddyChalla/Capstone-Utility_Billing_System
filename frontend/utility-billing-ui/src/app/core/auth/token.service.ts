import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = 'auth_token';
  private ROLE_KEY = 'auth_role';

   saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);

    const role = this.extractRoleFromToken(token);
    if (role) {
      localStorage.setItem(this.ROLE_KEY, role);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  clear(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

 getEmail(): string | null {
    const decoded = this.decodeToken();
    return decoded?.sub || decoded?.email || null;
  }
  
  private extractRoleFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const authorities: string[] = payload.authorities || [];

      // Example: ROLE_BILLING_OFFICER → BILLING_OFFICER
      return authorities.length > 0
        ? authorities[0].replace('ROLE_', '')
        : null;

    } catch {
      return null;
    }
  }
  private decodeToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  saveUserId(userId: string): void {
  localStorage.setItem('consumer_id', userId);
}

getUserId(): string | null {
  return localStorage.getItem('consumer_id');
}



  
}
