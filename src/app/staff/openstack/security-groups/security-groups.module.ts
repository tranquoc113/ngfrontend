import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityGroupsRoutingModule } from './security-groups-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { SecurityGroupListComponent } from './security-group-list/security-group-list.component';
import { SecurityGroupCreateComponent } from './security-group-create/security-group-create.component';
import { SecurityGroupDetailsComponent } from './security-group-details/security-group-details.component';
import { SecurityGroupEditComponent } from './security-group-edit/security-group-edit.component';
import { SecurityGroupAddRuleComponent } from './security-group-add-rule/security-group-add-rule.component';


@NgModule({
  declarations: [
  SecurityGroupListComponent,
  SecurityGroupCreateComponent,
  SecurityGroupDetailsComponent,
  SecurityGroupEditComponent,
  SecurityGroupAddRuleComponent],
  imports: [
    CommonModule,
    SecurityGroupsRoutingModule,
    ObjectsViewModule,
  ]
})
export class SecurityGroupsModule {
}
