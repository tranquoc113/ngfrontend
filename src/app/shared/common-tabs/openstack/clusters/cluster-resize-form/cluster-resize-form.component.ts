import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ClustersApiService } from '@fleio-api/openstack/cluster/clusters-api.service';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-cluster-resize-form',
  templateUrl: './cluster-resize-form.component.html',
  styleUrls: ['./cluster-resize-form.component.scss']
})
export class ClusterResizeFormComponent extends DetailsFormBase<IClusterModel> implements OnInit {
  resizeClusterForm = this.formBuilder.group({
    node_count: [null, [Validators.required, Validators.min(1)]],
    nodes_to_remove: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private clustersApiService: ClustersApiService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  resizeCluster() {
    this.validate();
    if (this.resizeClusterForm.invalid) {
      this.displayControlErrors();
      return of(null);
    }
    const value = this.resizeClusterForm.value;
    this.clustersApiService.resizeCluster(this.object.id, value).subscribe(response => {
      this.router.navigateByUrl(
        this.config.getPanelUrl(`openstack/clusters/${this.object.id}`)
      ).catch(() => {
      });
    }, error => {
      if (error.error) {
        this.setErrors(error.error);
      }
    });
    return of(null);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.resizeCluster();
    }
  }

}
