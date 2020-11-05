import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IDomainModel } from '../../../../shared/fleio-api/plugins/domains/model/domain.model';
import { DomainListUiService } from '../domain-list-ui.service';

@Component({
  selector: 'app-domain-edit',
  templateUrl: './domain-edit.component.html',
  styleUrls: ['./domain-edit.component.scss']
})
export class DomainEditComponent extends DetailsBase<IDomainModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, domainListUiService: DomainListUiService) {
    super(route, domainListUiService, 'edit', 'domain', ['createOptions']);
  }
}
