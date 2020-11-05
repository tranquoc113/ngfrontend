import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IClientGroupModel } from '@fleio-api/client-user/model/client-group.model';
import { ConfigService } from '@shared/config/config.service';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { IAction } from '@objects-view/interfaces/actions/action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-client-group-details-overview',
  templateUrl: './client-group-details-overview.component.html',
  styleUrls: ['./client-group-details-overview.component.scss']
})
export class ClientGroupDetailsOverviewComponent extends DetailsComponentBase<IClientGroupModel> implements OnInit {
  clients: IClientModel[];
  clientActions: { [id: number]: IAction };
  displayedColumns = ['id', 'name', '(actions)'];
  currentPage = 1;
  nextPage = false;
  previousPage = false;
  loading = false;

  clientForm = this.formBuilder.group({
    client: [''],
  });
  filteredClients$: Observable<IClientModel[]>;


  constructor(
    public config: ConfigService,
    private clientsApiService: ClientsApiService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
  ) {
    super();
  }

  displayClient(client) {
    return client.name || client.id;
  }

  clearClientInput() {
    this.clientForm.get('client').setValue('');
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.object) {
      this.loadClients(this.currentPage);
    }

    this.filteredClients$ = this.clientForm.controls.client.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.clientsApiService.getAvailableClientsForGroup(
          this.object.id, value,
        ).pipe(map(clientsList => clientsList.objects));
      })
    );

  }

  changePage(action: string) {
    if (action === 'next') {
      this.currentPage = this.currentPage + 1;
      this.loadClients(this.currentPage);
    }
    if (action === 'previous') {
      this.currentPage = this.currentPage - 1;
      this.loadClients(this.currentPage);
    }
  };

  loadClients(page: number) {
    this.loading = true;
    this.clientsApiService.getClientsInGroup(this.object.id, page).subscribe(response => {
      this.clients = response.objects;
      this.clientActions = {}
      for (const client of this.clients) {
        this.clientActions[client.id] = this.getClientActions(client);
      }

      this.nextPage = !!response.next;
      this.previousPage = !!response.previous;
      this.loading = false;
    });
  }

  getClientActions(client: IClientModel): IAction[] {
    return [
      new CallbackAction({
        icon: {name: 'link_off'},
        tooltip: 'Remove client from group',
        name: 'Remove client from group',
        options: {displayMessages: false, displayConfirmation: true},
        confirmOptions: {
          confirm: true,
          title: 'Remove client from group',
          message: `Are you sure you want to remove client ${client.name} from group`,
        },
        refreshAfterExecute: true,
        callback: () => {
          return this.clientsApiService.removeFromGroup(client.id, this.object.id).pipe(map(() => {
            this.loadClients(this.currentPage);
            return null;
          }));
        }
      }),
    ];
  }

  addClientToGroup() {
    const client = this.clientForm.controls.client.value as IClientModel
    this.clientsApiService.addToGroup(client.id, this.object.id).subscribe(
      (response) => {
        this.loadClients(this.currentPage);
        this.clearClientInput();
        this.notificationService.showMessage(response.detail);
      },
      () => {
        this.notificationService.showMessage('Failed to add client to group')
      }
    )
  }
}
