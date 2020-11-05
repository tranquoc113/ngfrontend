import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IActionResult } from '../../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { ClientGroupsApiService } from '../../../../../shared/fleio-api/client-user/client-group/client-groups-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../../shared/config/config.service';
import { IUserGroupModel } from '../../../../../shared/fleio-api/client-user/model/user-group.model';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';

@Component({
  selector: 'app-client-group-create-form',
  templateUrl: './client-group-edit-form.component.html',
  styleUrls: ['./client-group-edit-form.component.scss']
})
export class ClientGroupEditFormComponent extends DetailsFormBase<IUserGroupModel> implements OnInit {
  clientGroupForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    is_default: [false]
  });

  constructor(
    private formBuilder: FormBuilder, private clientGroupApi: ClientGroupsApiService, private router: Router,
    private config: ConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.objectController.actionCallback = () => this.saveClientGroup();
    this.clientGroupForm.patchValue(this.object);
  }

  saveClientGroup(): Observable<IActionResult> {
    const value = this.clientGroupForm.value;
    let request;

    if (this.object.id) {
      value.id = this.object.id;
      request = this.clientGroupApi.update(value.id, value);
    } else {
      request = this.clientGroupApi.create(value);
    }

    request.subscribe(() => {
        this.router.navigateByUrl(
          this.config.getPrevUrl('clients-users/client-groups')
        ).catch(() => {});
    }, (error) => {
      this.setErrors(error.error);
    });

    return of(null);
  }
}
