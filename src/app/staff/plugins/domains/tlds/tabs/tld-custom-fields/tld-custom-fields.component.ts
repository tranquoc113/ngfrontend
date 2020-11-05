import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../../shared/ui/objects-view/details-component-base';
import { ITLDModel } from '../../../../../../shared/fleio-api/plugins/domains/model/tld.model';

@Component({
  selector: 'app-tld-custom-fields',
  templateUrl: './tld-custom-fields.component.html',
  styleUrls: ['./tld-custom-fields.component.scss']
})
export class TldCustomFieldsComponent extends DetailsComponentBase<ITLDModel> {

  constructor() {
    super();
  }
}
