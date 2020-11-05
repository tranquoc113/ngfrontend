import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { IActivityLogModel } from '../../../../shared/fleio-api/utils/model/activity-log.model';
import { ActivityLogListUiService } from '../activity-log-list-ui.service';

@Component({
  selector: 'app-activity-log-list',
  templateUrl: './activity-log-list.component.html',
  styleUrls: ['./activity-log-list.component.scss']
})
export class ActivityLogListComponent extends ListBase<IActivityLogModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private activityLogListUiService: ActivityLogListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, activityLogListUiService, refreshService, 'activityLog');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
