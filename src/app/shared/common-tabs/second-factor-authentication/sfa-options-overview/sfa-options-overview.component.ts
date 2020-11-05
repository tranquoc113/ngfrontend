import { Component, OnInit, Optional } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { ISfaTypeModel } from '@fleio-api/core/model/sfa-type.model';
import { ConfigService } from '@shared/config/config.service';
import { SfaTypesApiService } from '@fleio-api/core/sfa-types-api.service';
import { Router } from '@angular/router';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-sfa-options-overview',
  templateUrl: './sfa-options-overview.component.html',
  styleUrls: ['./sfa-options-overview.component.scss']
})
export class SfaOptionsOverviewComponent extends DetailsFormBase<any> implements OnInit {
  sfaOptions: Array<ISfaTypeModel>;
  loading = false;

  constructor(private config: ConfigService, private sfaTypesApiService: SfaTypesApiService,
              private router: Router, private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this.loading = true;
    this.sfaTypesApiService.hasPasswordConfirmed().subscribe(response => {
      if (!response.allowed) {
        this.notificationService.showMessage('You need to confirm password');
        this.router.navigateByUrl(this.config.getPanelUrl('sfa/confirm-password'));
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    })
    if (this.object) {
      this.sfaOptions = this.object.objects;
      for (const option of this.sfaOptions) {
        let sfaName = option.name;
        sfaName = sfaName.replace('_', '-');
        option.route = this.config.getPanelUrl(`sfa/${sfaName}`);
      }
    }
  }

}
