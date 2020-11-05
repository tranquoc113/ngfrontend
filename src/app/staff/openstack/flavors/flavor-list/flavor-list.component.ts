import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { FlavorListUIService } from '../flavor-list-ui.service';

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
