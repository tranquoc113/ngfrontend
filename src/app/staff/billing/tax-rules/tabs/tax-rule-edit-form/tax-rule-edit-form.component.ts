import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { ITaxRuleModel } from '@fleio-api/billing/model/tax-rule.model';
import { ITaxRuleCreateOptionsModel } from '@fleio-api/billing/model/tax-rule-create-options.model';
import { TaxRulesApiService } from '@fleio-api/billing/tax-rules/tax-rules-api.service';
import { map, startWith } from 'rxjs/operators';
import * as _moment from 'moment';

@Component({
  selector: 'app-tax-rule-edit-form',
  templateUrl: './tax-rule-edit-form.component.html',
  styleUrls: ['./tax-rule-edit-form.component.scss']
})
export class TaxRuleEditFormComponent extends DetailsFormBase<ITaxRuleModel> implements OnInit {
  taxRuleForm = this.formBuilder.group({
    country: ['', Validators.required],
    level: ['', Validators.required],
    name: ['', Validators.required],
    state: [''],
    rate: ['', [Validators.required, Validators.min(0.01), Validators.max(100)]],
    start_date: [null, Validators.required],
    end_date: [null],
  });

  createOptions: ITaxRuleCreateOptionsModel;
  filteredCountries: Observable<string[]>;
  private static _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private taxRulesApiService: TaxRulesApiService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  clearCountry() {
    this.taxRuleForm.controls.country.setValue('');
  }

  private _filter(value: string): string[] {
    const filterValue = TaxRuleEditFormComponent._normalizeValue(value);
    return this.createOptions.countries.filter(
      country => TaxRuleEditFormComponent._normalizeValue(country).includes(filterValue)
    );
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveTaxRule();
      this.createOptions = this.objectController.additionalObjects.createOptions;
    }
    if (this.object && !this.object.id) {
      this.taxRuleForm.controls.level.setValue(this.createOptions.levels[0][0]);
    }
    if (this.object && this.object.id) {
      this.taxRuleForm.patchValue(this.object);
    }
    this.filteredCountries = this.taxRuleForm.controls.country.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private saveTaxRule(): Observable<IActionResult> {
    const value = this.taxRuleForm.value as ITaxRuleModel;

    if (value.end_date) {
      value.end_date = _moment(value.end_date).format('YYYY-MM-DD') as any;
    }
    if (value.start_date) {
      value.start_date = _moment(value.start_date).format('YYYY-MM-DD') as any;
    }

    this.createOrUpdate(this.taxRulesApiService, value).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('billing/tax-rules')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
