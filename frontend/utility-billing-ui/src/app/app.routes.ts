import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { AuthGuard } from './core/guards/auth-guard';
import { RoleGuard } from './core/guards/role-guard';

import { AdminDashboardComponent } from './admin/dashboard/dashboard';
import { BillingDashboardComponent } from './billing-officer/dashboard/dashboard';
import { AccountsDashboardComponent } from './accounts-officer/dashboard/dashboard';
import { ConsumerDashboardComponent } from './consumer/dashboard/dashboard';
import { RegisterComponent } from './auth/register/register';
import { BillGenerationComponent } from './billing-officer/bill-generation/bill-generation';
import { MeterReadingsComponent } from './billing-officer/meter-readings/meter-readings';
import { ConsumerHomeComponent } from './consumer/pages/home/consumer-home.component';
import { ConsumerRegisterComponent } from './consumer/auth/consumer-register/consumer-register.component';
import { PendingApprovalComponent } from './consumer/pages/pending-approval/pending-approval.component';
import { CreateConnectionComponent } from './consumer/pages/connections/create-connection.component';
import { ConsumerBillsComponent } from './consumer/pages/bills/consumer-bills.component';
import { HomeComponent } from './home/home.component';
import { UtilitiesComponent } from './admin/components/utilities/utilities';
import { UsersComponent } from './admin/components/users/users';
import { ReportsComponent } from './admin/components/reports/reports.component';
import { ConnectionApprovalsComponent } from './admin/components/connection-approvals/connection-approvals.component';
import { ConnectionsComponent } from './billing-officer/connections/connections.component';
import { AccountsBillsComponent } from './accounts-officer/bills/accounts-bills.component';
import { AccountsPaymentsComponent } from './accounts-officer/payments/accounts-payments.component';
import { SharedLayoutComponent } from './shared/components/layout/shared-layout.component';
import {ConsumerPaymentComponent} from './consumer/pages/payment/consumer-payment.component'
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password';
import { ResetPasswordComponent } from './auth/reset-password/reset-password';


export const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
,
{
    path: 'reset-password',
    component: ResetPasswordComponent
  },
{
  path: 'admin',
  component: SharedLayoutComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { role: 'ADMIN' },
  children: [
    { path: 'approvals', component: AdminDashboardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'utilities', component: UtilitiesComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'connection-approvals', component: ConnectionApprovalsComponent },
    { path: '', redirectTo: 'approvals', pathMatch: 'full' }
  ]
},
  {
    path: 'billing',
    component: SharedLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'BILLING_OFFICER' },
    children: [
      { path: 'reports', component: BillingDashboardComponent },
      { path: 'generate', component: BillGenerationComponent },
      { path: 'readings', component: MeterReadingsComponent },
      { path: 'bills-view', component: ConnectionsComponent }
    ]
  },
  {
    path: 'pending',
    component: PendingApprovalComponent,
  
  },

  {
    path: 'consumer',
    component: SharedLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'CONSUMER' },
    children: [
      { path: 'home', component: ConsumerHomeComponent },
      { path: 'connections/new', component: CreateConnectionComponent },
      { path: 'bills', component: ConsumerBillsComponent },
      { path: 'pay/:billId', component: ConsumerPaymentComponent }
    ]
  },
  {
  path: 'accounts',
  component: SharedLayoutComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { role: 'ACCOUNTS_OFFICER' },
  children: [
    { path: 'dashboard', component: AccountsDashboardComponent },
    { path: 'bills', component: AccountsBillsComponent },
    { path: 'payments', component: AccountsPaymentsComponent },
    //{ path: 'reports', component: AccountsReportsComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]
},

  { path: '**', redirectTo: '' }
];

