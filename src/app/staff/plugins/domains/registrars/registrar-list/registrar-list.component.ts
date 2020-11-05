import { Component } from '@angular/core';
import { ListBase } from '../../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../../shared/ui-api/refresh.service';
import { RegistrarListUiService } from '../registrar-list-ui.service';
import { IDomainRegistrarModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain-registrar.model';

@Component({
  selector: 'app-registrar-list',
  templateUrl: './registrar-list.component.html',
  styleUrls: ['./registrar-list.component.scss']
})
export class RegistrarListComponent extends ListBase<IDomainRegistrarModel> {

  constructor(
    private route: ActivatedRoute, private registrarListUiService: RegistrarListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, registrarListUiService, refreshService, 'registrars');
  }
}
