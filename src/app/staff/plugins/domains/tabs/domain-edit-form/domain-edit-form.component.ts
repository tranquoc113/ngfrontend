import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../../shared/config/config.service';
import { IActionResult } from '../../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { IDomainModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain.model';
import { DomainApiService } from '../../../../../shared/fleio-api/plugins/domains/domain-api.service';
import { IDomainCreateOptionsModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain-create-options.model';

@Component({
  selector: 'app-domain-edit-form',
  templateUrl: './domain-edit-form.component.html',
  styleUrls: ['./domain-edit-form.component.scss']
})
export class DomainEditFormComponent extends DetailsFormBase<IDomainModel> implements OnInit {
  domainForm = this.formBuilder.group({
    name: ['', Validators.required],
    status: ['', Validators.required],
    registration_period: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
  });

  createOptions: IDomainCreateOptionsModel;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private config: ConfigService,
    private domainApiService: DomainApiService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.objectController) {
      this.objectController.actionCallback = () => this.domainActions();
    }

    if (this.object) {
      this.domainForm.patchValue(this.object);
    }

    if (this.objectController) {
      this.createOptions = this.objectController.additionalObjects.createOptions as IDomainCreateOptionsModel;
    }
  }

  domainActions(): Observable<IActionResult> {
    const value = this.domainForm.value as IDomainModel;
    this.createOrUpdate(
      this.domainApiService,
      value,
    ).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('plugins/domains')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
