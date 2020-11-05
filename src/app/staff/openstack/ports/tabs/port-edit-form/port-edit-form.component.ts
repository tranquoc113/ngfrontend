import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IPortModel } from '@fleio-api/openstack/model/port.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IPortCreateOptionsModel } from '@fleio-api/openstack/model/port-create-options.model';
import { PortsApiService } from '@fleio-api/openstack/port/ports-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';

@Component({
  selector: 'app-port-edit-form',
  templateUrl: './port-edit-form.component.html',
  styleUrls: ['./port-edit-form.component.scss']
})
export class PortEditFormComponent  extends DetailsFormBase<IPortModel> implements OnInit {
  portForm = this.formBuilder.group({
    name: ['', Validators.required],
    admin_state_up: [true],
    port_security_enabled: [true],
    vnic_type: [''],
    description: [''],
  });
  createOptions: IPortCreateOptionsModel;
  isEditForm: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private portsApiService: PortsApiService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  ngOnInit() {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.portActions();
      if (this.objectController.additionalObjects) {
        this.createOptions = this.objectController.additionalObjects.createOptions as IPortCreateOptionsModel;
      }
    }

    if (this.object && this.object.id) {
      this.isEditForm = true;
      this.portForm.patchValue(this.object);
    }
  }

  portActions(): Observable<IActionResult> {
    const value = this.portForm.value as any;
    const port = {...this.object, ...value};

    this.createOrUpdate(
      this.portsApiService,
      port,
    ).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('openstack/ports')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
