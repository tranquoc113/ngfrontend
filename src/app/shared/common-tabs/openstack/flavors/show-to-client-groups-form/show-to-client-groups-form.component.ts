import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { FormBuilder } from '@angular/forms';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IClientGroupModel } from '@fleio-api/client-user/model/client-group.model';
import { ClientGroupsApiService } from '@fleio-api/client-user/client-group/client-groups-api.service';
import { FlavorsApiService } from '@fleio-api/openstack/flavor/flavors-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-show-to-client-groups-form',
  templateUrl: './show-to-client-groups-form.component.html',
  styleUrls: ['./show-to-client-groups-form.component.scss']
})
export class ShowToClientGroupsFormComponent extends DetailsFormBase<IFlavorModel> implements OnInit {
  showToClientGroupsForm = this.formBuilder.group({
    clientGroup: ['']
  });
  clientGroup = this.showToClientGroupsForm.controls.clientGroup;
  filteredClientGroups$: Observable<Array<IClientGroupModel>>;
  displayedColumns = ['id', 'name', 'actions'];

  constructor(
    private formBuilder: FormBuilder,
    private clientGroupsApiService: ClientGroupsApiService,
    private flavorsApiService: FlavorsApiService,
    private notificationService: NotificationService,
    public config: ConfigService,
  ) {
    super();
  }

  protected refreshData() {
    this.flavorsApiService.get(this.object.id).subscribe(result => {
      this.objectController.object = result;
    });
  }

  clientGroupDisplay(clientGroup?: IClientGroupModel): string {
    if (clientGroup) {
      return clientGroup.name;
    } else {
      return '';
    }
  }

  assignGroupToFlavor() {
    const value = this.showToClientGroupsForm.value;
    if (value.clientGroup && value.clientGroup.id) {
      let dialogResult$: Observable<string>;
      dialogResult$ = this.notificationService.confirmDialog({
          title: `Assign client group ${value.clientGroup.name} to flavor?`,
          message: 'Are you sure?',
        });
      dialogResult$.subscribe(dialogResult => {
        if (dialogResult === 'yes') {
          this.flavorsApiService.assignClientGroupToFlavor(
            this.object.id,
            value.clientGroup.id
          ).subscribe(response => {
            this.refreshData();
          }, error => {
            this.refreshData();
            this.notificationService.showMessage('Could not add client group to flavor.');
          });
        }
      });
    } else {
      this.notificationService.showMessage('Please select a valid client group.');
    }
  }

  removeGroup(groupId) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Remove client group from flavor?',
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.flavorsApiService.removeClientGroupFromFlavor(this.object.id, groupId).subscribe(response => {
          this.refreshData();
        }, error => {
          this.refreshData();
          this.notificationService.showMessage('Could not remove client group from flavor.');
        });
      }
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.filteredClientGroups$ = this.clientGroup.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.flavorsApiService.getAvailableClientGroupsToAssign(
          this.object.id,
          value
        ).pipe(map(clientGroupsList => clientGroupsList.objects));
      })
    );
  }

}
