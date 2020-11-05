import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLogListComponent } from './activity-log-list/activity-log-list.component';
import { ActivityLogRoutingModule } from './activity-log-routing.module';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { ActivityLogDetailComponent } from './tabs/activity-log-detail/activity-log-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    ActivityLogListComponent,
    ActivityLogDetailComponent,
  ],
  imports: [
    CommonModule,
    ActivityLogRoutingModule,
    ObjectsViewModule,
    FlexLayoutModule,
  ]
})
export class ActivityLogModule {
}
