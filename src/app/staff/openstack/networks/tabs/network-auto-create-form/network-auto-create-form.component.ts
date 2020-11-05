import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { INetworkCreateOptionsModel } from '@fleio-api/openstack/network/model/network-create-options.model';
import { NetworksApiService } from '@fleio-api/openstack/network/networks-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';

@Component({
  selector: 'app-network-auto-create-form',
  templateUrl: './network-auto-create-form.component.html',
  styleUrls: ['./network-auto-create-form.component.scss']
})
export class NetworkAutoCreateFormComponent extends DetailsFormBase<INetworkModel> implements OnInit {
  networkForm = this.formBuilder.group({
    client: ['', Validators.required],
    region: ['', Validators.required],
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
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.networksActions();
      this.createOptions = this.objectController.additionalObjects.createOptions as INetworkCreateOptionsModel;
      this.networkForm.controls.region.setValue(this.createOptions.selected_region);
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
    const value = this.networkForm.value;

    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    return this.networksApiService.autoCreateNetwork(
      value.client.id, value.region,
    ).pipe(map(() => {
        this.notificationService.showMessage('Network created');
        const url = this.config.getPanelUrl('openstack/networks');
        this.router.navigateByUrl(
          url
        ).catch(() => {
        });
        return null;
      }
    ));
  }
}
