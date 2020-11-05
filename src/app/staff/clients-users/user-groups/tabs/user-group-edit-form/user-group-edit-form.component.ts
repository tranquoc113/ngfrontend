import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IUserGroupModel } from '@fleio-api/client-user/model/user-group.model';
import { UserGroupsApiService } from '@fleio-api/client-user/user-group/user-groups-api.service';

@Component({
  selector: 'app-user-group-edit-form',
  templateUrl: './user-group-edit-form.component.html',
  styleUrls: ['./user-group-edit-form.component.scss']
})
export class UserGroupEditFormComponent extends DetailsFormBase<IUserGroupModel> implements OnInit {
  userGroupForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    is_default: [false],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userGroupsApiService: UserGroupsApiService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  ngOnInit() {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.userGroupActions();
    }

    if (this.object) {
      this.userGroupForm.patchValue(this.object);
    }
  }

  userGroupActions(): Observable<IActionResult> {
    const value = this.userGroupForm.value as IUserGroupModel;

    this.createOrUpdate(
      this.userGroupsApiService,
      value,
    ).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('clients-users/user-groups')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
