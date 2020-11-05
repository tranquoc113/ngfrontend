import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';
import { FormGroup } from '@angular/forms';
import { IConfigOptionModel } from '../../../../../shared/fleio-api/billing/model/config-option.model';

@Component({
  selector: 'app-config-option-edit-form',
  templateUrl: './config-option-edit-form.component.html',
  styleUrls: ['./config-option-edit-form.component.scss']
})
export class ConfigOptionEditFormComponent extends DetailsFormBase<IConfigOptionModel> implements OnInit {
  configOptionForm: FormGroup;
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
