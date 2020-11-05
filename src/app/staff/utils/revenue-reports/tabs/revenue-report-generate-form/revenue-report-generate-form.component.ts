import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IRevenueReportModel } from '../../../../../shared/fleio-api/utils/model/revenue-report.model';
import { FormBuilder } from '@angular/forms';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import { of } from 'rxjs';
import {
  RevenueReportsApiService
} from '@fleio-api/utils/revenue-reports/revenue-reports-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-revenue-report-generate-form',
  templateUrl: './revenue-report-generate-form.component.html',
  styleUrls: ['./revenue-report-generate-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class RevenueReportGenerateFormComponent extends DetailsComponentBase<IRevenueReportModel> implements OnInit  {
  @ViewChild('formErrors') formErrors;
  dpForm = this.formBuilder.group({
    date: [moment()]
  });
  constructor(private revenueReportsApiService: RevenueReportsApiService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private config: ConfigService) {
    super();
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dpForm.controls.date.value;
    ctrlValue.year(normalizedYear.year());
    this.dpForm.controls.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.dpForm.controls.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.dpForm.controls.date.setValue(ctrlValue);
    datepicker.close();
  }

  generate() {
    let date: Date = null;
    if (this.dpForm.controls.date && this.dpForm.controls.date.value) {
      date = this.dpForm.controls.date.value.toDate();
    }
    if (date) {
      this.revenueReportsApiService.generateForDate(date.getMonth() + 1, date.getFullYear())
        .subscribe(response => {
          this.notificationService.showMessage('Revenue report generation was started.');
          this.router.navigateByUrl(
            this.config.getPanelUrl('utils/revenue-reports')
          ).catch();
        }, error => {
          this.formErrors.setBackendErrors(error.error.detail);
        });
    }
    return of(null);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.generate();
    }
  }

}
