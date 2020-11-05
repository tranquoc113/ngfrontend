import { MatDialog } from '@angular/material/dialog';
import { ObjectUIServiceBase } from '../../../shared/ui/objects-view/object-ui-service-base';
import { Router } from '@angular/router';
import { ConfigService } from '../../../shared/config/config.service';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { IIcon } from '../../../shared/ui/common/interfaces/icon';
import { IObjectStatus, StatusType, StatusValue } from '../../../shared/ui/objects-view/interfaces/object-status';
import { ITitle } from '../../../shared/ui/objects-view/interfaces/card-data/card-title';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { IDataField } from '../../../shared/ui/objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '../../../shared/ui/objects-view/interfaces/details/details-tab';
import { IRevenueReportModel } from '../../../shared/fleio-api/utils/model/revenue-report.model';
import { RevenueReportsApiService } from '../../../shared/fleio-api/utils/revenue-reports/revenue-reports-api.service';
import { RevenueReportOverviewComponent } from './tabs/revenue-report-overview/revenue-report-overview.component';
import { ApiCallAction } from '../../../shared/ui/objects-view/actions/api-call-action';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';
import { CallbackAction } from '../../../shared/ui/objects-view/actions/callback-action';
import { RevenueReportGenerateFormComponent } from './tabs/revenue-report-generate-form/revenue-report-generate-form.component';
import { AppColor } from '../../../shared/ui/common/enums/app-color.enum';

export class RevenueReportUiService extends ObjectUIServiceBase<IRevenueReportModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly revenueReportsApiService: RevenueReportsApiService;
  private readonly matDialog: MatDialog;


  constructor(
    revenueReports: IRevenueReportModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, revenueReportsApiService: RevenueReportsApiService, matDialog: MatDialog,
  ) {
    super(revenueReports, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.revenueReportsApiService = revenueReportsApiService;
  }

  getIcon(): IIcon {
    if (!this.object || (this.object && !this.object.id)) {
      return null;
    }
    if (!this.object.generating) {
      return {
        name: 'check',
        color: AppColor.Green
      };
    } else {
      return {
        name: 'close',
        color: AppColor.Red
      }
    }
  }

  getStatus(): IObjectStatus {
    return { type: StatusType.None, value: StatusValue.None };
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'details':
        return {
          text: `Report for ${this.object.report_month_year}`,
        };
      case 'generate':
        return {
          text: `Generate report`,
        };

      default:
        return {
          text: `Report for ${this.object.report_month_year}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];
    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'redo'},
        name: 'Regenerate',
        tooltip: 'Regenerate',
        confirmOptions: {
          confirm: true,
          title: 'Regenerate report?',
          message: `Are you sure you want to regenerate report?`
        },
        apiService: this.revenueReportsApiService,
        apiAction: 'regenerate_report',
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('utils/revenue-reports'),
      }
    ));
    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`utils/revenue-reports/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    return [
    ];
  }

  getCardTags(): string[] {
    return [];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: RevenueReportOverviewComponent,
          },
        ];
      case 'generate':
        return [
          {
            tabName: 'Generate',
            component: RevenueReportGenerateFormComponent,
          },
        ];
    }
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'generate':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`utils/revenue-reports`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Generate'}));
        break;
      default:
        break;
    }

    return actions;
  }

  getObjectDetailsRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      if (this.object && this.object.generating) {
        // while generating, refresh often
        return this.config.current.settings.refreshIntervals.reportDetailsInterval;
      } else {
        return this.config.current.settings.refreshIntervals.defaultInterval;
      }
    }
    return 10000;
  }

}
