import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { FleioId, IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { DomainApiService } from '@fleio-api/plugins/domains/domain-api.service';
import { OrderDomainApiService } from '@fleio-api/plugins/domains/order-domain-api.service';
import { IDomainAvailabilityInfoModel } from '@fleio-api/plugins/domains/model/domain-availability-info.model';
import { NotificationService } from '@shared/ui-api/notification.service';
import { DomainUtils } from '../../utils/domain-utils';
import { IDomainContactModel } from '@fleio-api/plugins/domains/model/domain-contact.model';
import { DomainContactsApiService } from '@fleio-api/plugins/domains/domain-contacts-api.service';
import { ICustomFieldsStatusModel } from '@fleio-api/plugins/domains/model/custom-fields-status.model';
import { MatDialog } from '@angular/material/dialog';
import { ObjectDetailsDialogComponent } from '@objects-view/object-details-dialog/object-details-dialog.component';
import { StaticObjectController } from '@objects-view/static-object-controller';
import { ContactEditFormComponent } from '../../contacts/tabs/contact-edit-form/contact-edit-form.component';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { ClientEditFormComponent } from '@shared/common-tabs/clients-users/clients/client-edit-form/client-edit-form.component';
import { RouteHelper } from '@shared/ui-api/route-helper';

@Component({
  selector: 'app-domain-register-form',
  templateUrl: './domain-register-form.component.html',
  styleUrls: ['./domain-register-form.component.scss']
})
export class DomainRegisterFormComponent extends DetailsFormBase<IBaseFleioObjectModel> implements OnInit {
  newDomainForm = this.formBuilder.group({
    client: ['', Validators.required],
    name: ['', Validators.required],
    years: [0, Validators.required],
    dns_management: [false],
    email_forwarding: [false],
    id_protection: [false],
    use_default_nameservers: [false],
    nameserver1: [''],
    nameserver2: [''],
    nameserver3: [''],
    nameserver4: [''],
    domain_contact_type: [''],
    contact: [''],
  });

  domainUtils = new DomainUtils();

  years = this.newDomainForm.controls.years;
  dns_management = this.newDomainForm.controls.dns_management;
  email_forwarding = this.newDomainForm.controls.email_forwarding;
  id_protection = this.newDomainForm.controls.id_protection;
  domain_contact_type = this.newDomainForm.controls.domain_contact_type;

  filteredClients$: Observable<IClientModel[]>;
  filteredContacts$: Observable<IDomainContactModel[]>;

  domainAvailability: IDomainAvailabilityInfoModel;
  checkingDomain: boolean;

  customFieldsStatus: ICustomFieldsStatusModel;

  dnsManagementPrice: string;
  dnsManagementAvailable: boolean;
  emailForwardingPrice: string;
  emailForwardingAvailable: boolean;
  idProtectionPrice: string;
  idProtectionAvailable: boolean;


  constructor(
    private formBuilder: FormBuilder, private domainApiService: DomainApiService,
    private router: Router, private config: ConfigService, private activatedRoute: ActivatedRoute,
    private clientsApi: ClientsApiService,
    private domainContactsApi: DomainContactsApiService,
    private orderDomainApiService: OrderDomainApiService,
    private notificationService: NotificationService,
    private matDialog: MatDialog,
  ) {
    super();
  }

  clientDisplay(client?: IClientModel): string | undefined {
    if (client && (typeof (client) === 'object')) {
      return client.name ? client.name : `${client.first_name} ${client.last_name}`;
    } else {
      return undefined;
    }
  }

  clearClient() {
    this.newDomainForm.controls.client.setValue('');
  }

  contactDisplay(contact?: IDomainContactModel): string | undefined {
    if (contact && (typeof (contact) === 'object')) {
      return contact.name ? contact.name : `${contact.first_name} ${contact.last_name}`;
    } else {
      return undefined;
    }
  }

  clearContact() {
    this.newDomainForm.controls.contact.setValue('');
  }

  ngOnInit() {
    super.ngOnInit();

    this.newDomainForm.patchValue({
      domain_contact_type: 'client',
    })

    this.filteredClients$ = this.newDomainForm.controls.client.valueChanges.pipe(
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

    this.filteredContacts$ = this.newDomainForm.controls.contact.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.domainContactsApi.list({
          search: value,
          client: this.newDomainForm.controls.client.value.id,
        }).pipe(map(clientsList => clientsList.objects));
      })
    );

    this.newDomainForm.controls.client.valueChanges.subscribe(() => {
      this.domainAvailability = undefined;
      this.newDomainForm.controls.contact.setValue('');
    })

    this.newDomainForm.controls.name.valueChanges.subscribe(() => {
      this.domainAvailability = undefined;
    })

    this.newDomainForm.controls.contact.valueChanges.subscribe(() => {
      this.customFieldsStatus = null;
      const contact = this.newDomainForm.controls.contact.value;
      if (contact && contact.id) {
        this.orderDomainApiService.checkCustomFields(
          this.newDomainForm.controls.client.value.id,
          contact.id,
          this.newDomainForm.controls.name.value,
        ).subscribe(customFieldsStatus => this.customFieldsStatus = customFieldsStatus);
      }
    })

    this.newDomainForm.controls.use_default_nameservers.valueChanges.subscribe(value => {
      if (value) {
        this.newDomainForm.controls.nameserver1.disable();
        this.newDomainForm.controls.nameserver2.disable();
        this.newDomainForm.controls.nameserver3.disable();
        this.newDomainForm.controls.nameserver4.disable();
      } else {
        this.newDomainForm.controls.nameserver1.enable();
        this.newDomainForm.controls.nameserver2.enable();
        this.newDomainForm.controls.nameserver3.enable();
        this.newDomainForm.controls.nameserver4.enable();
      }
    })

    const finalRouteSnapshot = (new RouteHelper(this.activatedRoute)).getFinalRoute().snapshot;
    if (finalRouteSnapshot.queryParams.client) {
      this.clientsApi.get(finalRouteSnapshot.queryParams.client as FleioId).subscribe(client => {
        this.newDomainForm.controls.client.setValue(client);
      })
    }
  }

  registerDomain() {
    const domain = this.newDomainForm.value;

    domain.client = domain.client.id;
    if (domain.contact_id) {
      domain.contact_id = domain.contact_id.id
    }

    this.orderDomainApiService.registerDomain(domain).subscribe(
      (order) => {
        this.notificationService.showMessage('Domain registered successfully');
        const orderUrl = location.protocol + this.config.getPanelUrl(
          `billing/orders/${order.order_id}`
        );
        location.replace(orderUrl);
      },
      () => {
        this.notificationService.showMessage('Failed to register domain');
      }
    );
  }

  checkDomainName() {
    this.checkingDomain = true;
    this.orderDomainApiService.isAvailableForRegistration(
      this.newDomainForm.controls.client.value.id,
      this.newDomainForm.controls.name.value,
    ).subscribe(
      domainAvailability => {
        this.domainAvailability = domainAvailability;
        if (domainAvailability.available) {
          this.newDomainForm.controls.name.setValue(domainAvailability.adjusted_name);
          if (domainAvailability.config.enable_default_nameservers) {
            this.newDomainForm.controls.use_default_nameservers.enable()
            this.newDomainForm.controls.use_default_nameservers.setValue(true);
            this.setDefaultNameservers(domainAvailability);
          } else {
            this.newDomainForm.controls.use_default_nameservers.setValue(false);
            this.newDomainForm.controls.use_default_nameservers.disable();
          }
          this.updateOptionPrices(domainAvailability);
          this.newDomainForm.controls.domain_contact_type.setValue('client');
          this.customFieldsStatus = null;

          this.orderDomainApiService.checkCustomFields(
            this.newDomainForm.controls.client.value.id,
            0,
            this.newDomainForm.controls.name.value,
          ).subscribe(customFieldsStatus => this.customFieldsStatus = customFieldsStatus);
        }
      },
      () => {
        this.notificationService.showMessage('Failed to check if domain is available for registration');
        this.domainAvailability = {
          available: false,
          error: 'Error checking domain'
        };
      },
    ).add(() => {
      this.checkingDomain = false
    });
  }

  updateOptionPrices(domainAvailability?: IDomainAvailabilityInfoModel) {
    if (domainAvailability) {
      this.domainAvailability = domainAvailability;
    }
    if (this.domainAvailability.dns_prices.prices_per_years[this.years.value] === null) {
      this.dnsManagementPrice = '';
      this.dnsManagementAvailable = false;
      this.dns_management.setValue(false);
      this.dns_management.disable();
    } else {
      this.dnsManagementPrice = this.domainAvailability.dns_prices.prices_per_years[this.years.value] + ' '
        + this.domainAvailability.dns_prices.currency.code;
      this.dnsManagementAvailable = true;
      this.dns_management.enable();
    }
    if (this.domainAvailability.email_prices.prices_per_years[this.years.value] === null) {
      this.emailForwardingPrice = '';
      this.emailForwardingAvailable = false;
      this.email_forwarding.setValue(false)
      this.email_forwarding.disable();
    } else {
      this.emailForwardingPrice = this.domainAvailability.email_prices.prices_per_years[this.years.value] + ' '
        + this.domainAvailability.email_prices.currency.code;
      this.emailForwardingAvailable = true;
      this.email_forwarding.enable();
    }
    if (this.domainAvailability.id_prices.prices_per_years[this.years.value] === null) {
      this.idProtectionPrice = '';
      this.idProtectionAvailable = false;
      this.id_protection.setValue(false);
      this.id_protection.disable();
    } else {
      this.idProtectionPrice = this.domainAvailability.id_prices.prices_per_years[this.years.value] + ' '
        + this.domainAvailability.id_prices.currency.code;
      this.idProtectionAvailable = true;
      this.id_protection.enable();
    }
  }

  setDefaultNameservers(domainAvailability?: IDomainAvailabilityInfoModel) {
    if (domainAvailability) {
      this.domainAvailability = domainAvailability;
    }
    this.newDomainForm.controls.nameserver1.setValue(this.domainAvailability.config.default_nameserver1);
    this.newDomainForm.controls.nameserver2.setValue(this.domainAvailability.config.default_nameserver2);
    this.newDomainForm.controls.nameserver3.setValue(this.domainAvailability.config.default_nameserver3);
    this.newDomainForm.controls.nameserver4.setValue(this.domainAvailability.config.default_nameserver4);
  }

  editDomainContact() {
    const objectController = new StaticObjectController(
      {
        tabs: [
          {
            tabName: 'Edit contact',
            component: ContactEditFormComponent,
          },
        ],
      },
      this.newDomainForm.controls.contact.value,
      {
        createOptions: this.activatedRoute.snapshot.data.contactCreateOptions,
      }
    )

    this.matDialog.open(
      ObjectDetailsDialogComponent, {
        data: {
          dialogTitle: 'Edit domain contact',
          objectController,
          actions: [new CallbackAction({name: 'Save', primary: true, needsResult: true})]
        }
      }).afterClosed().subscribe(() => {
      this.domainContactsApi.get(objectController.object.id).subscribe(
        (contact) => {
          this.newDomainForm.controls.contact.setValue(contact);
        }
      )
    });
  }

  createDomainContact() {
    const objectController = new StaticObjectController(
      {
        tabs: [
          {
            tabName: 'Create contact',
            component: ContactEditFormComponent,
          },
        ],
      },
      null,
      {
        createOptions: this.activatedRoute.snapshot.data.contactCreateOptions,
      }
    )

    this.matDialog.open(
      ObjectDetailsDialogComponent, {
        data: {
          dialogTitle: 'Create domain contact',
          objectController,
          actions: [new CallbackAction({name: 'Create', primary: true, needsResult: true})]
        }
      }).afterClosed().subscribe(() => {
      this.domainContactsApi.list().subscribe(
        () => {
          this.clearContact();
        }
      )
    });
  }

  editClient() {
    const objectController = new StaticObjectController(
      {
        tabs: [
          {
            tabName: 'Edit client',
            component: ClientEditFormComponent,
          },
        ],
      },
      this.newDomainForm.controls.client.value,
      {
        createOptions: this.activatedRoute.snapshot.data.clientCreateOptions,
      }
    )

    this.matDialog.open(
      ObjectDetailsDialogComponent, {
        data: {
          dialogTitle: 'Edit client',
          objectController,
          actions: [new CallbackAction({name: 'Save', primary: true, needsResult: true})]
        }
      }).afterClosed().subscribe(() => {
      this.clientsApi.get(objectController.object.id).subscribe(
        (client) => {
          this.newDomainForm.controls.client.setValue(client);
        }
      )
    });
  }
}
