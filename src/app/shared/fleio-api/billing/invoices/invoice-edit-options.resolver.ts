import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { InvoicesApiService } from './invoices-api.service';
import { catchError } from 'rxjs/operators';
import { IInvoiceCreateOptionsModel } from '../model/invoice-create-options.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceEditOptionsResolver implements Resolve<IInvoiceCreateOptionsModel> {
  constructor(private invoicesApi: InvoicesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IInvoiceCreateOptionsModel> | Promise<IInvoiceCreateOptionsModel> | IInvoiceCreateOptionsModel {
    return this.invoicesApi.objectGetAction(
      route.params.id, 'invoice_edit_options'
    ).pipe(catchError(() => of(null)));
  }
}
