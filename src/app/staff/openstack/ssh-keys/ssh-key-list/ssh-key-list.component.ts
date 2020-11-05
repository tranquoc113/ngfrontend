import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { IPublicKeyModel } from '@fleio-api/public-key/model/public-key.model';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { SshKeyListUIService } from '../ssh-key-list-ui.service';

@Component({
  selector: 'app-ssh-key-list',
  templateUrl: './ssh-key-list.component.html',
  styleUrls: ['./ssh-key-list.component.scss']
})
export class SshKeyListComponent extends ListBase<IPublicKeyModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private sshKeyListUIService: SshKeyListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, sshKeyListUIService, refreshService, 'sshKeys');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
