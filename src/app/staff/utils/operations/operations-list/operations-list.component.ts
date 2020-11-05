import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { IOperationModel } from '../../../../shared/fleio-api/utils/model/operation.model';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { OperationsListUiService } from '../operations-list-ui.service';
import { ConfigService } from '../../../../shared/config/config.service';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.scss']
})
export class OperationsListComponent extends ListBase<IOperationModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private operationsListUiService: OperationsListUiService,
    private refreshService: RefreshService, private configService: ConfigService,
  ) {
    super(route, operationsListUiService, refreshService, 'operations');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
