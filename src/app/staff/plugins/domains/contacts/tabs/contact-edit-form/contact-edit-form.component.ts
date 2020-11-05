import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsFormBase } from '../../../../../../shared/ui/objects-view/details-form-base';
import { IDomainContactModel } from '../../../../../../shared/fleio-api/plugins/domains/model/domain-contact.model';
import { FormBuilder, Validators } from '@angular/forms';
import { IDomainContactCreateOptionsModel } from '../../../../../../shared/fleio-api/plugins/domains/model/domain-contact-create-options.model';
import { ICountry } from '../../../../../../shared/fleio-api/misc/model/country';
import { Observable, of } from 'rxjs';
import { DomainContactsApiService } from '../../../../../../shared/fleio-api/plugins/domains/domain-contacts-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../../shared/config/config.service';
import { catchError, map, mergeMap, startWith } from 'rxjs/operators';
import { IActionResult } from '../../../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { IClientModel } from '../../../../../../shared/fleio-api/client-user/model/client.model';
import { ClientsApiService } from '../../../../../../shared/fleio-api/client-user/client/clients-api.service';
import { CustomFieldsComponent } from '../../../../../../shared/fleio-data-controls/custom-fields/custom-fields.component';
import { CallbackAction } from '../../../../../../shared/ui/objects-view/actions/callback-action';

@Component({
  selector: 'app-contact-edit-form',
  templateUrl: './contact-edit-form.component.html',
  styleUrls: ['./contact-edit-form.component.scss']
})
export class ContactEditFormComponent extends DetailsFormBase<IDomainContactModel> implements OnInit {
  @ViewChild('customFields') customFields: CustomFieldsComponent;
  contactForm = this.formBuilder.group({
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
    client: ['', Validators.required]
  });

  country = this.contactForm.controls.country;

  public createOptions: IDomainContactCreateOptionsModel;
  public filteredCountries$: Observable<ICountry[]>;
  filteredClients$: Observable<IClientModel[]>;


  constructor(
    private formBuilder: FormBuilder, private domainContactsApiService: DomainContactsApiService,
    private router: Router, private config: ConfigService, private activatedRoute: ActivatedRoute,
    private clientsApi: ClientsApiService,
  ) {
    super();
  }

  countryDisplay(country?: ICountry): string | undefined {
    return country ? country.label : undefined;
  }

  findCountry(code: string): ICountry {
    return this.createOptions.countries.filter(country => country.value === code)[0];
  }

  clearCountry() {
    this.contactForm.controls.country.setValue('');
  }

  clientDisplay(client?: IClientModel): string | undefined {
    if (client && (typeof (client) === 'object')) {
      return client.name ? client.name : `${client.first_name} ${client.last_name}`;
    } else {
      return undefined;
    }
  }

  clearClient() {
    this.contactForm.controls.client.setValue('');
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.objectController) {
      this.objectController.actionCallback = (action) => this.saveContact(action);
    }

    if (this.objectController) {
      this.createOptions = this.objectController.additionalObjects.createOptions;
    }

    if (this.object) {
      this.contactForm.patchValue(this.object);
      if (this.object.client) {
        this.clientsApi.get(this.object.client).subscribe(client => {
          this.contactForm.controls.client.setValue(client);
        });
      }
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

    this.filteredClients$ = this.contactForm.controls.client.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.clientsApi.list({
          search: value,
        }).pipe(map(clientsList => clientsList.objects));
      })
    );
  }

  saveContact(action: CallbackAction): Observable<IActionResult> {
    const value = this.contactForm.value as IDomainContactModel;

    const customFieldsValid = this.customFields.checkCustomFieldsForm();
    if (!customFieldsValid) {
      return of({success: false, message: 'Invalid custom fields'});
    }

    if (typeof value.country !== 'string') {
      value.country = (value.country as ICountry).value;
    }

    if (typeof (value.client) === 'object') {
      value.client = (value.client as IClientModel).id;
    }

    if (this.customFields.customFieldsToSubmit && this.customFields.customFieldsToSubmit.length) {
      value.custom_fields = this.customFields.customFieldsToSubmit;
    } else {
      value.custom_fields = [];
    }

    let request;

    if (this.object.id) {
      value.id = this.object.id;
      request = this.domainContactsApiService.update(value.id, value);
    } else {
      request = this.domainContactsApiService.create(value);
    }

    if (action.needsResult) {
      return request.pipe(
        map(() => {
          return {success: true, message: 'Contact saved successfully'}
        }),
        catchError((error) => {
          this.setErrors(error.error);
          return of({success: false, message: 'Failed to save contact'});
        })
      )
    } else {
      request.subscribe(() => {
        this.router.navigateByUrl(
          this.config.getPrevUrl('plugins/domains/contacts')
        ).catch(() => {
        });
      }, (error) => {
        this.setErrors(error.error);
      });
      return of(null);
    }
  }

  getLiveFormVal() {
    const value = this.contactForm.value;
    if (typeof value.country !== 'string') {
      value.country = (value.country as ICountry).value;
    }
    return value;
  }
}
