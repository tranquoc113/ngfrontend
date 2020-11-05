import { Component } from '@angular/core';
import { DetailsComponentBase } from '../../../../../../shared/ui/objects-view/details-component-base';
import { IDomainContactModel } from '../../../../../../shared/fleio-api/plugins/domains/model/domain-contact.model';

@Component({
  selector: 'app-contact-details-overview',
  templateUrl: './contact-details-overview.component.html',
  styleUrls: ['./contact-details-overview.component.scss']
})
export class ContactDetailsOverviewComponent extends DetailsComponentBase<IDomainContactModel> {
  constructor() {
    super();
  }
}
