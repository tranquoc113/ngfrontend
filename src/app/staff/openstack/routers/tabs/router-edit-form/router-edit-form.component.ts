import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';
import { RoutersApiService } from '@fleio-api/openstack/routers/routers-api.service';
import { IRouterCreateOptionsModel } from '@fleio-api/openstack/model/router-create-options.model';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-router-edit-form',
  templateUrl: './router-edit-form.component.html',
  styleUrls: ['./router-edit-form.component.scss']
})
export class RouterEditFormComponent extends DetailsFormBase<IRouterModel> implements OnInit {
  routerForm = this.formBuilder.group({
    client: ['', Validators.required],
    region: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    external_network_id: [''],
    admin_state_up: ['true'],
  });

  createOptions: IRouterCreateOptionsModel;
  filteredClients$: Observable<IClientModel[]>;
  externalNetworks: {
    name: string;
    id: string;
    region: string;
  }[];

  constructor(
    private formBuilder: FormBuilder,
    private routersApiService: RoutersApiService,
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
    this.routerForm.controls.client.setValue('');
  }


  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.routerActions();
      this.createOptions = this.objectController.additionalObjects.createOptions;
    }

    if (this.object && this.object.id) {
      this.routerForm.patchValue(this.object);
      this.routerForm.controls.client.disable();
      this.routerForm.controls.region.disable();
      this.routerForm.controls.external_network_id.disable();
    }

    this.filteredClients$ = this.routerForm.controls.client.valueChanges.pipe(
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

    this.routerForm.controls.region.valueChanges.subscribe(region => {
      this.externalNetworks = [];
      if (region) {
        this.externalNetworks = this.createOptions.external_networks.filter(net => net.region === region);
      }
    })
  }

  routerActions(): Observable<IActionResult> {
    const value = this.routerForm.value as IRouterModel;

    if (value.client && (value.client as IClientModel).id) {
      value.client = (value.client as IClientModel).id
    }

    this.createOrUpdate(
      this.routersApiService,
      value,
    ).subscribe(response => {
      this.router.navigateByUrl(
        this.config.getPanelUrl(this.object.id ? `openstack/routers/${this.object.id}`: 'openstack/routers')
      ).catch(() => {
      });
      this.notificationService.showMessage('Router saved')
    });
    return of(null);
  }
}
