import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../../shared/ui/objects-view/details-form-base';
import { IDomainRegistrarModel } from '../../../../../../shared/fleio-api/plugins/domains/model/domain-registrar.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../../../shared/config/config.service';
import { DomainRegistrarsApiService } from '../../../../../../shared/fleio-api/plugins/domains/domain-registrars-api.service';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { IActionResult } from '../../../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { ITLDModel } from '../../../../../../shared/fleio-api/plugins/domains/model/tld.model';
import { TLDsApiService } from '../../../../../../shared/fleio-api/plugins/domains/tlds-api.service';
import { NotificationService } from '../../../../../../shared/ui-api/notification.service';

@Component({
  selector: 'app-tld-registrars',
  templateUrl: './tld-registrars.component.html',
  styleUrls: ['./tld-registrars.component.scss']
})
export class TldRegistrarsComponent extends DetailsFormBase<ITLDModel> implements OnInit {
  registrarFrom = this.formBuilder.group({
    default_registrar: ['', Validators.required],
    requires_epp_for_transfer: ['', Validators.required],
  });
  filteredRegistrars$: Observable<IDomainRegistrarModel[]>;

  clearRegistrar() {
    this.registrarFrom.controls.default_registrar.setValue('');
  }

  registrarDisplay(registrar?: IDomainRegistrarModel): string | undefined {
    return registrar ? registrar.display_name : undefined;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private config: ConfigService,
    private domainRegistrarsApiService: DomainRegistrarsApiService,
    private tldApiService: TLDsApiService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.object) {
      this.registrarFrom.patchValue(this.object);
      if (this.object.default_registrar) {
        this.domainRegistrarsApiService.get(this.object.default_registrar).subscribe(registrar => {
            this.registrarFrom.controls.default_registrar.setValue(registrar);
          }
        )
      }
    }

    this.filteredRegistrars$ = this.registrarFrom.controls.default_registrar.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      mergeMap(value => {
        return this.domainRegistrarsApiService.list({
          search: value,
        }).pipe(map(registrarList => registrarList.objects));
      })
    );
  }

  saveRegistrars(): Observable<IActionResult> {
    const value = this.registrarFrom.value as ITLDModel;
    if (value.default_registrar instanceof Object) {
      if (value.default_registrar.id) {
        value.default_registrar = value.default_registrar.id;
      } else {
        value.default_registrar = null;
      }
    }

    this.object.default_registrar = value.default_registrar
    this.object.requires_epp_for_transfer = value.requires_epp_for_transfer;

    this.createOrUpdate(
      this.tldApiService,
      this.object,
    ).subscribe(
      () => {
        this.notificationService.showMessage('Default registrar saved successfully');
      },
      () => {
        this.notificationService.showMessage('Failed to save default registrar');
      }
    );

    return of(null);
  }
}
