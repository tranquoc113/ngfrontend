import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPublicKeyModel } from '../../../../shared/fleio-api/public-key/model/public-key.model';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { SshKeyListUIService } from '../ssh-key-list-ui.service';

@Component({
  selector: 'app-ssh-key-details',
  templateUrl: './ssh-key-details.component.html',
  styleUrls: ['./ssh-key-details.component.scss']
})
export class SshKeyDetailsComponent extends DetailsBase<IPublicKeyModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, sshKeyListUIService: SshKeyListUIService) {
    super(route, sshKeyListUIService, 'details', 'sshKey');
  }
}
