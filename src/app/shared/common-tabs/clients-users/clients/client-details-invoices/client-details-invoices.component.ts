import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { IClientModel } from '../../../../fleio-api/client-user/model/client.model';
import { ConfigService } from '../../../../config/config.service';
import { ClientsApiService } from '../../../../fleio-api/client-user/client/clients-api.service';
import { IInvoiceModel } from '../../../../fleio-api/billing/model/invoice.model';
import { InvoicesApiService } from '../../../../fleio-api/billing/invoices/invoices-api.service';

@Component({
  selector: 'app-client-details-invoices',
  templateUrl: './client-details-invoices.component.html',
  styleUrls: ['./client-details-invoices.component.scss']
})
export class ClientDetailsInvoicesComponent extends DetailsComponentBase<IClientModel> implements OnInit {
  invoices: IInvoiceModel[];
  displayedColumns: string[] = ['id', 'status', 'issue_date', 'total'];

  constructor(
    private clientsApi: ClientsApiService,
    private invoicesApi: InvoicesApiService,
    public config: ConfigService,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setupRefreshTimer(3000);
  }

  protected refreshData() {
    if (this.object) {
      this.invoicesApi.list({
        client: this.object.id,
        page_size: 20,
      }).subscribe(invoices => {
        this.invoices = invoices.objects;
      });
    }
  }
}
