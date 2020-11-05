import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IClientGroupModel } from '@fleio-api/client-user/model/client-group.model';
import { ClientGroupsApiService } from '@fleio-api/client-user/client-group/client-groups-api.service';

@Component({
  selector: 'app-client-group-edit-form',
  templateUrl: './client-group-edit-form.component.html',
  styleUrls: ['./client-group-edit-form.component.scss']
})
export class ClientGroupEditFormComponent extends DetailsFormBase<IClientGroupModel> implements OnInit {
  clientGroupForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    is_default: [false],
  });

  constructor(
    private formBuilder: FormBuilder,
    private clientGroupsApiService: ClientGroupsApiService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.clientGroupActions();
    }

    if (this.object) {
      this.clientGroupForm.patchValue(this.object);
    }
  }

  clientGroupActions(): Observable<IActionResult> {
    const value = this.clientGroupForm.value as IClientGroupModel;

    this.createOrUpdate(
      this.clientGroupsApiService,
      value,
    ).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('clients-users/client-groups')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
