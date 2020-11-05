import { Component } from '@angular/core';
import { DetailsComponentBase } from '../../../../../../shared/ui/objects-view/details-component-base';
import { IDomainRegistrarModel } from '../../../../../../shared/fleio-api/plugins/domains/model/domain-registrar.model';

@Component({
  selector: 'app-registrar-details-overview',
  templateUrl: './registrar-details-overview.component.html',
  styleUrls: ['./registrar-details-overview.component.scss']
})
export class RegistrarDetailsOverviewComponent extends DetailsComponentBase<IDomainRegistrarModel> {

  constructor() {
    super();
  }
}
