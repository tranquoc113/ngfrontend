import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ClusterTemplatesApiService } from '@fleio-api/openstack/cluster-template/cluster-templates-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IClusterTemplateCreateOptionsModel } from '@fleio-api/openstack/model/cluster-template-create-options.model';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';
import { map, startWith } from 'rxjs/operators';
import { ISubnetModel } from '@fleio-api/openstack/model/subnet.model';

@Component({
  selector: 'app-cluster-template-create-form',
  templateUrl: './cluster-template-create-form.component.html',
  styleUrls: ['./cluster-template-create-form.component.scss']
})
export class ClusterTemplateCreateFormComponent extends DetailsFormBase<IClusterTemplateModel> implements OnInit {
  createOptions: IClusterTemplateCreateOptionsModel;
  loading = false;
  dockerVolumeSizeMin = 1;
  createClusterTemplateForm = this.formBuilder.group({
    name: ['', Validators.required],
    coe: ['', Validators.required],
    server_type: ['vm', Validators.required],
    public: [false],
    registry_enabled: [false],
    tls_disabled: [false],
    region: ['', Validators.required],
    image_id: ['', Validators.required],
    keypair_id: ['null'],
    flavor_id: ['', Validators.required],
    master_flavor_id: ['', Validators.required],
    volume_driver: ['cinder', Validators.required],
    docker_storage_driver: ['', Validators.required],
    docker_volume_size: [null, [Validators.required, Validators.min(this.dockerVolumeSizeMin)]],
    insecure_registry: [''],
    network_driver: ['flannel', Validators.required],
    external_network_id: ['', Validators.required],
    fixed_network: [null],
    fixed_subnet: [''],
    http_proxy: [''],
    https_proxy: [''],
    no_proxy: [''],
    dns_nameserver: [null],
    master_lb_enabled: [false],
    floating_ip_enabled: [false],
    hidden: [false],
    labels: [''],
  });
  fixed_subnet = this.createClusterTemplateForm.controls.fixed_subnet;
  filteredSubnets: Observable<Array<ISubnetModel>>;

  constructor(
    private formBuilder: FormBuilder,
    private clusterTemplatesApiService: ClusterTemplatesApiService,
    private notificationService: NotificationService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  displaySubnetFn(subnet) {
    if (subnet) {
      return subnet.name || subnet.id;
    }
    return '';
  }

  changedDockerStorageDriver() {
    const dStorageDriver = this.createClusterTemplateForm.controls.docker_storage_driver.value;
    if (dStorageDriver === 'devicemapper') {
      this.dockerVolumeSizeMin = 3;
    } else {
      this.dockerVolumeSizeMin = 1;
    }
    const dockerVolumeSize = this.createClusterTemplateForm.controls.docker_volume_size;
    if (dockerVolumeSize.value && dockerVolumeSize.value < this.dockerVolumeSizeMin) {
      dockerVolumeSize.setValue(null);
    }
    this.createClusterTemplateForm.controls.docker_volume_size.setValidators(
      [Validators.required, Validators.min(this.dockerVolumeSizeMin)]
    );
  }

  refreshCreateOptions() {
    const region = this.createClusterTemplateForm.controls.region.value;
    this.createClusterTemplateForm.controls.external_network_id.setValue('');
    this.createClusterTemplateForm.controls.flavor_id.setValue('');
    this.createClusterTemplateForm.controls.master_flavor_id.setValue('');
    this.createClusterTemplateForm.controls.fixed_network.setValue('');
    this.createClusterTemplateForm.controls.image_id.setValue('');
    this.createClusterTemplateForm.controls.fixed_subnet.setValue('');
    if (region) {
      this.clusterTemplatesApiService.createOptions({
        region
      }).subscribe(response => {
        this.createOptions = response as any;
      }, error => {
        this.notificationService.showMessage('Error while trying to refresh create options.');
      });
    }
  }

  clickedSubnetInput() {
    this.fixed_subnet.setValue('');
  }

  changedRegion() {
    const region = this.createClusterTemplateForm.controls.region.value;
    if (region) {
      this.refreshCreateOptions();
    }
  }

  createClusterTemplate() {
    const value = this.createClusterTemplateForm.value as any;
    if (value.fixed_subnet) {
      value.fixed_subnet = value.fixed_subnet.id;
    } else {
      delete value.fixed_subnet;
    }
    const doNotSubmitIfEmpty = ['dns_nameserver', 'fixed_network', 'http_proxy', 'https_proxy', 'no_proxy',
      'insecure_registry', 'labels'];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (doNotSubmitIfEmpty.indexOf(key) > -1 && !value[key]) {
          delete value[key];
        }
      }
    }
    if (!this.createClusterTemplateForm.invalid) {
      this.loading = true;
    }
    this.createOrUpdate(this.clusterTemplatesApiService, value, true).subscribe(() => {
      this.loading = false;
      this.router.navigateByUrl(
        this.config.getPrevUrl('openstack/cluster-templates')
      ).catch(() => {});
    }, error => {
      this.loading = false;
    });
    return of(null);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.createClusterTemplate();
      this.createOptions = this.objectController.additionalObjects.createOptions;
    }
    if (this.createOptions) {
      if (this.createOptions.coe) {
        const coeKeys = Object.keys(this.createOptions.coe);
        this.createClusterTemplateForm.controls.coe.setValue(coeKeys[0]);
        if (this.createOptions.network_driver_defaults) {
          this.createClusterTemplateForm.controls.network_driver.setValue(
            this.createOptions.network_driver_defaults[coeKeys[0]]
          );
        }
      }
      if (this.createOptions.docker_storage_driver_default) {
        this.createClusterTemplateForm.controls.docker_storage_driver.setValue(
          this.createOptions.docker_storage_driver_default
        );
      }
      if (this.createOptions.regions && this.createOptions.regions.length) {
        this.createClusterTemplateForm.controls.region.setValue(this.createOptions.regions[0].id);
        this.changedRegion();
      }
    }
    this.filteredSubnets = this.fixed_subnet.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(value => {
        const lowerCaseValue = value.toLocaleLowerCase();
        return this.createOptions.fixed_subnets.filter(
          subnet => subnet.name.toLocaleLowerCase().includes(lowerCaseValue)
        );
      })
    );
  }

}
