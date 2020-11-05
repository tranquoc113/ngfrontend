import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ITLDModel } from '../../../../../shared/fleio-api/plugins/domains/model/tld.model';
import { TLDListUiService } from '../tld-list-ui.service';

@Component({
  selector: 'app-tld-details',
  templateUrl: './tld-details.component.html',
  styleUrls: ['./tld-details.component.scss']
})
export class TldDetailsComponent extends DetailsBase<ITLDModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, tldListUiService: TLDListUiService) {
    super(route, tldListUiService, 'details', 'tld', ['prices']);
  }
}
