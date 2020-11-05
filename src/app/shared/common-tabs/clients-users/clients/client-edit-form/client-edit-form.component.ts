import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { IClientModel } from '../../../../fleio-api/client-user/model/client.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IActionResult } from '../../../../ui/objects-view/interfaces/actions/action-result';
import { ClientsApiService } from '../../../../fleio-api/client-user/client/clients-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../config/config.service';
import { IClientCreateOptions } from '../../../../fleio-api/client-user/model/client-create-options';
import { ICountry } from '../../../../fleio-api/misc/model/country';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { DetailsFormBase } from '../../../../ui/objects-view/details-form-base';
import { CustomFieldsComponent } from '../../../../fleio-data-controls/custom-fields/custom-fields.component';
import { PanelLayoutComponent } from '../../../../layout/panel-layout/panel-layout.component';
import { AuthService } from '../../../../auth/auth.service';
import { FleioId } from '../../../../fleio-api/base-model/base-fleio-object.model';
import { IConfigurationModel } from '../../../../fleio-api/configurations/model/configuration.model';
import { CallbackAction } from '../../../../ui/objects-view/actions/callback-action';

@Component({
  selector: 'app-client-edit-form',
  templateUrl: './client-edit-form.component.html',
  styleUrls: ['./client-edit-form.component.scss']
})
export class ClientEditFormComponent extends DetailsFormBase<IClientModel> implements OnInit {
  @ViewChild('customFields') customFields: CustomFieldsComponent;
  clientForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    country: ['', Validators.required],
    company: [''],
    vat_id: [''],
    tax_exempt: [''],
    address1: ['', Validators.required],
    address2: [''],
    state: ['', Validators.required],
    city: ['', Validators.required],
    zip_code: ['', Validators.required],
    phone: ['', Validators.required],
    currency: ['', Validators.required],
  });

  country = this.clientForm.controls.country;

  public createForm = true;
  public createOptions: IClientCreateOptions;
  public filteredCountries$: Observable<ICountry[]>;
  public filteredClients: Array<IClientModel>;
  public canEditResellerClient = false;
  public configurations: Array<IConfigurationModel>;

  constructor(
    private formBuilder: FormBuilder, private clientApi: ClientsApiService, private router: Router,
    private config: ConfigService, private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private clientApiService: ClientsApiService,
  ) {
    super();
  }

  countryDisplay(country?: ICountry): string | undefined {
    return country ? country.label : undefined;
  }

  resellerClientDisplay(resellerClient?: IClientModel): string {
    if (resellerClient) {
      return resellerClient.name || resellerClient.id as string;
    }
    return '';
  }

  findCountry(code: string): ICountry {
    return this.createOptions.countries.filter(country => country.value === code)[0];
  }

  preselectResellerClient(clientId: FleioId) {
    this.clientApiService.get(clientId).subscribe(response => {
      this.clientForm.controls.reseller_client.setValue(response);
    });
  }

  updateAvailableConfigurations() {
    if (this.createForm && this.authService.feature('ui.clients&users.create.choose-config')) {
      this.configurations = [];
      if (this.createOptions) {
        let resellerClientId = null;
        if (this.canEditResellerClient) {
          resellerClientId = this.clientForm.controls.reseller_client.value.id;
        }
        for (const configuration of this.createOptions.configurations) {
          if (!resellerClientId) {
            if (!configuration.reseller_client) {
              this.configurations.push(configuration);
              if (configuration.is_default) {
                this.clientForm.controls.configuration.setValue(configuration.id);
              }
            }
          } else {
            if (configuration.reseller_client === resellerClientId) {
              this.configurations.push(configuration);
              if (configuration.is_default) {
                this.clientForm.controls.configuration.setValue(configuration.id);
              }
            }
          }
        }
      }
    }
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = (action) => this.saveClient(action);
    }
    if (this.authService.feature('ui.clients&users.edit.reseller-client') &&
      this.authService.feature('billing.reseller')) {
      this.canEditResellerClient = true;
    }

    if (this.objectController) {
      this.createOptions = this.objectController.additionalObjects.createOptions;
    }

    if (this.object) {
      if (this.object.id) {
        this.createForm = false;
      }
      this.clientForm.patchValue(this.object);
      if (this.canEditResellerClient) {
        if (this.object.reseller_client) {
          this.preselectResellerClient(this.object.reseller_client);
        }
      }
    }

    if (this.canEditResellerClient) {
      this.clientForm.addControl('reseller_client', this.formBuilder.control(''));
      this.clientForm.get('reseller_client').valueChanges
        .pipe(
          debounceTime(300),
          switchMap(value => {
            return this.clientApiService.withResellerService(value).pipe()
          }),
        ).subscribe((clients: { objects: IClientModel[] }) => {
        this.filteredClients = clients.objects;
      });
    }

    if (this.createForm) {
      if (this.authService.feature('ui.clients&users.create.show-auto-order-service')) {
        this.clientForm.addControl('create_auto_order_service', this.formBuilder.control([false]));
        this.clientForm.controls.create_auto_order_service.setValue(false);
      }
      if (this.authService.feature('ui.clients&users.create.choose-config')) {
        this.clientForm.addControl('configuration', this.formBuilder.control(['']));
        this.updateAvailableConfigurations();
      }
    }

    if (this.object && !this.object.currency) {
      this.clientForm.controls.currency.setValue(this.createOptions.default_currency);
    }

    if (this.object && this.object.country) {
      this.country.setValue(this.findCountry(this.object.country));
    }
    this.filteredCountries$ = this.country.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.label),
      map(value => {
        const lowerCaseValue = value.toLocaleLowerCase();
        return this.createOptions.countries.filter(
          country => country.label.toLocaleLowerCase().includes(lowerCaseValue)
        );
      })
    );
  }

  getLiveFormVal() {
    // needed when having autocomplete fields that have to evaluate to a field of the selected object
    const value = this.clientForm.value;
    if (typeof value.country !== 'string') {
      value.country = (value.country as ICountry).value;
    }
    return value;
  }

  saveClient(action: CallbackAction): Observable<IActionResult> {
    const value = this.clientForm.value as IClientModel;

    const customFieldsValid = this.customFields.checkCustomFieldsForm();
    if (!customFieldsValid) {
      return of(null);
    }

    if (typeof value.country !== 'string') {
      value.country = (value.country as ICountry).value;
    }
    if (this.canEditResellerClient) {
      if (value.reseller_client) {
        // @ts-ignore
        value.reseller_client = value.reseller_client.id;
      } else {
        value.reseller_client = null;
      }
    }

    if (this.customFields.customFieldsToSubmit && this.customFields.customFieldsToSubmit.length) {
      value.custom_fields = this.customFields.customFieldsToSubmit;
    }
    if (!value.custom_fields) {
      value.custom_fields = [];
    }

    let request;

    if (this.object.id) {
      value.id = this.object.id;
      request = this.clientApi.update(value.id, value);
    } else {
      request = this.clientApi.create(value);
    }

    if (action.needsResult) {
      return request.pipe(
        map(() => {
          return {success: true, message: 'Client saved successfully'}
        }),
        catchError((error) => {
          this.setErrors(error.error);
          return of({success: false, message: 'Failed to save client'});
        })
      )
    } else {
      request.subscribe(() => {
        this.router.navigateByUrl(
          this.config.getPanelUrl('clients-users/clients')
        ).catch(() => {
        });
      }, (error) => {
        this.setErrors(error.error);
      });

      return of(null);
    }
  }

  clearCountry() {
    this.clientForm.controls.country.setValue('');
  }

  clearResellerClient() {
    this.clientForm.controls.reseller_client.setValue('');
  }
}
