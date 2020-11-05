import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RevenueReportsRoutingModule } from './revenue-reports-routing.module';
import { RevenueReportsListComponent } from './revenue-reports-list/revenue-reports-list.component';
import { RevenueReportDetailsComponent } from './revenue-report-details/revenue-report-details.component';
import { RevenueReportOverviewComponent } from './tabs/revenue-report-overview/revenue-report-overview.component';
import { MatTableModule } from '@angular/material/table';
import { RevenueReportGenerateComponent } from './revenue-report-generate/revenue-report-generate.component';
import { RevenueReportGenerateFormComponent } from './tabs/revenue-report-generate-form/revenue-report-generate-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { UiModule } from '@shared/ui/ui.module';



@NgModule({
  declarations: [
    RevenueReportsListComponent,
    RevenueReportDetailsComponent,
    RevenueReportOverviewComponent,
    RevenueReportGenerateComponent,
    RevenueReportGenerateFormComponent
  ],
    imports: [
        CommonModule,
        RevenueReportsRoutingModule,
        ObjectsViewModule,
        FlexModule,
        MatIconModule,
        MatTableModule,
        MatDatepickerModule,
        MatInputModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        UiModule,
    ]
})
export class RevenueReportsModule { }
