import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IZoneModel } from '@fleio-api/openstack/zone/model/zone.model';
import { IZoneCreateOptionsModel } from '@fleio-api/openstack/zone/model/zone-create-options.model';
import { ZonesApiService } from '@fleio-api/openstack/zone/zones-api.service';

@Component({
  selector: 'app-zone-edit-form',
  templateUrl: './zone-edit-form.component.html',
  styleUrls: ['./zone-edit-form.component.scss']
})
export class ZoneEditFormComponent extends DetailsFormBase<IZoneModel> implements OnInit {
  zoneForm = this.formBuilder.group({
    forClient: [true],
    client: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    type_: ['', Validators.required],
    description: ['', Validators.required],
    ttl: [1800],
  });

  createOptions: IZoneCreateOptionsModel;
  filteredClients$: Observable<IClientModel[]>;

  constructor(
    private formBuilder: FormBuilder,
    private zonesApiService: ZonesApiService,
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
    this.zoneForm.controls.client.setValue('');
  }


  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.zoneActions();
      this.createOptions = this.objectController.additionalObjects.createOptions;
    }

    if (this.object && this.object.id) {
      this.zoneForm.patchValue(this.object);
      this.zoneForm.controls.forClient.disable();
      this.zoneForm.controls.client.disable();
      this.zoneForm.controls.name.disable();
      this.zoneForm.controls.type_.disable();
    }

    this.filteredClients$ = this.zoneForm.controls.client.valueChanges.pipe(
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
  }

  zoneActions(): Observable<IActionResult> {
    const value = this.zoneForm.value as IZoneModel;
    if (this.object.id) {
      value.type = this.object.type;
    }

    if (value.client && (value.client as IClientModel).id) {
      value.client = (value.client as IClientModel).id
    }

    this.createOrUpdate(
      this.zonesApiService,
      value,
    ).subscribe(response => {
      this.router.navigateByUrl(
        this.config.getPanelUrl(this.object.id ? `openstack/zones/${this.object.id}`: 'openstack/zones')
      ).catch(() => {
      });
      this.notificationService.showMessage('Zone saved');
    });
    return of(null);
  }
}
