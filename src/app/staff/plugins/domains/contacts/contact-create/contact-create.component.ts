import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IDomainContactModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain-contact.model';
import { ContactListUiService } from '../contact-list-ui.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent extends DetailsBase<IDomainContactModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, contactListUiService: ContactListUiService) {
    super(route, contactListUiService, 'create', null, ['createOptions']);
  }
}
