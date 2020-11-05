import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IDomainModel } from '../../../../shared/fleio-api/plugins/domains/model/domain.model';
import { ActivatedRoute } from '@angular/router';
import { DomainListUiService } from '../domain-list-ui.service';

@Component({
  selector: 'app-domain-transfer',
  templateUrl: './domain-transfer.component.html',
  styleUrls: ['./domain-transfer.component.scss']
})
export class DomainTransferComponent extends DetailsBase<IDomainModel> {

  constructor(route: ActivatedRoute, domainListUiService: DomainListUiService) {
    super(route, domainListUiService, 'transfer', null);
  }
}
