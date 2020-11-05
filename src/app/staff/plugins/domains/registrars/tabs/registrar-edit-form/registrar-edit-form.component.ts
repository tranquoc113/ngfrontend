import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../../shared/ui/objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IDomainRegistrarModel } from '../../../../../../shared/fleio-api/plugins/domains/model/domain-registrar.model';
import { DomainRegistrarsApiService } from '../../../../../../shared/fleio-api/plugins/domains/domain-registrars-api.service';
import { IRegistrarConnectorModel } from '../../../../../../shared/fleio-api/plugins/domains/model/registrar-connector.model';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { RegistrarConnectorApiService } from '../../../../../../shared/fleio-api/plugins/domains/registrar-connector-api.service';
import { IActionResult } from '../../../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../../../shared/config/config.service';

@Component({
  selector: 'app-registrar-edit-form',
  templateUrl: './registrar-edit-form.component.html',
  styleUrls: ['./registrar-edit-form.component.scss']
})
export class RegistrarEditFormComponent extends DetailsFormBase<IDomainRegistrarModel> implements OnInit {
  registrarFrom = this.formBuilder.group({
    name: ['', Validators.required],
    connector: ['', Validators.required],
  });
  filteredConnectors$: Observable<IRegistrarConnectorModel[]>;

  clearConnector() {
    this.registrarFrom.controls.connector.setValue('');
  }

  connectorDisplay(connector?: IRegistrarConnectorModel): string | undefined {
    return connector ? connector.name : undefined;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private config: ConfigService,
    private domainRegistrarsApiService: DomainRegistrarsApiService,
    private registrarConnectorApiService: RegistrarConnectorApiService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.objectController) {
      this.objectController.actionCallback = () => this.registrarActions();
    }

    if (this.object) {
      this.registrarFrom.patchValue(this.object);
      this.registrarFrom.controls.connector.setValue({
        id: this.object.connector,
        name: this.object.registrar_connector_display,
      });
    }

    this.filteredConnectors$ = this.registrarFrom.controls.connector.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      mergeMap(value => {
        return this.registrarConnectorApiService.list({
          search: value,
        }).pipe(map(connectorsList => connectorsList.objects));
      })
    );
  }

  registrarActions(): Observable<IActionResult> {
    const value = this.registrarFrom.value as IDomainRegistrarModel;
    if (value.connector instanceof Object) {
      if (value.connector.id) {
        value.connector = value.connector.id;
      } else {
        value.connector = null;
      }
    }
    this.createOrUpdate(
      this.domainRegistrarsApiService,
      value,
    ).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('plugins/domains/registrars')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
