import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IDomainModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain.model';
import { ConfigService } from '../../../../../shared/config/config.service';
import { Observable } from 'rxjs';
import { IDomainRegistrarModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain-registrar.model';
import { FormBuilder, Validators } from '@angular/forms';
import { DomainRegistrarsApiService } from '../../../../../shared/fleio-api/plugins/domains/domain-registrars-api.service';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { DomainApiService } from '../../../../../shared/fleio-api/plugins/domains/domain-api.service';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';
import { IDomainInfoModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain-info.model';
import { IDomainActionResultModel } from '../../../../../shared/fleio-api/plugins/domains/model/domain-action-result.model';

@Component({
  selector: 'app-domain-details-overview',
  templateUrl: './domain-details-overview.component.html',
  styleUrls: ['./domain-details-overview.component.scss']
})
export class DomainDetailsOverviewComponent extends DetailsComponentBase<IDomainModel> implements OnInit {
  registrarFrom = this.formBuilder.group({
    registrar: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    public config: ConfigService,
    private domainsApiService: DomainApiService,
    private domainRegistrarsApiService: DomainRegistrarsApiService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  filteredRegistrars$: Observable<IDomainRegistrarModel[]>;
  domainInfo: IDomainInfoModel;
  actionIsRunning: boolean;
  actionStatusMessage: string;
  actionSucceeded: boolean;

  clearRegistrar() {
    this.registrarFrom.controls.registrar.setValue('');
  }

  registrarDisplay(registrar?: IDomainRegistrarModel): string | undefined {
    return registrar ? registrar.display_name : undefined;
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.object) {
      this.registrarFrom.controls.registrar.setValue({
        id: this.object.last_registrar,
        display_name: this.object.last_registrar_name,
      })
    }

    this.filteredRegistrars$ = this.registrarFrom.controls.registrar.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      mergeMap(value => {
        return this.domainRegistrarsApiService.list({
          search: value,
        }).pipe(map(registrarList => registrarList.objects));
      })
    );

    this.refreshDomainInfo();

    this.registrarFrom.controls.registrar.valueChanges.subscribe(() => {
      this.refreshDomainInfo();
    })
  }

  refreshDomainInfo() {
    if (this.registrarFrom.controls.registrar.value && this.registrarFrom.controls.registrar.value.id) {
      this.domainsApiService.getInfo(
        this.object.id, this.registrarFrom.controls.registrar.value.id,
      ).subscribe(
        domainInfo => {
          this.domainInfo = domainInfo
        }
      )
    } else {
      this.domainInfo = undefined;
    }
  }

  editClient() {

  }

  editContact() {

  }

  saveRegistrar() {
    this.object.last_registrar = this.registrarFrom.controls.registrar.value;
    if (this.object.last_registrar) {
      this.object.last_registrar = (this.object.last_registrar as IDomainRegistrarModel).id;
    }
    this.domainsApiService.update(this.object.id, this.object).subscribe(
      () => {
        this.notificationService.showMessage('Registrar saved successfully')
        this.refreshDomainInfo();
      },
      () => {
        this.notificationService.showMessage('Failed to save registrar')
      }
    )
  }

  executeAction(name: string, displayName: string) {
    if (this.actionIsRunning) {
      return;
    }
    this.notificationService.confirmDialog({
      message: `Are you sure you want to execute ${displayName} action?`,
      title: `Execute ${displayName} action`,
    }).subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.actionIsRunning = true;
        this.actionStatusMessage = undefined;
        this.domainsApiService.executeAction(
          this.object.id, name, this.registrarFrom.controls.registrar.value.id,
        ).subscribe(
          actionResult => {
            this.actionStatusMessage = actionResult.action_status_message;
            this.actionSucceeded = actionResult.action_status;
            this.notificationService.showMessage(actionResult.details);
          },
          error => {
            const actionResult = error.error as IDomainActionResultModel
            this.actionStatusMessage = actionResult.action_status_message;
            this.actionSucceeded = actionResult.action_status;
            this.notificationService.showMessage(actionResult.details);
          }
        ).add(() => {
          this.actionIsRunning = false;
        })
      }
    })
  }
}
