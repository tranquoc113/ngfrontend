import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { ProjectsApiService } from '@fleio-api/openstack/project/projects-api.service';

@Component({
  selector: 'app-project-edit-form',
  templateUrl: './project-edit-form.component.html',
  styleUrls: ['./project-edit-form.component.scss']
})
export class ProjectEditFormComponent extends DetailsFormBase<IProjectModel> implements OnInit {
  projectForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    disabled: [false],
  });

  constructor(
    private formBuilder: FormBuilder,
    private projectsApiService: ProjectsApiService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.projectActions();
    }

    if (this.object) {
      this.projectForm.patchValue(this.object);
    }
  }

  projectActions(): Observable<IActionResult> {
    const value = this.projectForm.value as IProjectModel;

    this.createOrUpdate(
      this.projectsApiService,
      value,
    ).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('openstack/projects')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
