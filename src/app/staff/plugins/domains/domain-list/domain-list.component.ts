import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { DomainListUiService } from '../domain-list-ui.service';
import { IDomainModel } from '../../../../shared/fleio-api/plugins/domains/model/domain.model';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss']
})
export class DomainListComponent extends ListBase<IDomainModel> {

  constructor(
    private route: ActivatedRoute, private domainListUiService: DomainListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, domainListUiService, refreshService, 'domains');
  }
}
