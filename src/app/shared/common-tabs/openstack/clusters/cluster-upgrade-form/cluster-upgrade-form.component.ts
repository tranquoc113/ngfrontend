import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ClustersApiService } from '@fleio-api/openstack/cluster/clusters-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { ClusterTemplatesApiService } from '@fleio-api/openstack/cluster-template/cluster-templates-api.service';

@Component({
  selector: 'app-cluster-upgrade-form',
  templateUrl: './cluster-upgrade-form.component.html',
  styleUrls: ['./cluster-upgrade-form.component.scss']
})
export class ClusterUpgradeFormComponent extends DetailsFormBase<IClusterModel> implements OnInit {
  upgradeClusterForm = this.formBuilder.group({
    cluster_template: ['', Validators.required],
  });
  filteredClusterTemplates$: Observable<IClusterTemplateModel[]>;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private clustersApiService: ClustersApiService,
    private clusterTemplatesApiService: ClusterTemplatesApiService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  upgradeCluster() {
    this.validate();
    if (this.upgradeClusterForm.invalid) {
      this.displayControlErrors();
      return of(null);
    }
    const value = this.upgradeClusterForm.value;
    if (value.cluster_template && value.cluster_template.id) {
      value.cluster_template = value.cluster_template.id;
    }
    this.loading = true;
    this.clustersApiService.upgradeCluster(this.object.id, value.cluster_template).subscribe(response => {
      this.router.navigateByUrl(
        this.config.getPanelUrl(`openstack/clusters/${this.object.id}`)
      ).catch(() => {
      });
    }, error => {
      if (error.error) {
        this.setErrors(error.error);
      }
    }).add(() => {
      this.loading = false;
    });
    return of(null);
  }

  clearClusterTemplate() {
    this.upgradeClusterForm.controls.cluster_template.setValue('');
  }

  clusterTemplateDisplay(clusterTemplate?: IClusterTemplateModel): string | undefined {
    if (clusterTemplate) {
      return clusterTemplate.name ? `${clusterTemplate.name} - ${clusterTemplate.id}` : clusterTemplate.id.toString();
    } else {
      return undefined;
    }
  }

  ngOnInit(): void {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.upgradeCluster();
    }
    this.filteredClusterTemplates$ = this.upgradeClusterForm.controls.cluster_template.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value) {
          return typeof value === 'string' ? value : value.id;
        } else {
          return '';
        }
      }),
      mergeMap(value => {
        return this.clusterTemplatesApiService.list({
          search: value,
        }).pipe(map(clusterTemplatesList => {
          if (clusterTemplatesList) {
            return clusterTemplatesList.objects;
          } else {
            return [];
          }
        }));
      })
    );
  }
}
