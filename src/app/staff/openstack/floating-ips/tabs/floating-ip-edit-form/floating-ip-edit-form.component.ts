import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IFloatingIpModel } from '@fleio-api/openstack/floating-ips/model/floating-ip.model';
import { FloatingIpsApiService } from '@fleio-api/openstack/floating-ips/floating-ips-api.service';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { IFloatingIpCreateOptionsModel } from '@fleio-api/openstack/floating-ips/model/floating-ip-create-options.model';
import { NotificationService } from '@shared/ui-api/notification.service';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';

@Component({
  selector: 'app-floating-ip-edit-form',
  templateUrl: './floating-ip-edit-form.component.html',
  styleUrls: ['./floating-ip-edit-form.component.scss']
})
export class FloatingIpEditFormComponent extends DetailsFormBase<IFloatingIpModel> implements OnInit {
  floatingIpForm = this.formBuilder.group({
    client: ['', Validators.required],
    region: [''],
    floating_network: ['', Validators.required],
    description: [''],
  });
  filteredClients$: Observable<IClientModel[]>;
  createOptions: IFloatingIpCreateOptionsModel;
  filteredNetworks$: Observable<INetworkModel[]>;
  hasNetworks = false;

  constructor(
    private formBuilder: FormBuilder,
    private floatingIpsApiService: FloatingIpsApiService,
    private router: Router,
    private config: ConfigService,
    private clientsApiService: ClientsApiService,
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
    this.floatingIpForm.controls.client.setValue('');
  }


  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.floatingIpActions();
    }

    if (this.object) {
      this.floatingIpForm.patchValue(this.object);
    }

    this.filteredClients$ = this.floatingIpForm.controls.client.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.clientsApiService.list({
          search: value,
        }).pipe(map(clientsList => clientsList.objects));
      })
    );

    this.floatingIpForm.controls.client.valueChanges.subscribe(client => {
      if (typeof client === 'object') {
        const clientObj = client as IClientModel;
        this.floatingIpsApiService.createOptions({client_id: clientObj.id}).subscribe(
          (createOptions: IFloatingIpCreateOptionsModel) => {
            this.createOptions = createOptions;
            this.floatingIpForm.controls.region.setValue(this.createOptions.default_region);
          }
        );
      }
    });

    this.floatingIpForm.controls.region.valueChanges.subscribe(region => {
      if (this.createOptions) {
        const networks = this.createOptions.networks.filter(network => network.region === region);
        this.hasNetworks = networks.length > 0;
        this.filteredNetworks$ = of(networks);
      } else {
        this.hasNetworks = false;
        this.filteredNetworks$ = of([]);
      }
    });
  }

  floatingIpActions(): Observable<IActionResult> {
    const value = this.floatingIpForm.value as IFloatingIpModel;
    if (typeof value.client === 'object') {
      value.client = value.client.id;
    }

    return this.createOrUpdate(
      this.floatingIpsApiService,
      value,
    ).pipe(map(()=>{
      this.router.navigateByUrl(
        this.config.getPanelUrl('openstack/floating-ips')
      ).catch(() => {
      });
      this.notificationService.showMessage('Floating IP created')
      return null;
    }));
  }
}
