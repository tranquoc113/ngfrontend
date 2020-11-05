import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IDomainModel } from '../../../../shared/fleio-api/plugins/domains/model/domain.model';
import { ActivatedRoute } from '@angular/router';
import { DomainListUiService } from '../domain-list-ui.service';

@Component({
  selector: 'app-domain-register',
  templateUrl: './domain-register.component.html',
  styleUrls: ['./domain-register.component.scss']
})
export class DomainRegisterComponent extends DetailsBase<IDomainModel> {

  constructor(route: ActivatedRoute, domainListUiService: DomainListUiService) {
    super(route, domainListUiService, 'register', null);
  }
}
