import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IPublicKeyModel } from '@fleio-api/public-key/model/public-key.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IAction } from '@objects-view/interfaces/actions/action';
import { PublicKeysApiService } from '@fleio-api/public-key/public-key-api.service';
import { ClipboardService } from '@shared/ui-api/clipboard.service';

@Component({
  selector: 'app-ssh-key-edit-form',
  templateUrl: './ssh-key-edit-form.component.html',
  styleUrls: ['./ssh-key-edit-form.component.scss']
})
export class SshKeyEditFormComponent extends DetailsFormBase<IPublicKeyModel> implements OnInit {
  sshKeyForm = this.formBuilder.group({
    name: ['', Validators.required],
    public_key: ['', Validators.required],
    private_key: [''],
  });
  generatedKey: {};

  constructor(
    private formBuilder: FormBuilder,
    private publicKeysApiService: PublicKeysApiService,
    private router: Router,
    private config: ConfigService,
    public clipboard: ClipboardService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = (action: IAction) => this.keyActions(action);
    }
    if (this.object) {
      this.sshKeyForm.patchValue(this.object);
    }
  }

  keyActions(action: IAction): Observable<IActionResult> {
    if (action.name === 'Generate new key') {
      this.publicKeysApiService.getAction('get_generated_key_pair').subscribe(key => {
        this.generatedKey = key;
        this.sshKeyForm.patchValue(key);
      });
      return of(null);
    }
    const value = this.sshKeyForm.value;
    this.createOrUpdate(
      this.publicKeysApiService,
      value,
    ).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('openstack/ssh-keys')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
