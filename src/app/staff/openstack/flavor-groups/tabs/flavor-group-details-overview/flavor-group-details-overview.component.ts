import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IAction } from '@objects-view/interfaces/actions/action';
import { Observable } from 'rxjs';
import { ConfigService } from '@shared/config/config.service';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from '@shared/ui-api/notification.service';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IFlavorGroupModel } from '@fleio-api/openstack/model/flavor-group.model';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { FlavorsApiService } from '@fleio-api/openstack/flavor/flavors-api.service';
import { RefreshService } from '@shared/ui-api/refresh.service';

@Component({
  selector: 'app-flavor-group-details-overview',
  templateUrl: './flavor-group-details-overview.component.html',
  styleUrls: ['./flavor-group-details-overview.component.scss']
})
export class FlavorGroupDetailsOverviewComponent extends DetailsComponentBase<IFlavorGroupModel> implements OnInit {
  flavors: IFlavorModel[];
  flavorActions: { [id: number]: IAction };
  displayedColumns = ['id', 'name', 'region', '(actions)'];
  currentPage = 1;
  nextPage = false;
  previousPage = false;
  loading = false;

  flavorForm = this.formBuilder.group({
    flavor: [''],
  });
  filteredFlavors$: Observable<IFlavorModel[]>;


  constructor(
    public config: ConfigService,
    private flavorsApiService: FlavorsApiService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private refreshService: RefreshService,
  ) {
    super();
  }

  displayFlavor(flavor) {
    return flavor.name || flavor.id;
  }

  clearFlavorInput() {
    this.flavorForm.get('flavor').setValue('');
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.object) {
      this.loadFlavors(this.currentPage);
    }

    this.filteredFlavors$ = this.flavorForm.controls.flavor.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.flavorsApiService.getAvailableFlavorsForGroup(
          this.object.id, value,
        ).pipe(map(flavorList => flavorList.objects));
      })
    );

  }

  changePage(action: string) {
    if (action === 'next') {
      this.currentPage = this.currentPage + 1;
      this.loadFlavors(this.currentPage);
    }
    if (action === 'previous') {
      this.currentPage = this.currentPage - 1;
      this.loadFlavors(this.currentPage);
    }
  };

  loadFlavors(page: number) {
    this.loading = true;
    this.flavorsApiService.getFlavorsInGroup(this.object.id, page).subscribe(response => {
      this.flavors = response.objects;
      this.flavorActions = {}
      for (const flavor of this.flavors) {
        this.flavorActions[flavor.id] = this.getFlavorActions(flavor);
      }

      this.nextPage = !!response.next;
      this.previousPage = !!response.previous;
      this.loading = false;
    });
  }

  getFlavorActions(flavor: IFlavorModel): IAction[] {
    return [
      new CallbackAction({
        icon: {name: 'link_off'},
        tooltip: 'Remove flavor from group',
        name: 'Remove flavor from group',
        options: {displayMessages: false, displayConfirmation: true},
        confirmOptions: {
          confirm: true,
          title: 'Remove flavor from group',
          message: `Are you sure you want to remove flavor ${flavor.name} from group`,
        },
        refreshAfterExecute: true,
        callback: () => {
          return this.flavorsApiService.removeFromGroup(this.object.id, flavor.id).pipe(map(() => {
            this.refreshService.refresh();
            this.loadFlavors(this.currentPage);
            return null;
          }));
        }
      }),
    ];
  }

  addFlavorToGroup() {
    const flavor = this.flavorForm.controls.flavor.value as IFlavorModel;
    this.flavorsApiService.addToGroup(this.object.id, flavor.id).subscribe(
      (response) => {
        this.loadFlavors(this.currentPage);
        this.clearFlavorInput();
        this.notificationService.showMessage(response.detail);
      },
      () => {
        this.notificationService.showMessage('Failed to add flavor to group')
      }
    ).add(() => {
      this.refreshService.refresh();
    });
  }
}
