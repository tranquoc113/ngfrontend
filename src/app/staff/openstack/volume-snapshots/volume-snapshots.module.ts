import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeSnapshotListComponent } from './volume-snapshot-list/volume-snapshot-list.component';
import { VolumeSnapshotDetailsComponent } from './volume-snapshot-details/volume-snapshot-details.component';
import { VolumeSnapshotDetailsOverviewComponent } from './tabs/volume-snapshot-details-overview/volume-snapshot-details-overview.component';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { VolumeSnapshotsRoutingModule } from './volume-snapshot-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    VolumeSnapshotListComponent,
    VolumeSnapshotDetailsComponent,
    VolumeSnapshotDetailsOverviewComponent,
  ],
    imports: [
        CommonModule,
        ObjectsViewModule,
        VolumeSnapshotsRoutingModule,
        FlexLayoutModule,
    ]
})
export class VolumeSnapshotsModule { }
