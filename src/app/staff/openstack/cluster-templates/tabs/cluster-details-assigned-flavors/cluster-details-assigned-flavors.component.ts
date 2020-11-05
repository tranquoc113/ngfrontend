import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { FlavorsApiService } from '@fleio-api/openstack/flavor/flavors-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { ConfigService } from '@shared/config/config.service';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { ClusterTemplatesApiService } from '@fleio-api/openstack/cluster-template/cluster-templates-api.service';
import { map, mergeMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-cluster-details-assigned-flavors',
  templateUrl: './cluster-details-assigned-flavors.component.html',
  styleUrls: ['./cluster-details-assigned-flavors.component.scss']
})
export class ClusterDetailsAssignedFlavorsComponent extends DetailsFormBase<IClusterTemplateModel> implements OnInit {
  assignedFlavorsForm = this.formBuilder.group({
    flavor: ['']
  });
  selectedFlavor = this.assignedFlavorsForm.controls.flavor;
  filteredFlavors$: Observable<Array<IFlavorModel>>;
  displayedColumns = ['id', 'name', 'region', 'actions'];

  constructor(
    private formBuilder: FormBuilder,
    private flavorsApiService: FlavorsApiService,
    private clusterTemplatesApiService: ClusterTemplatesApiService,
    private notificationService: NotificationService,
    public config: ConfigService,
  ) {
    super();
  }

  protected refreshData() {
    this.clusterTemplatesApiService.get(this.object.id).subscribe(result => {
      this.objectController.object = result;
    });
  }

  assignFlavorToClusterTemplate() {
    const value = this.assignedFlavorsForm.value;
    if (value.flavor && value.flavor.id) {
      let dialogResult$: Observable<string>;
      dialogResult$ = this.notificationService.confirmDialog({
          title: `Assign flavor ${value.flavor.name} to cluster template?`,
          message: 'Are you sure?',
        });
      dialogResult$.subscribe(dialogResult => {
        if (dialogResult === 'yes') {
          this.clusterTemplatesApiService.assignFlavorToClusterTemplate(
            this.object.id,
            value.flavor.id
          ).subscribe(response => {
            this.refreshData();
          }, error => {
            this.refreshData();
            this.notificationService.showMessage('Could not add flavor to cluster template.');
          });
        }
      });
    } else {
      this.notificationService.showMessage('Please select a valid flavor.');
    }
  }

  removeFlavor(flavorId) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Remove assignment between flavor and cluster template?',
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.clusterTemplatesApiService.removeFlavorFromClusterTemplate(
          this.object.id, flavorId
        ).subscribe(response => {
          this.refreshData();
        }, error => {
          this.refreshData();
          this.notificationService.showMessage('Could not remove flavor from cluster template.');
        });
      }
    });
  }

  clickedFlavorInput() {
    this.assignedFlavorsForm.get('flavor').setValue('');
  }

  flavorDisplay(flavor?: IFlavorModel): string {
    if (flavor) {
      return `${flavor.name} - ${flavor.region}`;
    } else {
      return '';
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.filteredFlavors$ = this.selectedFlavor.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.clusterTemplatesApiService.getAvailableFlavorsToAssign(
          this.object.id,
          value
        ).pipe(map(flavorsList => flavorsList.objects));
      })
    );
  }

}
