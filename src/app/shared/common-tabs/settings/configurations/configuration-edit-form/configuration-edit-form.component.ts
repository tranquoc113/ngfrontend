import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IConfigurationModel } from '../../../../fleio-api/configurations/model/configuration.model';
import { DetailsFormBase } from '../../../../ui/objects-view/details-form-base';
import { ConfigurationsApiService } from '../../../../fleio-api/configurations/configurations-api.service';
import { ConfigService } from '../../../../config/config.service';
import { IActionResult } from '../../../../ui/objects-view/interfaces/actions/action-result';

@Component({
  selector: 'app-configuration-edit-form',
  templateUrl: './configuration-edit-form.component.html',
  styleUrls: ['./configuration-edit-form.component.scss']
})
export class ConfigurationEditFormComponent extends DetailsFormBase<IConfigurationModel> implements OnInit {
  configurationForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    is_default: [false],
    reseller_resources: [''],
  });

  constructor(
    private formBuilder: FormBuilder, private configurationsApiService: ConfigurationsApiService,
    private router: Router, private config: ConfigService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveConfiguration();
    }
    if (this.object) {
      this.configurationForm.patchValue(this.object);
    }
  }

  saveConfiguration(): Observable<IActionResult> {
    const value = this.configurationForm.value as IConfigurationModel;

    this.createOrUpdate(this.configurationsApiService, value).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('settings/configurations')
      ).catch(() => {});
    });

    return of(null);
  }
}
