import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IPortModel } from '@fleio-api/openstack/model/port.model';
import { PortsApiService } from '@fleio-api/openstack/port/ports-api.service';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { ProjectsApiService } from '@fleio-api/openstack/project/projects-api.service';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { NetworksApiService } from '@fleio-api/openstack/network/networks-api.service';
import { IPortCreateOptionsModel } from '@fleio-api/openstack/model/port-create-options.model';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-port-create-form',
  templateUrl: './port-create-form.component.html',
  styleUrls: ['./port-create-form.component.scss']
})
export class PortCreateFormComponent extends DetailsFormBase<IPortModel> implements OnInit {
  portForm = this.formBuilder.group({
    name: ['', Validators.required],
    admin_state_up: [true],
    network: ['', Validators.required],
    project: ['', Validators.required],
    ip_address_or_subnet: ['', Validators.required],
    subnet: ['', Validators.required],
    selected_fixed_ip_address: [''],
    mac_address: [''],
    port_security_enabled: [true],
    auto_add_security_group: [true],
    vnic_type: [''],
    host_id: [''],
    description: [''],
  });
  filteredProjects$: Observable<IProjectModel[]>;
  filteredNetworks$: Observable<INetworkModel[]>;
  createOptions: IPortCreateOptionsModel;

  constructor(
    private formBuilder: FormBuilder,
    private portsApiService: PortsApiService,
    private router: Router,
    private config: ConfigService,
    private projectsApiService: ProjectsApiService,
    private networksApiService: NetworksApiService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  projectDisplay(project?: IProjectModel): string | undefined {
    if (project) {
      return project.name;
    } else {
      return undefined;
    }
  }

  clearProject() {
    this.portForm.controls.project.setValue(null);
  }

  networkDisplay(network?: INetworkModel): string | undefined {
    if (network) {
      return network.name;
    } else {
      return undefined;
    }
  }

  clearNetwork() {
    this.portForm.controls.network.setValue(null);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.portActions();
      if (this.objectController.additionalObjects) {
        this.createOptions = this.objectController.additionalObjects.createOptions as IPortCreateOptionsModel;
      }
    }

    this.filteredProjects$ = this.portForm.controls.project.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value) {
          return typeof value === 'string' ? value : value.project_id;
        } else {
          return null;
        }
      }),
      mergeMap(value => {
        return this.projectsApiService.list(
          value ? {search: value} : {},
        ).pipe(map(projectsList => {
          if (projectsList) {
            return projectsList.objects;
          } else {
            return [];
          }
        }));
      })
    );

    this.filteredNetworks$ = this.portForm.controls.network.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value) {
          return typeof value === 'string' ? value : value.network_id;
        } else {
          return null;
        }
      }),
      mergeMap(value => {
        return this.networksApiService.list(
          value ? {search: value} : {},
        ).pipe(map(networksList => {
          if (networksList) {
            return networksList.objects;
          } else {
            return [];
          }
        }));
      })
    );

    this.portForm.controls.ip_address_or_subnet.valueChanges.subscribe(value => {
      if (value === 'fixed_ip_address') {
        this.portForm.controls.selected_fixed_ip_address.enable();
      } else {
        this.portForm.controls.selected_fixed_ip_address.disable();
      }
      if (value === 'subnet') {
        this.portForm.controls.subnet.enable();
      } else {
        this.portForm.controls.subnet.disable();
      }
    });

    if (this.createOptions) {
      this.portForm.controls.vnic_type.setValue(this.createOptions.vnic_types[0][0]);
    }
  }

  portActions(): Observable<IActionResult> {
    const value = this.portForm.value as any;

    value.fixed_ips = [];
    if (value.ip_address_or_subnet === 'fixed_ip_address') {
      value.fixed_ips.push({
        ip_address: value.selected_fixed_ip_address
      });
    } else if (value.ip_address_or_subnet === 'subnet') {
      value.fixed_ips.push({
        subnet_id: value.subnet.id
      });
    }

    if (!value.fixed_ips) {
      value.fixed_ips = '';
    }

    if (value.project && value.project.id) {
      value.project = value.project.project_id;
    }

    if (value.network && value.network.id) {
      value.network = value.network.id;
    }

    this.createOrUpdate(
      this.portsApiService,
      value,
    ).subscribe(() => {
      this.notificationService.showMessage('Port created');
      this.router.navigateByUrl(
        this.config.getPrevUrl('openstack/ports')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
