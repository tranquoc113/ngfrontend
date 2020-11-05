import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IBaseFleioObjectModel } from '../../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { FrontendCustomizationApiService } from '../../../../../shared/fleio-api/core/frontend-customization-api.service';
import { ICustomCodeModel } from '../../../../../shared/fleio-api/core/model/custom-code.model';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';

@Component({
  selector: 'app-frontend-customization',
  templateUrl: './frontend-customization.component.html',
  styleUrls: ['./frontend-customization.component.scss']
})
export class FrontendCustomizationComponent
  extends DetailsComponentBase<IBaseFleioObjectModel> implements OnDestroy {

  customCode: ICustomCodeModel;
  endUserInsertionPoints: string[];
  staffInsertionPoints: string[];

  constructor(
    private frontendCustomizationApi: FrontendCustomizationApiService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  protected initTabData() {
    this.frontendCustomizationApi.getCustomCode().subscribe(customCode => {
      this.customCode = customCode;
      this.endUserInsertionPoints = customCode.insertion_points.filter(i => i.endsWith('enduser_index'));
      this.staffInsertionPoints = customCode.insertion_points.filter(i => i.endsWith('staff_index'));
    });
  }

  ngOnDestroy(): void {
  }

  updateFrontend() {
    this.notificationService.confirmDialog(
      {
        title: 'Update frontend',
        message: 'Do you want to update frontend?'
      }
    ).subscribe(result => {
      if (result === 'yes') {
        this.frontendCustomizationApi.updateFrontend().subscribe(() => {
          this.initTabData();
          this.notificationService.showMessage('Frontend updated');
        })
      }
    })
  }

  saveCustomizations() {
    this.frontendCustomizationApi.saveCustomCode(this.customCode).pipe(catchError((error) => {
      if (error.error) {
        let detail = ': '
        if (error.error.detail) {
          detail += error.error.detail;
        }
        this.notificationService.showMessage(`Failed to save frontend customizations: ${detail}`)
        return EMPTY;
      } else {
        throw error;
      }
    })).subscribe(() => {
      this.notificationService.showMessage(
        'Frontend customizations saved',
      );
      this.initTabData();
    })
  }
}
