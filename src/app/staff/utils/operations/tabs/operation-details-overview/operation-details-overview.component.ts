import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IOperationModel } from '../../../../../shared/fleio-api/utils/model/operation.model';
import { ConfigService } from '../../../../../shared/config/config.service';

@Component({
  selector: 'app-operation-details-overview',
  templateUrl: './operation-details-overview.component.html',
  styleUrls: ['./operation-details-overview.component.scss']
})
export class OperationDetailsOverviewComponent extends DetailsComponentBase<IOperationModel> implements OnInit  {

  constructor(public configService: ConfigService, ngZone: NgZone, changeDetectorRef: ChangeDetectorRef,) {
    super(ngZone, changeDetectorRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.configService && this.configService.current && this.configService.current.settings &&
      this.configService.current.settings.refreshIntervals) {
      this.setupRefreshTimer(this.configService.current.settings.refreshIntervals.operationDetailsInterval);
    }
  }

}
