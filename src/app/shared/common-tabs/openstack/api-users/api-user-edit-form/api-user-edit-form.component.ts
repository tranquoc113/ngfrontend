import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IApiUserModel } from '@fleio-api/openstack/model/api-user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../config/config.service';
import { ApiUsersApiService } from '@fleio-api/openstack/api-user/api-users-api.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';

@Component({
  selector: 'app-api-user-edit-form',
  templateUrl: './api-user-edit-form.component.html',
  styleUrls: ['./api-user-edit-form.component.scss']
})
export class ApiUserEditFormComponent extends DetailsFormBase<IApiUserModel> implements OnInit {
  apiUserForm = this.formBuilder.group({
    name: ['', Validators.required],
    password: [null],
    description: [''],
  });
  loading = false;

  constructor(
    private formBuilder: FormBuilder, private apiUsersApiService: ApiUsersApiService, private router: Router,
    private config: ConfigService
  ) {
    super();
  }

  private saveApiUser(): Observable<IActionResult> {
    const value = this.apiUserForm.value as any;
    if (value.password === null) {
      delete value.password;
    }
    this.loading = true;
    this.createOrUpdate(this.apiUsersApiService, value).subscribe(() => {
      this.loading = false;
      this.router.navigateByUrl(
        this.config.getPrevUrl('openstack/api-users')
      ).catch(() => {
        this.loading = false;
      });
    });
    return of(null);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveApiUser();
    }
    if (this.object) {
      this.apiUserForm.patchValue(this.object);
    }
  }

}
