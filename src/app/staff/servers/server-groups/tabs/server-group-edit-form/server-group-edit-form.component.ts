import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../../shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '../../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { IServerGroupModel } from '../../../../../shared/fleio-api/servers/model/server-group.model';
import { ServerGroupsApiService } from '../../../../../shared/fleio-api/servers/server-groups-api.service';

@Component({
  selector: 'app-server-group-edit-form',
  templateUrl: './server-group-edit-form.component.html',
  styleUrls: ['./server-group-edit-form.component.scss']
})
export class ServerGroupEditFormComponent extends DetailsFormBase<IServerGroupModel> implements OnInit {
  serverGroupForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    placement: [1],
  });

  constructor(
    private formBuilder: FormBuilder,
    private serverGroupsApiService: ServerGroupsApiService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.serverActions();
    }

    if (this.object) {
      this.serverGroupForm.patchValue(this.object);
    }
  }

  serverActions(): Observable<IActionResult> {
    const value = this.serverGroupForm.value as IServerGroupModel;

    this.createOrUpdate(
      this.serverGroupsApiService,
      value,
    ).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('servers/server-groups')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
