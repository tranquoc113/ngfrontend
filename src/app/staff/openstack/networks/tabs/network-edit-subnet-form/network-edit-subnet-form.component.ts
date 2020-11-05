import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { INetworkCreateOptionsModel } from '@fleio-api/openstack/network/model/network-create-options.model';
import { NetworksApiService } from '@fleio-api/openstack/network/networks-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { SubnetsApiService } from '@fleio-api/openstack/subnets/subnets-api.service';
import { ISubnetModel } from '@fleio-api/openstack/model/subnet.model';
import { ISubnetCreateOptionsModel } from '@fleio-api/openstack/subnets/model/subnet-create-options.model';
import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-network-edit-subnet-form',
  templateUrl: './network-edit-subnet-form.component.html',
  styleUrls: ['./network-edit-subnet-form.component.scss']
})
export class NetworkEditSubnetFormComponent extends DetailsFormBase<INetworkModel> implements OnInit {
  subnetForm = this.formBuilder.group({
    name: ['', Validators.required],
    network_address_source: ['manually', Validators.required],
    cidr: ['', Validators.required],
    subnet_pool: ['', Validators.required],
    setGatewayIp: ['no-gateway'],
    gateway_ip: [''],
    network_mask: [0],
    ip_version: [4, Validators.required],
    ipv6_ra_mode: [null],
    ipv6_address_mode: [null],
    enable_dhcp: [true],
    allocation_pools: this.formBuilder.array([]),
    dns_nameservers: this.formBuilder.array([]),
    host_routes: this.formBuilder.array([]),
  });
  filteredClients$: Observable<IClientModel[]>;
  createOptions: INetworkCreateOptionsModel;
  subnet: ISubnetModel;
  subnetCreateOptions: ISubnetCreateOptionsModel;
  selectedPool: ISubnetPoolModel;

  get allocationPools() {
    return this.subnetForm.controls.allocation_pools as FormArray;
  }

  addAllocationPool() {
    this.allocationPools.push(this.formBuilder.group({
      start: [''],
      end: [''],
    }))
  }

  get dnsNameservers() {
    return this.subnetForm.controls.dns_nameservers as FormArray;
  }

  addDnsServer() {
    this.dnsNameservers.push(this.formBuilder.control(''))
  }

  get hostRoutes() {
    return this.subnetForm.controls.host_routes as FormArray;
  }

  addHostRoute() {
    this.hostRoutes.push(this.formBuilder.group({
      destination: [''],
      nexthop: [''],
    }))
  }

  constructor(
    private formBuilder: FormBuilder,
    private networksApiService: NetworksApiService,
    private router: Router,
    private config: ConfigService,
    private notificationService: NotificationService,
    private subnetsApiService: SubnetsApiService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.subnetActions();
      this.createOptions = this.objectController.additionalObjects.createOptions as INetworkCreateOptionsModel;
      if (this.objectController.additionalObjects.subnet) {
        this.subnet = this.objectController.additionalObjects.subnet as ISubnetModel;
      }
      this.subnetCreateOptions =
        this.objectController.additionalObjects.subnetCreateOptions as ISubnetCreateOptionsModel;
    }

    this.subnetForm.controls.network_address_source.valueChanges.subscribe(newValue => {
      if (newValue === 'manually') {
        this.subnetForm.controls.cidr.enable();
        this.subnetForm.controls.subnet_pool.disable();
        this.subnetForm.controls.network_mask.disable();
        this.subnetForm.controls.ip_version.enable();
      } else {
        this.subnetForm.controls.cidr.disable();
        this.subnetForm.controls.subnet_pool.enable();
        this.subnetForm.controls.network_mask.enable();
        this.subnetForm.controls.ip_version.disable();
      }
    });

    this.subnetForm.controls.setGatewayIp.valueChanges.subscribe(newValue => {
      if (newValue) {
        this.subnetForm.controls.gateway_ip.enable();
      } else {
        this.subnetForm.controls.gateway_ip.disable();
      }
    });

    this.subnetForm.controls.subnet_pool.valueChanges.subscribe((newValue: ISubnetPoolModel) => {
      if (newValue) {
        this.subnetForm.controls.network_mask.setValue(newValue.default_prefixlen);
        this.selectedPool = newValue;
      }
    });

    this.subnetForm.controls.subnet_pool.disable();
    if (this.subnet) {
      this.subnet.ipv6_address_mode = this.subnet.extra.ipv6_address_mode;
      this.subnet.ipv6_ra_mode = this.subnet.extra.ipv6_ra_mode;
      this.subnet.dns_nameservers = this.subnet.extra.dns_nameservers || [];
      this.subnet.host_routes = this.subnet.extra.host_routes || [];
      if (!this.subnet.allocation_pools) {
        this.subnet.allocation_pools = [];
      } else {
        this.subnet.allocation_pools = JSON.parse(
          (this.subnet.allocation_pools as unknown as string).replace(/'/g, '"'),
        );
      }

      for (const pool of this.subnet.allocation_pools) {
        this.addAllocationPool();
      }

      for (const dns of this.subnet.dns_nameservers) {
        this.addDnsServer();
      }

      for (const dns of this.subnet.host_routes) {
        this.addHostRoute();
      }

      this.subnetForm.patchValue(this.subnet);
    } else {
      this.subnetForm.controls.gateway_ip.disable();
    }
  }

  subnetActions(): Observable<IActionResult> {
    const value = this.subnetForm.value;
    value.network_id = this.object.id;
    if (value.setGatewayIp === 'no-gateway') {
      value.setGatewayIp = '';
    }

    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    if (this.selectedPool) {
      value.ip_version = this.selectedPool.ip_version;
      value.subnetpool_id = this.selectedPool.id;
    }

    if (value.dns_nameservers && value.dns_nameservers.length > 0) {
      const formattedNameservers = [];
      for (const dns of value.dns_nameservers) {
        formattedNameservers.push({ip: dns});
      }
      value.dns_nameservers = formattedNameservers;
    }


    let request;
    if (this.subnet) {
      value.id = this.subnet.id;
      request = this.subnetsApiService.update(value.id, value);
    } else {
      request = this.subnetsApiService.create(value);
    }

    request = request.pipe(catchError((error) => {
      if (this.subnet) {
        this.notificationService.showMessage('Failed to save subnet');
      } else {
        this.notificationService.showMessage('Failed to create subnet');
      }
      if (error.error) {
        this.setErrors(error.error);
        return EMPTY;
      } else {
        throw error;
      }
    }));

    return request.pipe(map(() => {
      if (this.subnet) {
        this.notificationService.showMessage('Subnet saved');
      } else {
        this.notificationService.showMessage('Subnet created');
      }
      const url = this.config.getPanelUrl(`openstack/networks/${this.object.id}`);
      this.router.navigateByUrl(
        url
      ).catch(() => {
      });
      return null;
    }));
  }
}
