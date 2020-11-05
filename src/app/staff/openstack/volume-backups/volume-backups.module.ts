import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeBackupListComponent } from './volume-backup-list/volume-backup-list.component';
import { VolumeBackupDetailsComponent } from './volume-backup-details/volume-backup-details.component';
import { VolumeBackupDetailsOverviewComponent } from './tabs/volume-backup-details-overview/volume-backup-details-overview.component';
import { VolumeBackupsRoutingModule } from './volume-backups-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FlexModule } from '@angular/flex-layout';
import { UiModule } from '@shared/ui/ui.module';
import { CommonDialogsModule } from '@shared/common-dialogs/common-dialogs.module';


@NgModule({
  declarations: [
    VolumeBackupListComponent,
    VolumeBackupDetailsComponent,
    VolumeBackupDetailsOverviewComponent,
  ],
  imports: [
    CommonModule,
    VolumeBackupsRoutingModule,
    ObjectsViewModule,
    FlexModule,
    UiModule,
    CommonDialogsModule,
  ]
})
export class VolumeBackupsModule {
}
