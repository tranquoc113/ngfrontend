import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IPublicKeyModel } from '@fleio-api/public-key/model/public-key.model';
import { ActivatedRoute } from '@angular/router';
import { SshKeyListUIService } from '../ssh-key-list-ui.service';

@Component({
  selector: 'app-ssh-key-edit',
  templateUrl: './ssh-key-edit.component.html',
  styleUrls: ['./ssh-key-edit.component.scss']
})
export class SshKeyEditComponent extends DetailsBase<IPublicKeyModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, sshKeyListUIService: SshKeyListUIService) {
    super(route, sshKeyListUIService, 'edit', 'sshKey');
  }
}
