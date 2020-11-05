import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IApiUserModel } from '@fleio-api/openstack/model/api-user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { ApiUsersApiService } from '@fleio-api/openstack/api-user/api-users-api.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { ProjectsApiService } from '@fleio-api/openstack/project/projects-api.service';

@Component({
  selector: 'app-api-user-edit-form',
  templateUrl: './api-user-edit-form.component.html',
  styleUrls: ['./api-user-edit-form.component.scss']
})
export class ApiUserCreateFormComponent extends DetailsFormBase<IApiUserModel> implements OnInit {
  apiUserForm = this.formBuilder.group({
    name: ['', Validators.required],
    default_project: ['', Validators.required],
    password: ['', Validators.required],
    description: [''],
  });
  loading = false;
  filteredProjects$: Observable<IProjectModel[]>;
  default_project = this.apiUserForm.controls.default_project;

  constructor(
    private formBuilder: FormBuilder, private apiUsersApiService: ApiUsersApiService, private router: Router,
    private config: ConfigService, private projectsApiService: ProjectsApiService,
  ) {
    super();
  }

  private saveUser(): Observable<IActionResult> {
    const value = this.apiUserForm.value as any;
    if (value.default_project.project_id) {
      value.default_project = value.default_project.project_id;
    } else {
      this.default_project.setErrors({doesNotExists: true});
    }
    this.loading = true;
    this.createOrUpdate(this.apiUsersApiService, value).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('openstack/api-users')
      ).catch(() => {
      });
    }).add(() => {
      this.loading = false;
    });
    return of(null);
  }

  projectDisplay(project?: IProjectModel): string | undefined {
    if (project) {
      return project.name;
    } else {
      return undefined;
    }
  }

  clearProjectInput() {
    this.default_project.setValue('');
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveUser();
    }

    this.filteredProjects$ = this.default_project.valueChanges.pipe(
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
}
