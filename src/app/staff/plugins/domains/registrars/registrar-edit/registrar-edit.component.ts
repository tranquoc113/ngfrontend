import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IDomainRegistrarModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain-registrar.model';
import { RegistrarListUiService } from '../registrar-list-ui.service';

@Component({
  selector: 'app-registrar-edit',
  templateUrl: './registrar-edit.component.html',
  styleUrls: ['./registrar-edit.component.scss']
})
export class RegistrarEditComponent extends DetailsBase<IDomainRegistrarModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, registrarListUiService: RegistrarListUiService) {
    super(route, registrarListUiService, 'edit', 'registrar');
  }
}
