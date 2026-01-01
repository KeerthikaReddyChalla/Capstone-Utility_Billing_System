import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = 'auth_token';
  private ROLE_KEY = 'auth_role';

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.extractAndSaveRole(token);
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


  private extractAndSaveRole(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      // authorities = ["ROLE_ADMIN"]
      const authority = payload.authorities?.[0];

      if (authority) {
        const role = authority.replace('ROLE_', '');
        localStorage.setItem(this.ROLE_KEY, role);
      }
    } catch (e) {
      console.error('Failed to decode JWT', e);
    }
  }
}
