import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IPublicKeyModel } from '@fleio-api/public-key/model/public-key.model';
import { ActivatedRoute } from '@angular/router';
import { SshKeyListUIService } from '../ssh-key-list-ui.service';

@Component({
  selector: 'app-ssh-key-create',
  templateUrl: './ssh-key-create.component.html',
  styleUrls: ['./ssh-key-create.component.scss']
})
export class SshKeyCreateComponent extends DetailsBase<IPublicKeyModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, sshKeyListUIService: SshKeyListUIService) {
    super(route, sshKeyListUIService, 'create', null);
  }
}
