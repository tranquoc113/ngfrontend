import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IOperationModel } from '../../../../shared/fleio-api/utils/model/operation.model';
import { OperationsListUiService } from '../operations-list-ui.service';

@Component({
  selector: 'app-operations-details',
  templateUrl: './operations-details.component.html',
  styleUrls: ['./operations-details.component.scss']
})
export class OperationsDetailsComponent extends DetailsBase<IOperationModel> {
  constructor(route: ActivatedRoute, operationsListUiService: OperationsListUiService) {
    super(route, operationsListUiService, 'details', 'operation');
  }
}
