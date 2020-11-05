import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IPublicKeyModel } from '@fleio-api/public-key/model/public-key.model';
import { ClipboardService } from '../../../../ui-api/clipboard.service';

@Component({
  selector: 'app-ssh-key-details-overview',
  templateUrl: './ssh-key-details-overview.component.html',
  styleUrls: ['./ssh-key-details-overview.component.scss']
})
export class SshKeyDetailsOverviewComponent extends DetailsComponentBase<IPublicKeyModel>{

  constructor(public clipboard: ClipboardService) {
    super();
  }
}
