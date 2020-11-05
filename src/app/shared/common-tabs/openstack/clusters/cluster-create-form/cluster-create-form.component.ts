import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ClustersApiService } from '@fleio-api/openstack/cluster/clusters-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { of } from 'rxjs';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ClusterTemplatesApiService } from '@fleio-api/openstack/cluster-template/cluster-templates-api.service';
import { IClusterCreateOptionsModel } from '@fleio-api/openstack/model/cluster-create-options.model';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-cluster-create-form',
  templateUrl: './cluster-create-form.component.html',
  styleUrls: ['./cluster-create-form.component.scss']
})
export class ClusterCreateFormComponent extends DetailsFormBase<IClusterModel> implements OnInit {
  createClusterForm = this.formBuilder.group({
    name: ['', Validators.required],
    cluster_template: ['', Validators.required],
    master_count: [1, [Validators.required, Validators.min(1)]],
    node_count: [1, [Validators.required, Validators.min(1)]],
    docker_volume_size: [null, [Validators.required, Validators.min(1)]],
    discovery_url: [''],
    create_timeout: [60, [Validators.required, Validators.min(0)]],
    keypair: ['', Validators.required],
    flavor_id: ['', Validators.required],
    master_flavor_id: ['', Validators.required],
    labels: [''],
  });
  filteredClusterTemplates: Array<IClusterTemplateModel> = [];
  createOptions: IClusterCreateOptionsModel;
  clusterTemplate = this.createClusterForm.controls.cluster_template;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private clustersApiService: ClustersApiService,
    private clusterTemplatesApiService: ClusterTemplatesApiService,
    private notificationService: NotificationService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  matchAndPreselectFlavor(fieldName: string, template: IClusterTemplateModel) {
    // sometimes flavor on template is a string representing a name and we need to treat this
    // if we cannot match by id
    let flavorIdMatched = false;
    let matchedFlavorByName = null;
    for (const flavor of this.createOptions.flavors) {
      if (flavor.id === template[fieldName]) {
        flavorIdMatched = true;
        this.createClusterForm.controls[fieldName].setValue(template[fieldName]);
        break;
      }
      if (flavor.name === template[fieldName]) {
        matchedFlavorByName = flavor;
      }
    }
    if (!flavorIdMatched && matchedFlavorByName) {
      this.createClusterForm.controls[fieldName].setValue(matchedFlavorByName.id);
    }
  }

  formatLabelsToStr(labels) {
    let asString = '';
    for (const key in labels) {
      if (labels.hasOwnProperty(key)) {
         asString = asString + key + '=' + labels[key] + ',';
      }
    }
    return asString.substring(0, asString.length - 1); // remove last ',' as it is redundant
  };

  selectedTemplate() {
    if (this.clusterTemplate.value) {
      const clusterTemplateId = this.clusterTemplate.value.id;
      this.clustersApiService.createOptions({
        cluster_template_id: clusterTemplateId
      }).subscribe((response: IClusterCreateOptionsModel) => {
        this.createOptions = response;
        this.clusterTemplatesApiService.get(clusterTemplateId).subscribe((template: IClusterTemplateModel) => {
          if (template.docker_volume_size) {
            this.createClusterForm.controls.docker_volume_size.setValue(template.docker_volume_size);
          }
          if (template.master_flavor_id) {
            this.matchAndPreselectFlavor('master_flavor_id', template);
          }
          if (template.flavor_id) {
            this.matchAndPreselectFlavor('flavor_id', template);
          }
          if (template.labels) {
            const labelsToStr = this.formatLabelsToStr(
              JSON.parse(template.labels.replace(/'/g, '"'))
            );
            this.createClusterForm.controls.labels.setValue(labelsToStr);
          }
          if (template.keypair_id) {
            let templateKeyInCreateOptions = false;
            for (const keyPair of this.createOptions.keypairs) {
              if (keyPair.name === template.keypair_id) {
                templateKeyInCreateOptions = true;
              }
            }
            if (templateKeyInCreateOptions) {
              this.createClusterForm.controls.keypair.setValue(template.keypair_id);
            }
          }
        }, error => {
          this.notificationService.showMessage('Could not retrieve selected cluster template details.');
        });
      }, error => {
        this.notificationService.showMessage('Could not retrieve create options for cluster template.');
      });
    } else {
      this.createClusterForm.controls.flavor_id.setValue(null);
      this.createClusterForm.controls.master_flavor_id.setValue(null);
      this.createClusterForm.controls.labels.setValue('');
      this.createClusterForm.controls.keypair.setValue(null);
    }
  }

  clickedAutocompleteInput(formField: string) {
    this.createClusterForm.get(formField).setValue('');
  }

  displayClusterTemplateFn(clusterTemplate) {
    if (clusterTemplate) {
      return clusterTemplate.name || clusterTemplate.id;
    }
    return '';
  }

  createCluster(){
    const value = this.createClusterForm.value as any;
    if (value.cluster_template) {
      value.cluster_template_id = value.cluster_template.id;
      delete value.cluster_template;
    }
    if (!this.createClusterForm.invalid) {
      this.loading = true;
    }
    this.createOrUpdate(this.clustersApiService, value, true).subscribe(() => {
      this.loading = false;
      this.router.navigateByUrl(
        this.config.getPrevUrl('openstack/clusters')
      ).catch(() => {});
    }, error => {
      this.loading = false;
    });
    return of(null);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.createCluster();
      this.createOptions = this.objectController.additionalObjects.createOptions;
    }
    this.createClusterForm.get('cluster_template').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.clusterTemplatesApiService.list({
          search: value,
        }).pipe()),
      ).subscribe((response: { objects: Array<IClusterTemplateModel> }) => {
      this.filteredClusterTemplates = response.objects;
    });
  }

}
