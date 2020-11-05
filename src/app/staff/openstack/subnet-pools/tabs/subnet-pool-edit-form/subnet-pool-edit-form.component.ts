import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';
import { SubnetPoolsApiService } from '@fleio-api/openstack/subnet-pools/subnet-pools-api.service';
import { ISubnetPoolCreateOptionsModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool-create-options.model';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { ProjectsApiService } from '@fleio-api/openstack/project/projects-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-subnet-pool-edit-form',
  templateUrl: './subnet-pool-edit-form.component.html',
  styleUrls: ['./subnet-pool-edit-form.component.scss']
})
export class SubnetPoolEditFormComponent extends DetailsFormBase<ISubnetPoolModel> implements OnInit {
  subnetPoolForm = this.formBuilder.group({
    project_id: ['', Validators.required],
    region: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    default_prefixlen: [24, Validators.required],
    min_prefixlen: [24, Validators.required],
    max_prefixlen: [24, Validators.required],
    default_quota: [],
    shared: [false],
    is_default: [false],
    prefixes: this.formBuilder.array([]),
  });
  createOptions: ISubnetPoolCreateOptionsModel;
  filteredProjects$: Observable<IProjectModel[]>;

  constructor(
    private formBuilder: FormBuilder,
    private subnetPoolsApiService: SubnetPoolsApiService,
    private router: Router,
    private config: ConfigService,
    private projectsApiService: ProjectsApiService,
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
    this.subnetPoolForm.controls.project_id.setValue(null);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.subnetPoolActions();
      this.createOptions = this.objectController.additionalObjects.createOptions;
    }

    if (this.object && this.object.id) {
      for (const prefix of this.object.prefixes) {
        this.prefixes.push(new FormControl('', Validators.required));
      }
      this.subnetPoolForm.patchValue(this.object);
    } else {
      if (this.createOptions) {
        this.subnetPoolForm.controls.region.setValue(this.createOptions.selected_region);
      }
      this.prefixes.push(new FormControl('', Validators.required));
    }

    this.filteredProjects$ = this.subnetPoolForm.controls.project_id.valueChanges.pipe(
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
  }

  subnetPoolActions(): Observable<IActionResult> {
    const value = this.subnetPoolForm.value as ISubnetPoolModel;
    if (value.project_id) {
      if (typeof value.project_id !== 'string') {
        value.project_id = (value.project_id as unknown as IProjectModel).project_id;
      }
    }

    this.createOrUpdate(
      this.subnetPoolsApiService,
      value,
    ).subscribe(() => {
      this.notificationService.showMessage('Subnet pool saved');
      this.router.navigateByUrl(
        this.config.getPrevUrl('openstack/subnet-pools')
      ).catch(() => {
      });
    });

    return of(null);
  }

  get prefixes(): FormArray {
    return this.subnetPoolForm.controls.prefixes as FormArray;
  }

  addPrefix() {
    this.prefixes.push(new FormControl('', Validators.required));
  }

  deletePrefix(index: number) {
    this.prefixes.removeAt(index);
  }
}
