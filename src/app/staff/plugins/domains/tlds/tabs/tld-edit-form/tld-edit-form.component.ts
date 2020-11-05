import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../../shared/ui/objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../../../shared/config/config.service';
import { IActionResult } from '../../../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { ITLDModel } from '../../../../../../shared/fleio-api/plugins/domains/model/tld.model';
import { TLDsApiService } from '../../../../../../shared/fleio-api/plugins/domains/tlds-api.service';

@Component({
  selector: 'app-tld-edit-form',
  templateUrl: './tld-edit-form.component.html',
  styleUrls: ['./tld-edit-form.component.scss']
})
export class TldEditFormComponent extends DetailsFormBase<ITLDModel> implements OnInit {
  tldForm = this.formBuilder.group({
    name: ['', Validators.required],
  });
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private config: ConfigService,
    private tldsApiService: TLDsApiService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.objectController) {
      this.objectController.actionCallback = () => this.tldsActions();
    }
  }

  tldsActions(): Observable<IActionResult> {
    const value = this.tldForm.value as ITLDModel;
    this.createOrUpdate(
      this.tldsApiService,
      value,
    ).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('plugins/domains/tlds')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
