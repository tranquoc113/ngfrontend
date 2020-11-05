import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../ui/objects-view/details-form-base';
import { IInvoiceModel } from '../../../../fleio-api/billing/model/invoice.model';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { IClientModel } from '../../../../fleio-api/client-user/model/client.model';
import { Observable, of } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { ClientsApiService } from '../../../../fleio-api/client-user/client/clients-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IInvoiceCreateOptionsModel } from '../../../../fleio-api/billing/model/invoice-create-options.model';
import { IActionResult } from '../../../../ui/objects-view/interfaces/actions/action-result';
import { InvoicesApiService } from '../../../../fleio-api/billing/invoices/invoices-api.service';
import { ConfigService } from '../../../../config/config.service';
import { IInvoiceItemModel } from '../../../../fleio-api/billing/model/invoice-item.model';
import { ServicesApiService } from '../../../../fleio-api/billing/services/service-api.service';

@Component({
  selector: 'app-invoice-edit-form',
  templateUrl: './invoice-edit-form.component.html',
  styleUrls: ['./invoice-edit-form.component.scss']
})
export class InvoiceEditFormComponent extends DetailsFormBase<IInvoiceModel> implements OnInit {
  invoiceForm = this.formBuilder.group({
    client: ['', Validators.required],
    status: ['unpaid', Validators.required],
    issue_date: [Date.now(), Validators.required],
    due_date: [Date.now(), Validators.required],
    items: this.formBuilder.array([]),
  });

  client = this.invoiceForm.controls.client;
  filteredClients$: Observable<IClientModel[]>;
  createOptions: IInvoiceCreateOptionsModel;

  constructor(
    private formBuilder: FormBuilder,
    private clientsApi: ClientsApiService,
    private activatedRoute: ActivatedRoute,
    private invoicesApi: InvoicesApiService,
    private router: Router,
    private config: ConfigService,
    private servicesApi: ServicesApiService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveInvoice();
    }
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;
    if (this.object) {
      if (this.object.id) {
        this.invoiceForm.controls.client.disable();
      }
      if (Object.keys(this.object).length > 0) {
        this.invoiceForm.patchValue(this.object);
        if (this.object.items) {
          this.object.items.map(
            item => (this.invoiceForm.controls.items as FormArray).push(this.initInvoiceItem(item))
          );
        }
      } else {
        this.invoiceForm.patchValue({
          issue_date: new Date(),
          due_date: new Date(),
        });

        const queryParams = this.activatedRoute.snapshot.queryParams;
        if (queryParams.client_id) {
          this.clientsApi.get(queryParams.client_id).subscribe(client => {
            this.client.setValue(client);
          });
        }
      }
    }

    this.filteredClients$ = this.client.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.clientsApi.list({
          search: value,
        }).pipe(map(clientsList => clientsList.objects));
      })
    );

    if (this.object && !this.object.id) {
      this.client.valueChanges.subscribe(client => {
        this.servicesApi.list({
          client: client.id,
        }).subscribe(services => {
          this.createOptions.services = services.objects;
        });
      });
    }
  }

  clientDisplay(client?: IClientModel): string | undefined {
    if (client) {
      return client.name ? client.name : `${client.first_name} ${client.last_name}`;
    } else {
      return undefined;
    }
  }

  initInvoiceItem(item: IInvoiceItemModel = null) {
    return this.formBuilder.group({
      description: [item ? item.description : '', Validators.required],
      amount: [item ? item.amount : '', Validators.required],
      item_type: [item ? item.item_type : '', Validators.required],
      service: [item ? item.service : ''],
      taxed: [item ? item.taxed : false],
    });
  }

  addInvoiceItem() {
    const items = this.invoiceForm.controls.items as FormArray;
    items.push(this.initInvoiceItem());
  }

  removeItem(index) {
    const items = this.invoiceForm.controls.items as FormArray;
    items.removeAt(index);
  }

  private saveInvoice(): Observable<IActionResult> {
    const value = this.invoiceForm.getRawValue() as IInvoiceModel;
    if (typeof (value.client) === 'object') {
      value.client = (value.client as IClientModel).id;
    }

    this.createOrUpdate(this.invoicesApi, value).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('billing/invoices')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
