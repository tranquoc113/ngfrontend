import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { RegistrarListUiService } from '../registrar-list-ui.service';
import { IDomainRegistrarModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain-registrar.model';

@Component({
  selector: 'app-registrar-create',
  templateUrl: './registrar-create.component.html',
  styleUrls: ['./registrar-create.component.scss']
})
export class RegistrarCreateComponent extends DetailsBase<IDomainRegistrarModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, registrarListUiService: RegistrarListUiService) {
    super(route, registrarListUiService, 'create', null);
  }
}
