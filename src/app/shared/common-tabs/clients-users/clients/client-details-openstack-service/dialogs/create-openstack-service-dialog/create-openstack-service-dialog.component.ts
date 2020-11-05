import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClientModel } from '../../../../../../fleio-api/client-user/model/client.model';
import { OpenstackClientsApiService } from '@fleio-api/openstack/clients/openstack-clients-api.service';
import { NotificationService } from '../../../../../../ui-api/notification.service';
import { catchError, map, mergeMap, startWith } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { IProductModel } from '../../../../../../fleio-api/billing/model/product.model';
import { IProductCycleModel } from '../../../../../../fleio-api/billing/model/product-cycle.model';
import { IProjectModel } from '../../../../../../fleio-api/openstack/model/project.model';
import { ClientsApiService } from '../../../../../../fleio-api/client-user/client/clients-api.service';

@Component({
  selector: 'app-create-openstack-service-dialog',
  templateUrl: './create-openstack-service-dialog.component.html',
  styleUrls: ['./create-openstack-service-dialog.component.scss']
})
export class CreateOpenstackServiceDialogComponent implements OnInit {
  createOpenstackServiceForm = this.formBuilder.group({
    product_id: ['', Validators.required],
    product_cycle_id: ['', Validators.required],
    create_new_project: [false],
    project_id: [null, Validators.required]
  });

  availableProducts: IProductModel[];
  selectedProductCycles: IProductCycleModel[];
  filteredProjects$: Observable<IProjectModel[]>;
  project = this.createOpenstackServiceForm.controls.project_id;

  constructor(
    public dialogRef: MatDialogRef<CreateOpenstackServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      client: IClientModel,
    },
    private formBuilder: FormBuilder,
    private cloudClientsApi: OpenstackClientsApiService,
    private notificationService: NotificationService,
    private clientsApi: ClientsApiService,
  ) {
  }

  ngOnInit() {
    if (this.data && this.data.client) {
      this.cloudClientsApi.objectGetAction(
        this.data.client.id, 'new_service_data',
      ).subscribe((newServiceData => {
        this.availableProducts = newServiceData.products;
        if (this.availableProducts.length > 0) {
          this.createOpenstackServiceForm.patchValue({
            product_id: this.availableProducts[0].id,
            product_cycle_id: this.availableProducts[0].cycles[0].id,
          });
        }
      }));
    }

    this.createOpenstackServiceForm.controls.product_id.valueChanges.subscribe(
      productId => {
        this.selectedProductCycles = [];
        for (const product of this.availableProducts) {
          if (product.id === productId) {
            this.selectedProductCycles = product.cycles;
          }
        }
      }
    );

    this.createOpenstackServiceForm.controls.create_new_project.valueChanges.subscribe(
      createNewProject => {
        if (createNewProject) {
          this.createOpenstackServiceForm.controls.project_id.disable();
        } else {
          this.createOpenstackServiceForm.controls.project_id.enable();
        }
      }
    );

    if (this.data && this.data.client) {
      this.filteredProjects$ = this.project.valueChanges.pipe(
        startWith(''),
        map(value => {
          if (value) {
            return typeof value === 'string' ? value : value.project_id;
          } else {
            return null;
          }
        }),
        mergeMap(value => {
          return this.clientsApi.objectGetAction(
            this.data.client.id,
            'get_os_projects_for_os_service_creation',
            value ? {search: value} : null,
          ).pipe(map(projectsList => {
            if (projectsList) {
              return projectsList.objects;
            } else {
              return [];
            }
          }));
        })
      );
    }
  }

  projectDisplay(project?: IProjectModel): string | undefined {
    if (project) {
      return project.name;
    } else {
      return undefined;
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  createOpenstackService() {
    if (this.createOpenstackServiceForm.invalid) {
      return;
    }
    const params = this.createOpenstackServiceForm.value;
    params.id = this.data.client.id;
    if (params.project_id) {
      params.project_id = params.project_id.project_id;
    }

    this.cloudClientsApi.objectPostAction(
      this.data.client.id, 'create_openstack_service', params,
    ).pipe(
      catchError((response) => {
        this.notificationService.showMessage(response.error.detail);
        return EMPTY;
      }),
    ).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
