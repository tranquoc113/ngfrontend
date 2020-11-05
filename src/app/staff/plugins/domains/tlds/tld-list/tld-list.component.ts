import { Component } from '@angular/core';
import { ListBase } from '../../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../../shared/ui-api/refresh.service';
import { ITLDModel } from '../../../../../shared/fleio-api/plugins/domains/model/tld.model';
import { TLDListUiService } from '../tld-list-ui.service';

@Component({
  selector: 'app-tld-list',
  templateUrl: './tld-list.component.html',
  styleUrls: ['./tld-list.component.scss']
})
export class TldListComponent  extends ListBase<ITLDModel> {

  constructor(
    private route: ActivatedRoute, private tldListUiService: TLDListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, tldListUiService, refreshService, 'tlds');
  }
}
