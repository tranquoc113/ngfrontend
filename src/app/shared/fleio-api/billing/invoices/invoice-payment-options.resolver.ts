import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { InvoicesApiService } from './invoices-api.service';
import { catchError } from 'rxjs/operators';
import { IInvoicePaymentOptionsModel } from '../model/invoice-payment-options.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicePaymentOptionsResolver implements Resolve<IInvoicePaymentOptionsModel> {
  constructor(private invoicesApi: InvoicesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IInvoicePaymentOptionsModel> | Promise<IInvoicePaymentOptionsModel> | IInvoicePaymentOptionsModel {
    return this.invoicesApi.objectGetAction(
      route.params.id, 'payment_options'
    ).pipe(catchError(() => of(null)));
  }
}
