import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { IFlavorModel } from '../../../../shared/fleio-api/openstack/model/flavor.model';
import { ActivatedRoute } from '@angular/router';
import { FlavorListUIService } from '../../flavors/flavor-list-ui.service';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';

@Component({
  selector: 'app-flavor-list',
  templateUrl: './flavor-list.component.html',
  styleUrls: ['./flavor-list.component.scss']
})
export class FlavorListComponent extends ListBase<IFlavorModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private flavorListUIService: FlavorListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, flavorListUIService, refreshService, 'flavors');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
