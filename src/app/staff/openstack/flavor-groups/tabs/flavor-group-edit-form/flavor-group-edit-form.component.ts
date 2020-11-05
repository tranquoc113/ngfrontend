import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IFlavorGroupModel } from '@fleio-api/openstack/model/flavor-group.model';
import { FlavorGroupsApiService } from '@fleio-api/openstack/flavor-group/flavor-groups-api.service';

@Component({
  selector: 'app-flavor-group-edit-form',
  templateUrl: './flavor-group-edit-form.component.html',
  styleUrls: ['./flavor-group-edit-form.component.scss']
})
export class FlavorGroupEditFormComponent extends DetailsFormBase<IFlavorGroupModel> implements OnInit {
  flavorGroupForm = this.formBuilder.group({
    name: ['', Validators.required],
    priority: [0, Validators.required],
    description: ['', Validators.required],
    is_default: [false],
  });

  constructor(
    private formBuilder: FormBuilder,
    private flavorGroupsApiService: FlavorGroupsApiService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.flavorGroupActions();
    }

    if (this.object) {
      this.flavorGroupForm.patchValue(this.object);
    }
  }

  flavorGroupActions(): Observable<IActionResult> {
    const value = this.flavorGroupForm.value as IFlavorGroupModel;

    this.createOrUpdate(
      this.flavorGroupsApiService,
      value,
    ).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('openstack/flavor-groups')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
