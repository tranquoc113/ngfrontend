import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingHistoryComponent } from './billing-history/billing-history.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BillingHistoryComponent,
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'billing.history'
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule { }
