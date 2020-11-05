import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { NetworksApiService } from '@fleio-api/openstack/network/networks-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { INetworkCreateOptionsModel } from '@fleio-api/openstack/network/model/network-create-options.model';

@Component({
  selector: 'app-network-edit-form',
  templateUrl: './network-edit-form.component.html',
  styleUrls: ['./network-edit-form.component.scss']
})
export class NetworkEditFormComponent extends DetailsFormBase<INetworkModel> implements OnInit {
  networkForm = this.formBuilder.group({
    client: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    region: ['', Validators.required],
    provider_network_type: ['local', Validators.required],
    admin_state_up: [true],
    router_external: [false],
    is_default: [false],
    shared: [false],
  });
  filteredClients$: Observable<IClientModel[]>;
  createOptions: INetworkCreateOptionsModel;

  constructor(
    private formBuilder: FormBuilder,
    private networksApiService: NetworksApiService,
    private router: Router,
    private config: ConfigService,
    private notificationService: NotificationService,
    private clientsApiService: ClientsApiService,
  ) {
    super();
  }

  clientDisplay(client?: IClientModel): string | undefined {
    if (client) {
      return client.name ? client.name : `${client.first_name} ${client.last_name}`;
    } else {
      return undefined;
    }
  }

  clearClient() {
    this.networkForm.controls.client.setValue('');
  }

  ngOnInit() {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.networksActions();
      this.createOptions = this.objectController.additionalObjects.createOptions as INetworkCreateOptionsModel;
    }

    this.networkForm.controls.router_external.valueChanges.subscribe(newValue => {
      if (newValue) {
        this.networkForm.controls.is_default.enable();
      } else {
        this.networkForm.controls.is_default.disable();
      }
    })

    if (this.object && this.object.id) {
      this.networkForm.patchValue(this.object);
      this.networkForm.controls.client.disable();
      this.networkForm.controls.region.disable();
      this.networkForm.controls.provider_network_type.disable();
    } else {
      if (this.createOptions) {
        this.networkForm.controls.region.setValue(this.createOptions.selected_region);
      }
    }

    this.filteredClients$ = this.networkForm.controls.client.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.clientsApiService.list({
          search: value,
          openstack_project: true,
        }).pipe(map(clientsList => clientsList.objects));
      })
    );
  }

  networksActions(): Observable<IActionResult> {
    super.ngOnInit();
    const value = this.networkForm.value;

    if (value.client && value.client.id) {
      value.client = value.client.id
    }

    this.createOrUpdate(
      this.networksApiService,
      value,
    ).subscribe(() => {
      if (this.object.id) {
        this.notificationService.showMessage('Network saved');
      } else {
        this.notificationService.showMessage('Network created');
      }
      let url = this.config.getPanelUrl('openstack/networks');
      if (this.object.id) {
        url += `/${this.object.id}`;
      }
      this.router.navigateByUrl(
        url
      ).catch(() => {
      });
    }, () => {
      this.notificationService.showMessage('Failed to save network');
    });

    return of(null);
  }
}
