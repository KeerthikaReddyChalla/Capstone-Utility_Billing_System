import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { AuthGuard } from './core/guards/auth-guard';
import { RoleGuard } from './core/guards/role-guard';

import { AdminDashboardComponent } from './admin/dashboard/dashboard';
import { BillingDashboardComponent } from './billing-officer/dashboard/dashboard';
import { AccountsDashboardComponent } from './accounts-officer/dashboard/dashboard';
import { ConsumerDashboardComponent } from './consumer/dashboard/dashboard';
import { RegisterComponent } from './auth/register/register';
import { BillingLayoutComponent } from './billing-officer/layout/billing-layout.component';
import { BillGenerationComponent } from './billing-officer/bill-generation/bill-generation';
import { MeterReadingsComponent } from './billing-officer/meter-readings/meter-readings';
import { ConsumerLayoutComponent } from './consumer/layout/consumer-layout.component';
import { ConsumerHomeComponent } from './consumer/pages/home/consumer-home.component';
import { ConsumerRegisterComponent } from './consumer/auth/consumer-register/consumer-register.component';
import { PendingApprovalComponent } from './consumer/pages/pending-approval/pending-approval.component';
import { CreateConnectionComponent } from './consumer/pages/connections/create-connection.component';
import { ConsumerBillsComponent } from './consumer/pages/bills/consumer-bills.component';

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
  path: 'consumer/register',
  component: ConsumerRegisterComponent
},
{
  path: 'consumer/pending',
  component: PendingApprovalComponent,
  canActivate: [AuthGuard]
},
{
  path: 'consumer',
  component: ConsumerLayoutComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { role: 'CONSUMER' },
  children: [
    { path: 'home', component: ConsumerHomeComponent },
    { path: 'connections/new', component: CreateConnectionComponent },
    { path: 'bills', component: ConsumerBillsComponent }
  ]
}
,
  {
  path: 'billing',
  component: BillingLayoutComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { role: 'BILLING_OFFICER' },
  children: [
    { path: '', component: BillingDashboardComponent },     // Dashboard tab
    { path: 'generate', component: BillGenerationComponent },    // Bills tab
    { path: 'readings', component: MeterReadingsComponent },// Meter Readings
   
  ]
}
,


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
