import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPTY, Observable, of } from 'rxjs';
import { RoutersApiService } from '@fleio-api/openstack/routers/routers-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IRouterAddInterfaceCreateOptionsModel } from '@fleio-api/openstack/model/router-add-interface-create-options.model';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-router-add-interface-form',
  templateUrl: './router-add-interface-form.component.html',
  styleUrls: ['./router-add-interface-form.component.scss']
})
export class RouterAddInterfaceFormComponent extends DetailsFormBase<IRouterModel> implements OnInit {
  routerForm = this.formBuilder.group({
    subnet: ['', Validators.required],
    ip: ['', Validators.required],
  });

  createOptions: IRouterAddInterfaceCreateOptionsModel;

  constructor(
    private formBuilder: FormBuilder,
    private routersApiService: RoutersApiService,
    private router: Router,
    private config: ConfigService,
    private notificationService: NotificationService,
  ) {
    super();
  }


  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.routerActions();
      this.createOptions = this.objectController.additionalObjects.createOptions;
    }
  }

  routerActions(): Observable<IActionResult> {
    const value = this.routerForm.value as IRouterModel;

    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    this.routersApiService.addInterface(
      this.object.id, value,
    ).subscribe(response => {
      this.router.navigateByUrl(
        this.config.getPanelUrl(`openstack/routers/${this.object.id}`)
      ).catch(() => {
      });
      this.notificationService.showMessage('Interface added');
    }, error => {
      if (error.error) {
        this.setErrors(error.error);
        return EMPTY;
      } else {
        throw error;
      }
    });

    return of(null);
  }
}
