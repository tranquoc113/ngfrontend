import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IInvoiceModel } from '../model/invoice.model';
import { InvoicesApiService } from './invoices-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceResolver implements Resolve<IInvoiceModel> {
  constructor(private invoicesApi: InvoicesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IInvoiceModel> | Promise<IInvoiceModel> | IInvoiceModel {
    return this.invoicesApi.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
