import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';
import { IBaseFleioObjectModel } from '../../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IClientModel } from '../../../../../shared/fleio-api/client-user/model/client.model';
import { DomainApiService } from '../../../../../shared/fleio-api/plugins/domains/domain-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../shared/config/config.service';
import { ClientsApiService } from '../../../../../shared/fleio-api/client-user/client/clients-api.service';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { IDomainAvailabilityInfoModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain-availability-info.model';
import { OrderDomainApiService } from '../../../../../shared/fleio-api/plugins/domains/order-domain-api.service';
import { DomainUtils } from '../../utils/domain-utils';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';

@Component({
  selector: 'app-domain-transfer-form',
  templateUrl: './domain-transfer-form.component.html',
  styleUrls: ['./domain-transfer-form.component.scss']
})
export class DomainTransferFormComponent extends DetailsFormBase<IBaseFleioObjectModel> implements OnInit {
  newDomainForm = this.formBuilder.group({
    client: ['', Validators.required],
    name: ['', Validators.required],
    years: [0, Validators.required],
    epp: [''],
  });

  filteredClients$: Observable<IClientModel[]>;
  checkingDomain: boolean;
  domainAvailability: IDomainAvailabilityInfoModel;
  domainUtils = new DomainUtils();


  constructor(
    private formBuilder: FormBuilder, private domainApiService: DomainApiService,
    private router: Router, private config: ConfigService, private activatedRoute: ActivatedRoute,
    private clientsApi: ClientsApiService,
    private orderDomainApiService: OrderDomainApiService,
    private notificationService: NotificationService,
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

  ngOnInit() {
    super.ngOnInit();

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

    this.newDomainForm.controls.client.valueChanges.subscribe(() => {
      this.domainAvailability = null;
    })
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
          if (domainAvailability.tld.requires_epp_for_transfer) {
            this.newDomainForm.controls.epp.enable();
          } else {
            this.newDomainForm.controls.epp.disable();
          }
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

  transferDomain() {
    const domain = this.newDomainForm.value;

    domain.client = domain.client.id;

    this.orderDomainApiService.transferDomain(domain).subscribe(
      (order) => {
        this.notificationService.showMessage('Domain transferred successfully');
        const orderUrl = location.protocol + this.config.getPanelUrl(
          `billing/orders/${order.order_id}`
        );
        location.replace(orderUrl);
      },
      (error) => {
        this.notificationService.showMessage('Failed to transfer domain');
      }
    );
  }
}
