import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstanceListUIService } from '../instance-list-ui.service';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { IInstanceModel } from '../../../../shared/fleio-api/openstack/model/instance.model';

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.scss']
})
export class InstanceListComponent extends ListBase<IInstanceModel> implements OnInit {
  constructor(
    private route: ActivatedRoute, private instanceListUIService: InstanceListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, instanceListUIService, refreshService, 'instances');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
