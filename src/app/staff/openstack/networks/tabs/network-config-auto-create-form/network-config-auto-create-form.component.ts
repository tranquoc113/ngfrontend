import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { FormBuilder } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { NetworksApiService } from '@fleio-api/openstack/network/networks-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IRegionModel } from '@fleio-api/openstack/model/region.model';
import { IAutoCreateNetworkOptionsModel } from '@fleio-api/openstack/network/model/auto-create-network-options.model';

@Component({
  selector: 'app-network-config-auto-create-form',
  templateUrl: './network-config-auto-create-form.component.html',
  styleUrls: ['./network-config-auto-create-form.component.scss']
})
export class NetworkConfigAutoCreateFormComponent extends DetailsFormBase<INetworkModel> implements OnInit {
  networkOptionsForm = this.formBuilder.group({
    region: [''],
    network: [''],
    ipv4_subnetpool: [''],
    ipv6_subnetpool: [''],
  });
  regions: FleioObjectsList<IRegionModel>;
  autoCreateNetworkOptions: IAutoCreateNetworkOptionsModel;

  constructor(
    private formBuilder: FormBuilder,
    private networksApiService: NetworksApiService,
    private router: Router,
    public config: ConfigService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  ngOnInit() {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.networksActions();
      this.regions = this.objectController.additionalObjects.regions;
    }

    this.networkOptionsForm.controls.region.valueChanges.subscribe(newRegion => {
      this.autoCreateNetworkOptions = null;
      this.networksApiService.getAutoCreateNetworkOptions(newRegion).subscribe(options => {
        this.autoCreateNetworkOptions = options;
        this.networkOptionsForm.patchValue({
          network: options.options.config.network ? options.options.config.network.id : null,
          ipv4_subnetpool:options.options.config.ipv4_subnetpool ? options.options.config.ipv4_subnetpool.id : null,
          ipv6_subnetpool:options.options.config.ipv6_subnetpool ? options.options.config.ipv6_subnetpool.id : null,
        })
      })
    });

    if (this.regions) {
      this.networkOptionsForm.controls.region.setValue(this.regions.objects[0].id);
    }
  }

  networksActions(): Observable<IActionResult> {
    const value = this.networkOptionsForm.value;

    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    return this.networksApiService.saveAutoCreateNetworkOptions(
      value,
    ).pipe(map(() => {
        this.notificationService.showMessage('New configuration applied');
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
