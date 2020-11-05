import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IDomainModel } from '../../../../shared/fleio-api/plugins/domains/model/domain.model';
import { ActivatedRoute } from '@angular/router';
import { DomainListUiService } from '../domain-list-ui.service';

@Component({
  selector: 'app-domain-details',
  templateUrl: './domain-details.component.html',
  styleUrls: ['./domain-details.component.scss']
})
export class DomainDetailsComponent extends DetailsBase<IDomainModel>{

  constructor(route: ActivatedRoute, domainListUiService: DomainListUiService) {
    super(route, domainListUiService, 'details', 'domain', ['createOptions']);
  }
}
