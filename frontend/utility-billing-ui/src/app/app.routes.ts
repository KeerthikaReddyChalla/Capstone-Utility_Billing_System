import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { AuthGuard } from './core/guards/auth-guard';
import { RoleGuard } from './core/guards/role-guard';

import { AdminDashboardComponent } from './admin/dashboard/dashboard';
import { BillingDashboardComponent } from './billing-officer/dashboard/dashboard';
import { AccountsDashboardComponent } from './accounts-officer/dashboard/dashboard';
import { ConsumerDashboardComponent } from './consumer/dashboard/dashboard';
import { RegisterComponent } from './auth/register/register';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },

  {
    path: 'billing',
    component: BillingDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'BILLING_OFFICER' }
  },

  {
    path: 'accounts',
    component: AccountsDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ACCOUNTS_OFFICER' }
  },

  {
    path: 'consumer',
    component: ConsumerDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'CONSUMER' }
  },

  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
