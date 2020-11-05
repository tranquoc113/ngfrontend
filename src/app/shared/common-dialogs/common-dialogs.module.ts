import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlingModule } from '../error-handling/error-handling.module';
import { PricingPlanDeleteComponent } from './settings/openstack/openstack-plans/pricing-plan-delete/pricing-plan-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ApiUserDownloadOpenrcComponent } from './openstack/api-users/api-user-download-openrc/api-user-download-openrc.component';
import { InvoiceDeleteDialogComponent } from './billing/invoices/invoice-delete-dialog/invoice-delete-dialog.component';
import { ServiceEnableBillingComponent } from '@billing-service-dialogs/service-enable-billing/service-enable-billing.component';
import { ChangeCreditDialogComponent } from '@shared/common-dialogs/clients-users/clients/change-credit-dialog/change-credit-dialog.component';
import { UiModule } from '@shared/ui/ui.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { VolumeRenameComponent } from '@shared/common-dialogs/openstack/volumes/volume-rename/volume-rename.component';
import { VolumeExtendComponent } from '@shared/common-dialogs/openstack/volumes/volume-extend/volume-extend.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditVolumeSnapshotDialogComponent } from '@shared/common-dialogs/volume-snapshots/edit-volume-snapshot-dialog/edit-volume-snapshot-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { ResetVolumeSnapshotStateDialogComponent } from '@shared/common-dialogs/volume-snapshots/reset-volume-snapshot-state-dialog/reset-volume-snapshot-state-dialog.component';
import { EditVolumeBackupDialogComponent } from '@shared/common-dialogs/openstack/volme-backups/edit-volume-backup-dialog/edit-volume-backup-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RestoreVolumeBackupDialogComponent } from '@shared/common-dialogs/openstack/volme-backups/restore-volume-backup-dialog/restore-volume-backup-dialog.component';
import { ProductCycleEditFormComponent } from './billing/products/product-cycle-edit-form/product-cycle-edit-form.component';
import { FlexModule } from '@angular/flex-layout';
import { ProductGroupEditFormComponent } from './billing/products/product-group-edit-form/product-group-edit-form.component';
import { ProductAssociateOptionDialogComponent } from './billing/products/product-associate-option-dialog/product-associate-option-dialog.component';
import { InstanceDetailsCreateSnapshotDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-details-create-snapshot-dialog/instance-details-create-snapshot-dialog.component';
import { InstanceDetailsAutoAddIpDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-details-auto-add-ip-dialog/instance-details-auto-add-ip-dialog.component';
import { InstanceDetailsAttachVolumeDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-details-attach-volume-dialog/instance-details-attach-volume-dialog.component';
import { InstanceDetailsAddPortDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-details-add-port-dialog/instance-details-add-port-dialog.component';
import { InstanceDetailsAddIpDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-details-add-ip-dialog/instance-details-add-ip-dialog.component';
import { InstanceRenameDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-rename-dialog/instance-rename-dialog.component';
import { InstanceChangePasswordDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-change-password-dialog/instance-change-password-dialog.component';
import { InstanceMoveDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-move-dialog/instance-move-dialog.component';
import { InstanceMigrateDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-migrate-dialog/instance-migrate-dialog.component';
import { InstanceDetailsAttachPortDialogComponent } from './openstack/instances/instance-details-attach-port-dialog/instance-details-attach-port-dialog.component';
import { InstanceDetailsAssociateIpDialogComponent } from './openstack/instances/instance-details-associate-ip-dialog/instance-details-associate-ip-dialog.component';
import { InstanceAssociateSecurityGroupDialogComponent } from './openstack/instances/instance-associate-security-group-dialog/instance-associate-security-group-dialog.component';
import { CreateOsBackupScheduleDialogComponent } from './openstack/instances/create-os-backup-schedule-dialog/create-os-backup-schedule-dialog.component';
import { CreateOsBackupDialogComponent } from './openstack/instances/create-os-backup-dialog/create-os-backup-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    PricingPlanDeleteComponent,
    ApiUserDownloadOpenrcComponent,
    InvoiceDeleteDialogComponent,
    ServiceEnableBillingComponent,
    ChangeCreditDialogComponent,
    VolumeRenameComponent,
    VolumeExtendComponent,
    EditVolumeSnapshotDialogComponent,
    ResetVolumeSnapshotStateDialogComponent,
    EditVolumeBackupDialogComponent,
    RestoreVolumeBackupDialogComponent,
    ProductCycleEditFormComponent,
    ProductGroupEditFormComponent,
    ProductAssociateOptionDialogComponent,
    InstanceDetailsCreateSnapshotDialogComponent,
    InstanceDetailsAutoAddIpDialogComponent,
    InstanceDetailsAttachVolumeDialogComponent,
    InstanceDetailsAddPortDialogComponent,
    InstanceDetailsAddIpDialogComponent,
    InstanceRenameDialogComponent,
    InstanceChangePasswordDialogComponent,
    InstanceMoveDialogComponent,
    InstanceMigrateDialogComponent,
    InstanceDetailsAttachPortDialogComponent,
    InstanceDetailsAssociateIpDialogComponent,
    InstanceAssociateSecurityGroupDialogComponent,
    CreateOsBackupScheduleDialogComponent,
    CreateOsBackupDialogComponent,
  ],
  exports: [
    PricingPlanDeleteComponent,
    ApiUserDownloadOpenrcComponent,
    InvoiceDeleteDialogComponent,
    ServiceEnableBillingComponent,
    ChangeCreditDialogComponent,
    VolumeRenameComponent,
    VolumeExtendComponent,
    EditVolumeSnapshotDialogComponent,
    ResetVolumeSnapshotStateDialogComponent,
    EditVolumeBackupDialogComponent,
    RestoreVolumeBackupDialogComponent,
    ProductCycleEditFormComponent,
    ProductGroupEditFormComponent,
    ProductAssociateOptionDialogComponent,
    InstanceRenameDialogComponent,
    InstanceChangePasswordDialogComponent,
    InstanceMoveDialogComponent,
    InstanceMigrateDialogComponent,
    InstanceDetailsAttachPortDialogComponent,
    InstanceDetailsAssociateIpDialogComponent,
    InstanceAssociateSecurityGroupDialogComponent,
    CreateOsBackupScheduleDialogComponent,
    CreateOsBackupDialogComponent,
  ],
    imports: [
        CommonModule,
        ErrorHandlingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        UiModule,
        MatRadioModule,
        MatInputModule,
        FlexLayoutModule,
        MatCheckboxModule,
        MatIconModule,
        MatAutocompleteModule,
        FlexModule,
        MatTooltipModule,
    ]
})
export class CommonDialogsModule {
}
