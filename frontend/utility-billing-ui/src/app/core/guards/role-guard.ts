import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.tokenService.getRole();

    if (!userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    if (userRole !== expectedRole) {
      this.router.navigate(['/login']); // or /unauthorized later
      return false;
    }

    return true;
  }
}

