import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { IInvoiceModel } from '../model/invoice.model';
import { Observable } from 'rxjs';
import { InvoicesApiService } from './invoices-api.service';
import { IListQueryParams } from '../../base-model/list-query-params';

@Injectable({
  providedIn: 'root'
})
export class InvoiceListResolver implements Resolve<FleioObjectsList<IInvoiceModel>> {
  constructor(private invoicesApi: InvoicesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IInvoiceModel>> | Promise<FleioObjectsList<IInvoiceModel>> |
    FleioObjectsList<IInvoiceModel> {
    return this.invoicesApi.list(route.queryParams as IListQueryParams);
  }
}
