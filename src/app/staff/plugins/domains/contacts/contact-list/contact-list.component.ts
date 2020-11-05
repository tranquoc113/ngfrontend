import { Component } from '@angular/core';
import { ListBase } from '../../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../../shared/ui-api/refresh.service';
import { IDomainContactModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain-contact.model';
import { ContactListUiService } from '../contact-list-ui.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent extends ListBase<IDomainContactModel> {
  constructor(
    private route: ActivatedRoute, private contactListUiService: ContactListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, contactListUiService, refreshService, 'domainContacts');
  }
}
