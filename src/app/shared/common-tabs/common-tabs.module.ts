import { ConfigurationDetailsBillingFormComponent } from './settings/configurations/configuration-details-billing-form/configuration-details-billing-form.component';
import { NgModule } from '@angular/core';
import { ErrorHandlingModule } from '../error-handling/error-handling.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ConfigurationEditFormComponent } from './settings/configurations/configuration-edit-form/configuration-edit-form.component';
import { UserProfileDetailsPanelComponent } from './profile/user-profile/user-profile-details-panel/user-profile-details-panel.component';
import { UiModule } from '../ui/ui.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserProfileEditFormComponent } from './profile/user-profile/user-profile-edit-form/user-profile-edit-form.component';
import { MatIconModule } from '@angular/material/icon';
import { NotificationDetailsMessageComponent } from './notifications/notification-details-message/notification-details-message.component';
import { NotificationsSettingsComponent } from './notifications/notifications-settings/notifications-settings.component';
import { PluginsModule } from '../plugins/plugins.module';
import { PricingPlanEditFormComponent } from './settings/openstack/openstack-plans/pricing-plan-edit-form/pricing-plan-edit-form.component';
import {
  PricingPlanDetailsOverviewComponent
} from './settings/openstack/openstack-plans/pricing-plan-details-overview/pricing-plan-details-overview.component';
import { MatTableModule } from '@angular/material/table';
import { PricingRuleEditFormComponent } from './settings/openstack/pricing-rules/pricing-rule-edit-form/pricing-rule-edit-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClientDetailsTicketsComponent } from './clients-users/clients/client-details-tickets/client-details-tickets.component';
import { ClientDetailsCloudResourcesComponent } from './clients-users/clients/client-details-cloud-resources/client-details-cloud-resources.component';
import {
  ClientSendMassEmailFormComponent
} from './clients-users/clients/client-send-mass-email-form/client-send-mass-email-form.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { UserEditFormComponent } from './clients-users/users/user-edit-form/user-edit-form.component';
import { UserDetailsOverviewComponent } from './clients-users/users/user-details-overview/user-details-overview.component';
import { UserDetailsClientsComponent } from './clients-users/users/user-details-clients/user-details-clients.component';
import { UserDetailsGroupsComponent } from './clients-users/users/user-details-groups/user-details-groups.component';
import { AddUserToGroupDialogComponent } from './clients-users/users/user-details-groups/add-user-to-group-dialog/add-user-to-group-dialog.component';
import { UserDetailsTicketsComponent } from './clients-users/users/user-details-tickets/user-details-tickets.component';
import { ServiceDetailsOverviewComponent } from '@billing-service-tabs/service-details-overview/service-details-overview.component';
import { ServiceEditFormComponent } from '@billing-service-tabs/service-edit-form/service-edit-form.component';
import { JournalDetailsOverviewComponent } from './billing/journal/journal-details-overview/journal-details-overview.component';
import { GoogleAuthenticatorConfirmComponent } from './second-factor-authentication/google-authenticator/google-authenticator-confirm/google-authenticator-confirm.component';
import { MatCardModule } from '@angular/material/card';
import { InvoiceEditFormComponent } from './billing/invoices/invoice-edit-form/invoice-edit-form.component';
import { InvoiceDetailsOverviewComponent } from './billing/invoices/invoice-details-overview/invoice-details-overview.component';
import { InvoiceDetailsAddPaymentComponent } from './billing/invoices/invoice-details-add-payment/invoice-details-add-payment.component';
import { ClientDetailsDomainsComponent } from './clients-users/clients/client-details-domains/client-details-domains.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConfirmOptionsComponent } from './second-factor-authentication/confirm-options/confirm-options.component';
import { SfaOptionsOverviewComponent } from './second-factor-authentication/sfa-options-overview/sfa-options-overview.component';
import { GoogleAuthenticatorDetailsComponent } from './second-factor-authentication/google-authenticator/google-authenticator-details/google-authenticator-details.component';
import { InvoiceDetailsRefundComponent } from './billing/invoices/invoice-details-refund/invoice-details-refund.component';
import { ClientEditFormComponent } from './clients-users/clients/client-edit-form/client-edit-form.component';
import { ClientDetailsUsersComponent } from './clients-users/clients/client-details-users/client-details-users.component';
import { ClientDetailsServicesComponent } from './clients-users/clients/client-details-services/client-details-services.component';
import { ClientDetailsOverviewComponent } from './clients-users/clients/client-details-overview/client-details-overview.component';
import { ClientDetailsOpenstackServiceComponent } from './clients-users/clients/client-details-openstack-service/client-details-openstack-service.component';
import { ClientDetailsJournalComponent } from './clients-users/clients/client-details-journal/client-details-journal.component';
import { ClientDetailsInvoicesComponent } from './clients-users/clients/client-details-invoices/client-details-invoices.component';
import { ClientDetailsConfigurationsComponent } from './clients-users/clients/client-details-configurations/client-details-configurations.component';
import { FleioDataControlsModule } from '../fleio-data-controls/fleio-data-controls.module';
import { CreateOpenstackServiceDialogComponent } from './clients-users/clients/client-details-openstack-service/dialogs/create-openstack-service-dialog/create-openstack-service-dialog.component';
import { ChangePricingPlanDialogComponent } from './clients-users/clients/client-details-openstack-service/dialogs/change-pricing-plan-dialog/change-pricing-plan-dialog.component';
import { AssociateUserDialogComponent } from './clients-users/clients/client-details-users/dialogs/associate-user-dialog/associate-user-dialog.component';
import { ChangeConfigurationDialogComponent } from './clients-users/clients/client-details-configurations/dialogs/change-configuration-dialog/change-configuration-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardBaseComponent } from './dashboard/dashboard-base/dashboard-base.component';
import { MatMenuModule } from '@angular/material/menu';
import { GridsterModule } from 'angular-gridster2';
import { SfaConfirmPasswordFormComponent } from './second-factor-authentication/sfa-confirm-password-form/sfa-confirm-password-form.component';
import { SmsAuthenticatorDetailsComponent } from './second-factor-authentication/sms-authenticator/sms-authenticator-details/sms-authenticator-details.component';
import { SmsAuthenticatorConfirmComponent } from './second-factor-authentication/sms-authenticator/sms-authenticator-confirm/sms-authenticator-confirm.component';
import { ApiUserEditFormComponent } from '@shared/common-tabs/openstack/api-users/api-user-edit-form/api-user-edit-form.component';
import { ApiUserDetailsOverviewComponent } from '@shared/common-tabs/openstack/api-users/api-user-details-overview/api-user-details-overview.component';
import { ApiUserCreateFormComponent } from '@shared/common-tabs/openstack/api-users/api-user-create-form/api-user-edit-form.component';
import { OrderDetailsOverviewComponent } from '@shared/common-tabs/billing/orders/order-details-overview/order-details-overview.component';
import { SshKeyDetailsOverviewComponent } from '@shared/common-tabs/openstack/ssh-keys/ssh-key-details-overview/ssh-key-details-overview.component';
import { SshKeyEditFormComponent } from '@shared/common-tabs/openstack/ssh-keys/ssh-key-edit-form/ssh-key-edit-form.component';
import { VolumeDetailsOverviewComponent } from '@shared/common-tabs/openstack/volumes/volume-details-overview/volume-details-overview.component';
import { VolumeEditFormComponent } from '@shared/common-tabs/openstack/volumes/volume-edit-form/volume-edit-form.component';
import { ClusterDetailsInfoComponent } from './openstack/clusters/cluster-details-info/cluster-details-info.component';
import { ClusterDetailsNodesComponent } from './openstack/clusters/cluster-details-nodes/cluster-details-nodes.component';
import { ClusterDetailsMiscellaneousComponent } from './openstack/clusters/cluster-details-miscellaneous/cluster-details-miscellaneous.component';
import { ClusterDetailsLabelsComponent } from './openstack/clusters/cluster-details-labels/cluster-details-labels.component';
import { ClusterResizeFormComponent } from './openstack/clusters/cluster-resize-form/cluster-resize-form.component';
import { ClusterCreateFormComponent } from './openstack/clusters/cluster-create-form/cluster-create-form.component';
import {
  ImageDetailsOverviewComponent
} from '@shared/common-tabs/openstack/images/image-details-overview/image-details-overview.component';
import { ImageEditFormComponent } from '@shared/common-tabs/openstack/images/image-edit-form/image-edit-form.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClusterTemplateDetailsInfoComponent } from './openstack/cluster-templates/cluster-template-details-info/cluster-template-details-info.component';
import { ClusterTemplateDetailsNodeSpecComponent } from './openstack/cluster-templates/cluster-template-details-node-spec/cluster-template-details-node-spec.component';
import { ClusterTemplateDetailsNetworkComponent } from './openstack/cluster-templates/cluster-template-details-network/cluster-template-details-network.component';
import { ClusterTemplateDetailsLabelsComponent } from './openstack/cluster-templates/cluster-template-details-labels/cluster-template-details-labels.component';
import { ClusterTemplateCreateFormComponent } from './openstack/cluster-templates/cluster-template-create-form/cluster-template-create-form.component';
import { FlavorDetailsOverviewComponent } from '@shared/common-tabs/openstack/flavors/flavor-details-overview/flavor-details-overview.component';
import { FlavorEditFormComponent } from '@shared/common-tabs/openstack/flavors/flavor-edit-form/flavor-edit-form.component';
import { FlavorPropertiesEditFormComponent } from './openstack/flavors/flavor-properties-edit-form/flavor-properties-edit-form.component';
import { ShowToClientGroupsFormComponent } from './openstack/flavors/show-to-client-groups-form/show-to-client-groups-form.component';
import { SecurityGroupEditFormComponent } from './openstack/security-groups/security-group-create-form/security-group-edit-form.component';
import { SecurityGroupsDetailsOverviewComponent } from './openstack/security-groups/security-groups-details-overview/security-groups-details-overview.component';
import { SecurityGroupAddRuleFormComponent } from './openstack/security-groups/security-group-add-rule-form/security-group-add-rule-form.component';
import { ProductDetailsOverviewComponent } from './billing/products/product-details-overview/product-details-overview.component';
import { ProductEditFormComponent } from './billing/products/product-edit-form/product-edit-form.component';
import { ProductDetailsConfOptsComponent } from './billing/products/product-details-conf-opts/product-details-conf-opts.component';
import { ProductDetailsUpgradesComponent } from './billing/products/product-details-upgrades/product-details-upgrades.component';
import { MatListModule } from '@angular/material/list';
import { InstanceResizeFormComponent } from '@shared/common-tabs/openstack/instances/instance-resize-form/instance-resize-form.component';
import { InstanceRescueFormComponent } from '@shared/common-tabs/openstack/instances/instance-rescue-form/instance-rescue-form.component';
import {
  InstanceRebuildFormComponent
} from '@shared/common-tabs/openstack/instances/instance-rebuild-form/instance-rebuild-form.component';
import { InstanceDetailsVolumesComponent } from '@shared/common-tabs/openstack/instances/instance-details-volumes/instance-details-volumes.component';
import { InstanceDetailsSystemLogComponent } from '@shared/common-tabs/openstack/instances/instance-details-system-log/instance-details-system-log.component';
import { InstanceDetailsSnapshotsComponent } from '@shared/common-tabs/openstack/instances/instance-details-snapshots/instance-details-snapshots.component';
import { InstanceDetailsSecurityGroupsComponent } from '@shared/common-tabs/openstack/instances/instance-details-security-groups/instance-details-security-groups.component';
import { InstanceDetailsNetworkingComponent } from '@shared/common-tabs/openstack/instances/instance-details-networking/instance-details-networking.component';
import { InstanceDetailsMetricsComponent } from '@shared/common-tabs/openstack/instances/instance-details-metrics/instance-details-metrics.component';
import {
  InstanceDetailsInfoComponent
} from '@shared/common-tabs/openstack/instances/instance-details-info/instance-details-info.component';
import { InstanceDetailsHistoryLogComponent } from '@shared/common-tabs/openstack/instances/instance-details-history-log/instance-details-history-log.component';
import { InstanceCreateFormComponent } from '@shared/common-tabs/openstack/instances/instance-create-form/instance-create-form.component';
import { BootSourceSelectComponent } from '@shared/common-tabs/openstack/instances/instance-create-form/boot-source-select/boot-source-select.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { InstanceDetailsBackupsComponent } from './openstack/instances/instance-details-backups/instance-details-backups.component';
import { ClusterUpgradeFormComponent } from './openstack/clusters/cluster-upgrade-form/cluster-upgrade-form.component';

@NgModule({
  declarations: [
    ConfigurationDetailsBillingFormComponent,
    ConfigurationEditFormComponent,
    UserProfileDetailsPanelComponent,
    UserProfileEditFormComponent,
    NotificationDetailsMessageComponent,
    NotificationsSettingsComponent,
    PricingPlanDetailsOverviewComponent,
    PricingPlanEditFormComponent,
    PricingRuleEditFormComponent,
    ClientDetailsTicketsComponent,
    ClientDetailsCloudResourcesComponent,
    ClientSendMassEmailFormComponent,
    JournalDetailsOverviewComponent,
    InvoiceEditFormComponent,
    InvoiceDetailsOverviewComponent,
    InvoiceDetailsAddPaymentComponent,
    InvoiceDetailsRefundComponent,
    ClientDetailsDomainsComponent,
    ServiceDetailsOverviewComponent,
    ServiceEditFormComponent,
    UserEditFormComponent,
    UserDetailsOverviewComponent,
    UserDetailsClientsComponent,
    UserDetailsGroupsComponent,
    AddUserToGroupDialogComponent,
    UserDetailsTicketsComponent,
    ClientEditFormComponent,
    ClientDetailsUsersComponent,
    ClientDetailsServicesComponent,
    ClientDetailsOverviewComponent,
    ClientDetailsOpenstackServiceComponent,
    ClientDetailsJournalComponent,
    ClientDetailsInvoicesComponent,
    ClientDetailsConfigurationsComponent,
    CreateOpenstackServiceDialogComponent,
    ChangePricingPlanDialogComponent,
    AssociateUserDialogComponent,
    ChangeConfigurationDialogComponent,
    GoogleAuthenticatorConfirmComponent,
    ConfirmOptionsComponent,
    SfaOptionsOverviewComponent,
    GoogleAuthenticatorDetailsComponent,
    SfaConfirmPasswordFormComponent,
    SmsAuthenticatorDetailsComponent,
    SmsAuthenticatorConfirmComponent,
    DashboardBaseComponent,
    ApiUserEditFormComponent,
    ApiUserDetailsOverviewComponent,
    ApiUserCreateFormComponent,
    OrderDetailsOverviewComponent,
    SshKeyDetailsOverviewComponent,
    SshKeyEditFormComponent,
    VolumeDetailsOverviewComponent,
    VolumeEditFormComponent,
    ClusterDetailsInfoComponent,
    ClusterDetailsNodesComponent,
    ClusterDetailsMiscellaneousComponent,
    ClusterDetailsLabelsComponent,
    ClusterResizeFormComponent,
    ClusterCreateFormComponent,
    ImageDetailsOverviewComponent,
    ImageEditFormComponent,
    ClusterTemplateDetailsInfoComponent,
    ClusterTemplateDetailsNodeSpecComponent,
    ClusterTemplateDetailsNetworkComponent,
    ClusterTemplateDetailsLabelsComponent,
    ClusterTemplateCreateFormComponent,
    FlavorDetailsOverviewComponent,
    FlavorEditFormComponent,
    FlavorPropertiesEditFormComponent,
    ShowToClientGroupsFormComponent,
    SecurityGroupEditFormComponent,
    SecurityGroupsDetailsOverviewComponent,
    SecurityGroupAddRuleFormComponent,
    ProductDetailsOverviewComponent,
    ProductEditFormComponent,
    ProductDetailsConfOptsComponent,
    ProductDetailsUpgradesComponent,
    InstanceResizeFormComponent,
    InstanceRescueFormComponent,
    InstanceRebuildFormComponent,
    InstanceDetailsVolumesComponent,
    InstanceDetailsSystemLogComponent,
    InstanceDetailsSnapshotsComponent,
    InstanceDetailsSecurityGroupsComponent,
    InstanceDetailsNetworkingComponent,
    InstanceDetailsMetricsComponent,
    InstanceDetailsInfoComponent,
    InstanceDetailsHistoryLogComponent,
    InstanceCreateFormComponent,
    BootSourceSelectComponent,
    InstanceDetailsBackupsComponent,
    ClusterUpgradeFormComponent,
  ],
  exports: [
    ConfigurationDetailsBillingFormComponent,
    ConfigurationEditFormComponent,
    UserProfileDetailsPanelComponent,
    UserProfileEditFormComponent,
    NotificationDetailsMessageComponent,
    NotificationsSettingsComponent,
    PricingPlanDetailsOverviewComponent,
    PricingPlanEditFormComponent,
    PricingRuleEditFormComponent,
    ClientDetailsTicketsComponent,
    ClientDetailsCloudResourcesComponent,
    ClientSendMassEmailFormComponent,
    ServiceDetailsOverviewComponent,
    ServiceEditFormComponent,
    JournalDetailsOverviewComponent,
    ClientEditFormComponent,
    ClientDetailsUsersComponent,
    ClientDetailsServicesComponent,
    ClientDetailsOverviewComponent,
    ClientDetailsOpenstackServiceComponent,
    ClientDetailsJournalComponent,
    ClientDetailsInvoicesComponent,
    ClientDetailsConfigurationsComponent,
    GoogleAuthenticatorConfirmComponent,
    InvoiceEditFormComponent,
    InvoiceDetailsOverviewComponent,
    InvoiceDetailsAddPaymentComponent,
    InvoiceDetailsRefundComponent,
    UserEditFormComponent,
    UserDetailsOverviewComponent,
    UserDetailsClientsComponent,
    UserDetailsGroupsComponent,
    ConfirmOptionsComponent,
    SfaOptionsOverviewComponent,
    SfaConfirmPasswordFormComponent,
    SmsAuthenticatorDetailsComponent,
    DashboardBaseComponent,
    ApiUserEditFormComponent,
    ApiUserDetailsOverviewComponent,
    ApiUserCreateFormComponent,
    OrderDetailsOverviewComponent,
    SshKeyDetailsOverviewComponent,
    SshKeyEditFormComponent,
    VolumeDetailsOverviewComponent,
    VolumeEditFormComponent,
    ClusterDetailsInfoComponent,
    ClusterDetailsNodesComponent,
    ClusterDetailsMiscellaneousComponent,
    ClusterDetailsLabelsComponent,
    ClusterResizeFormComponent,
    ClusterCreateFormComponent,
    ImageDetailsOverviewComponent,
    ImageEditFormComponent,
    ClusterTemplateDetailsInfoComponent,
    ClusterTemplateDetailsNodeSpecComponent,
    ClusterTemplateDetailsNetworkComponent,
    ClusterTemplateDetailsLabelsComponent,
    ClusterTemplateCreateFormComponent,
    FlavorDetailsOverviewComponent,
    FlavorEditFormComponent,
    SecurityGroupEditFormComponent,
    SecurityGroupsDetailsOverviewComponent,
    SecurityGroupAddRuleFormComponent,
    ProductDetailsOverviewComponent,
    ProductEditFormComponent,
    ProductDetailsConfOptsComponent,
    ProductDetailsUpgradesComponent,
    InstanceResizeFormComponent,
    InstanceRescueFormComponent,
    InstanceRebuildFormComponent,
    InstanceDetailsVolumesComponent,
    InstanceDetailsSystemLogComponent,
    InstanceDetailsSnapshotsComponent,
    InstanceDetailsSecurityGroupsComponent,
    InstanceDetailsNetworkingComponent,
    InstanceDetailsMetricsComponent,
    InstanceDetailsInfoComponent,
    InstanceDetailsHistoryLogComponent,
    InstanceCreateFormComponent,
    BootSourceSelectComponent,
    InstanceDetailsBackupsComponent,
    ClusterUpgradeFormComponent,
  ],
  imports: [
    CommonModule,
    ErrorHandlingModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    ObjectsViewModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatRadioModule,
    MatExpansionModule,
    UiModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    PluginsModule,
    MatTableModule,
    MatDatepickerModule,
    FormsModule,
    EditorModule,
    FleioDataControlsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    GridsterModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
  ]
})
export class CommonTabsModule {
}
