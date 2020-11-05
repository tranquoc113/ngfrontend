import { Component, OnInit } from '@angular/core';
import { IDomainModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain.model';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../../shared/config/config.service';
import { DomainApiService } from '../../../../../shared/fleio-api/plugins/domains/domain-api.service';
import { EMPTY } from 'rxjs';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';

@Component({
  selector: 'app-domain-details-nameservers',
  templateUrl: './domain-details-nameservers.component.html',
  styleUrls: ['./domain-details-nameservers.component.scss']
})
export class DomainDetailsNameserversComponent extends DetailsFormBase<IDomainModel> implements OnInit {
  domainForm = this.formBuilder.group({
    nameserver1: ['', Validators.required],
    nameserver2: [''],
    nameserver3: [''],
    nameserver4: [''],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private config: ConfigService,
    private domainApiService: DomainApiService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.object) {
      if (this.object.nameservers) {
        this.domainForm.patchValue({
          nameserver1: this.object.nameservers[0] ? this.object.nameservers[0].host_name : '',
          nameserver2: this.object.nameservers[1] ? this.object.nameservers[1].host_name : '',
          nameserver3: this.object.nameservers[2] ? this.object.nameservers[2].host_name : '',
          nameserver4: this.object.nameservers[3] ? this.object.nameservers[3].host_name : '',
        })
      }
    }
  }

  saveNameservers() {
    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    const value = this.domainForm.value as IDomainModel;

    this.domainApiService.saveNameservers(this.object.id, value).subscribe(
      () => {
        this.notificationService.showMessage('Nameservers saved successfully');
      },
      error => {
        if (error.error) {
          this.setErrors(error.error);
        }
        this.notificationService.showMessage('Failed to save nameservers');
      }
    )
  }
}
