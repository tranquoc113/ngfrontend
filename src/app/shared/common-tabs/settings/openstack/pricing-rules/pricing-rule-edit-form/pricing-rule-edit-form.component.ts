import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IPricingRuleModel } from '@fleio-api/openstack/model/pricing-rule.model';
import { IPricingRuleCreateOptions } from '@fleio-api/openstack/model/pricing-rule-create-options';
import { PricingRulesApiService } from '@fleio-api/openstack/pricing-rule/pricing-rules-api.service';
import { IPricingRuleAttribute } from '@fleio-api/openstack/model/pricing-rule-attribute.model';
import { IPricingRuleResource } from '@fleio-api/openstack/model/pricing-rule-resource.model';
import { IPricingPlanModel } from '@fleio-api/openstack/model/pricing-plan.model';
import { PricingPlansApiService } from '@fleio-api/openstack/pricing-plan/pricing-plans-api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pricing-rule-edit-form',
  templateUrl: './pricing-rule-edit-form.component.html',
  styleUrls: ['./pricing-rule-edit-form.component.scss']
})
export class PricingRuleEditFormComponent
  extends DetailsFormBase<IPricingRuleModel>
  implements OnInit, AfterViewInit {

  pricingRuleForm = this.initForm();

  attributes = [] as IPricingRuleAttribute[];
  createOptions: IPricingRuleCreateOptions;
  pricingPlan: IPricingPlanModel;
  selectedResource = null as null | IPricingRuleResource;
  objectKeys = Object.keys;
  rateType = 'flat';
  conditions = this.pricingRuleForm.controls.conditions;

  initForm() {
    return this.formBuilder.group({
      display_name: ['', Validators.required],
      resource: ['', Validators.required],
      attribute: [''],
      attribute_unit: [{value: '', disabled: true}],
      time_unit: [''],
      pricing: this.initPricing(),
      conditions: this.formBuilder.array([]),
      modifiers: this.formBuilder.array([]),
      start_dt: [null],
      end_dt: [null],
      calculate_metrics_pricing_per_time_unit: [false]
    });
  }

  initPricing() {
    return this.formBuilder.group({
      prices: this.formBuilder.array([this.formBuilder.group({
        f: 0,
        p: [0, Validators.required],
        t: [{value: '∞', disabled: true}]
      })]),
    })
  }

  constructor(
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private config: ConfigService,
    private pricingRulesApiService: PricingRulesApiService, private router: Router,
    private pricingPlanApi: PricingPlansApiService
  ) {
    super();
  }

  createTier(): FormGroup {
    return this.formBuilder.group({
      f: 0,
      p: 0,
      t: [{value: '∞', disabled: true}]
    });
  }

  createFilter(): FormGroup {
    return this.formBuilder.group({
      attribute: ['', Validators.required],
      operator: ['', Validators.required],
      value: ['', Validators.required],
      attribute_unit: [null, Validators.required],
    });
  }

  createModifier(): FormGroup {
    return this.formBuilder.group({
      attribute: ['', Validators.required],
      name: ['', Validators.required],
      operator: ['', Validators.required],
      value: ['', Validators.required],
      price: ['', Validators.required],
      price_is_percent: [false, Validators.required],
      time_unit: ['', Validators.required],
      attribute_unit: [null, Validators.required],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;
    this.pricingPlan = this.activatedRoute.snapshot.data.pricingPlan;
    if (this.objectController) {
      this.objectController.actionCallback = () => this.savePriceRule();
    }
    // parse some fields in the json sent to backend, backend should be modified to accept params like they
    // are built in this form
    if (this.object && this.objectKeys(this.object).length) {
      this.pricingRuleForm.controls.resource.disable();
      const oldAttribute = this.object.pricing.attribute;
      const oldAttributeUnit = this.object.pricing.attribute_unit;
      const oldTimeUnit = this.object.pricing.time_unit;
      delete this.object.pricing.attribute;
      delete this.object.pricing.attribute_unit;
      delete this.object.pricing.time_unit;
      this.object.attribute = oldAttribute;
      this.object.attribute_unit = oldAttributeUnit;
      this.object.time_unit = oldTimeUnit;
      this.pricingRuleForm.patchValue(this.object);
      if (this.object && this.object.attribute === '') {
        this.pricingRuleForm.controls.attribute.setValue(' ');
      }
      const formModifiers = this.pricingRuleForm.get('modifiers') as FormArray;
      for (const modifier of this.object.modifiers) {
        formModifiers.push(this.formBuilder.group(modifier));
      }
      const formFilters = this.pricingRuleForm.get('conditions') as FormArray;
      for (const filter of this.object.conditions) {
        formFilters.push(this.formBuilder.group(filter));
      }
      const formPrices = this.pricingRuleForm.get('pricing').get('prices') as FormArray;
      formPrices.removeAt(0); // remove the initialization of prices from create page
      if (this.object.pricing.prices.length > 1) {
        this.rateType = 'tiered';
      }
      for (const price of this.object.pricing.prices) {
        formPrices.push(this.formBuilder.group(price));
      }
      if (this.rateType === 'tiered') {
        this.reCalculateTiers();
      }
      for (const resource of this.createOptions.resources) {
        if (resource.id === this.object.resource) {
          this.selectedResource = resource;
          this.attributes = this.selectedResource.attributes;
          this.canSelectUnitForAttribute();
        }
      }
      this.pricingPlanApi.get(this.object.plan).pipe(map(response => {
        this.pricingPlan = response;
      })).subscribe();
    }
  }

  ngAfterViewInit(): void {
  }

  private savePriceRule(): Observable<IActionResult> {
    const value = this.pricingRuleForm.getRawValue();
    // parse some fields in the json sent to backend, backend should be modified to accept params like they
    // are built in this form
    const attribute = value.attribute;
    const attributeUnit = value.attribute_unit || null;
    const timeUnit = value.time_unit;
    delete value.attribute;
    delete value.attribute_unit;
    delete value.time_unit;
    value.pricing.attribute = attribute;
    value.pricing.attribute_unit = attributeUnit;
    if (timeUnit) {
      value.pricing.time_unit = timeUnit;
    }
    value.plan = this.pricingPlan.id;
    if (this.selectedResource && this.selectedResource.type === 'internal') {
      value.start_dt = null;
      value.end_dt = null;
    }

    this.createOrUpdate(this.pricingRulesApiService, value).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPanelUrl('settings/openstack-plans') + '/' + this.pricingPlan.id
      ).catch(() => {
      });
    });

    return of(null);
  }

  public resetPrices() {
    const prices = this.pricingRuleForm.get('pricing').get('prices') as FormArray;
    while (prices.length) {
      prices.removeAt(0);
    }
    prices.push(
      this.createTier()
    );
  }

  public changedCalculateMetrics(event) {
    if (event.checked) {
      if (!this.pricingRuleForm.controls.time_unit) {
        // add control if missing for metric based rules once calculation method is changed by switching checkbox
        this.pricingRuleForm.addControl('time_unit', new FormControl('', Validators.required));
      }
    } else {
      // remove the time_unit control if use no longer uses time units for metric based rules
      this.pricingRuleForm.removeControl('time_unit');
    }
  }

  public selectedResourceChanged() {
    const oldSelectedResource = this.selectedResource;
    this.selectedResource = this.createOptions.resources.find(
      x => x.id === this.pricingRuleForm.controls.resource.value
    );
    this.attributes = this.selectedResource.attributes;
    this.rateType = 'flat';
    this.resetPrices();
    const newSelectedResource = this.selectedResource;
    if (oldSelectedResource && oldSelectedResource.type !== this.selectedResource.type) {
      this.pricingRuleForm.reset();
      this.pricingRuleForm.controls.calculate_metrics_pricing_per_time_unit.setValue(false);
      this.pricingRuleForm.controls.pricing = this.initPricing();
      this.pricingRuleForm.controls.resource.setValue(newSelectedResource.id);
      const newResourceIsMetricBased = (newSelectedResource.metric_display === true &&
        newSelectedResource.attribute_display === false);
      if (newResourceIsMetricBased) {
        // It is certain that we'll not use time unit for metric based rules. However, user can activate per time unit
        // and when doing so, the control is re-added in changedCalculateMetrics method
        this.pricingRuleForm.removeControl('time_unit');
      } else {
        if (!this.pricingRuleForm.controls.time_unit) {
          this.pricingRuleForm.addControl('time_unit', new FormControl('', Validators.required));
        }
      }
    }
  }

  public filterAttributeChanged(index) {
    // reset the operator and value after attribute changed in filter
    const filters = this.pricingRuleForm.get('conditions') as FormArray;
    const selectedFilter = filters.at(index);
    const oldAttribute = selectedFilter.value.attribute;
    filters.removeAt(index);
    filters.insert(index, this.formBuilder.group({
      attribute: [oldAttribute, Validators.required],
      operator: ['', Validators.required],
      value: ['', Validators.required],
      attribute_unit: [null],
    }));
  }

  public modifierAttributeChanged(index) {
    // reset the operator and value after attribute changed in modifier
    const modifiers = this.pricingRuleForm.get('modifiers') as FormArray;
    const selectedFilter = modifiers.at(index);
    const oldAttribute = selectedFilter.value.attribute;
    const oldName = selectedFilter.value.name;
    const oldPrice = selectedFilter.value.price;
    const oldPriceAsPercent = selectedFilter.value.price_is_percent;
    const oldTimeUnit = selectedFilter.value.time_unit;
    modifiers.removeAt(index);
    modifiers.insert(index, this.formBuilder.group({
      attribute: [oldAttribute, Validators.required],
      name: [oldName, Validators.required],
      operator: ['', Validators.required],
      value: ['', Validators.required],
      attribute_unit: [null],
      price: [oldPrice, Validators.required],
      price_is_percent: [oldPriceAsPercent, Validators.required],
      time_unit: [oldTimeUnit, Validators.required],
    }));
  }

  public hasPricingAttribute() {
    if (this.selectedResource && this.selectedResource.type === 'service') {
      for (const attribute of this.selectedResource.attributes) {
        if (attribute.type === 'integer') {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  public canSelectUnitForAttribute() {
    if (this.selectedResource) {
      for (const attribute of this.selectedResource.attributes) {
        if (attribute.value_size && attribute.name === this.pricingRuleForm.controls.attribute.value) {
          if (['k', 'm', 'g', 't', 'b', 'p', 'e'].indexOf(attribute.value_size)) {
            return this.pricingRuleForm.controls.attribute_unit.enable();
          }
        }
      }
      this.pricingRuleForm.controls.attribute_unit.setValue('');
      return this.pricingRuleForm.controls.attribute_unit.disable();
    }
    this.pricingRuleForm.controls.attribute_unit.setValue('');
    return this.pricingRuleForm.controls.attribute_unit.disable();
  }

  public getMetricHelpText(): string | null {
    if (this.selectedResource && this.selectedResource.metrics) {
      for (const metric of this.selectedResource.metrics) {
        if (metric.name === this.pricingRuleForm.controls.attribute.value) {
          return metric.help_text;
        }
      }
      return null;
    }
    return null;
  }

  public getMetricPerSecondBillingAvailability(compareWithSelectedMetric = true): boolean {
    let isSelectedMetric = false;
    if (this.selectedResource && this.selectedResource.metrics) {
      for (const metric of this.selectedResource.metrics) {
        if (compareWithSelectedMetric) {
          if (metric.name === this.pricingRuleForm.controls.attribute.value) {
            isSelectedMetric = true;
          }
        }
        if ((!compareWithSelectedMetric || isSelectedMetric) && (metric.reaggregation &&
          (['mean', 'max', 'min'].indexOf(metric.reaggregation) > -1 || metric.billing_based_on_existence))) {
          return true
        }
      }
      return false;
    }
    return false;
  }

  public addTier() {
    const prices = this.pricingRuleForm.get('pricing').get('prices') as FormArray;
    prices.push(this.createTier());
    this.reCalculateTiers();
  }

  public addFilter() {
    const filters = this.pricingRuleForm.get('conditions') as FormArray;
    return filters.push(this.createFilter());
  }

  public addModifier() {
    const modifiers = this.pricingRuleForm.get('modifiers') as FormArray;
    return modifiers.push(this.createModifier());
  }

  public removeTier(index) {
    const prices = this.pricingRuleForm.get('pricing').get('prices') as FormArray;
    prices.removeAt(index);
    this.reCalculateTiers();
  }

  public removeFilter(index) {
    const filters = this.pricingRuleForm.get('conditions') as FormArray;
    return filters.removeAt(index);
  }

  public removeModifier(index) {
    const modifiers = this.pricingRuleForm.get('modifiers') as FormArray;
    return modifiers.removeAt(index);
  }

  public reCalculateTiers() {
    // if a from field changed, re-calculate all tiers to be consecutive and have only one infinite
    const prices = this.pricingRuleForm.get('pricing').get('prices') as FormArray;
    // tslint:disable-next-line:prefer-for-of
    for (let tierToManipulateIndex = 0; tierToManipulateIndex < prices.length; tierToManipulateIndex++) {
      const oldFrom = prices.at(tierToManipulateIndex).value.f;
      const oldPrice = prices.at(tierToManipulateIndex).value.p;
      // tslint:disable-next-line:prefer-for-of
      const tierChanged = prices.at(tierToManipulateIndex).value as { t: any; p: any; f: any; };
      let nextMaxValue = 0;
      let toField = null;
      for (let tierToCompareWithIndex = 0; tierToCompareWithIndex < prices.length; tierToCompareWithIndex++) {
        if (prices.at(tierToCompareWithIndex).value.f > tierChanged.f &&
          (nextMaxValue > prices.at(tierToCompareWithIndex).value.f || nextMaxValue === 0)) {
          nextMaxValue = prices.at(tierToCompareWithIndex).value.f;
        }
      }
      if (nextMaxValue === 0) {
        toField = '∞';
      } else {
        toField = nextMaxValue;
      }
      prices.removeAt(tierToManipulateIndex);
      prices.insert(tierToManipulateIndex, this.formBuilder.group({
        f: oldFrom,
        p: oldPrice,
        t: [{value: toField, disabled: true}]
      }));
    }
  }

  public attrByName(attributeName) {
    for (const attribute of this.selectedResource.attributes) {
      if (attribute.name === attributeName) {
        return attribute;
      }
    }
    return null;
  }

  public getFilterValueInputType(attributeName): string | null {
    const attribute = this.attrByName(attributeName);
    if (attribute) {
      if (attribute.type === 'string' && !attribute.choices) {
        return 'textarea';
      } else if (attribute.type === 'integer' && !attribute.choices) {
        return 'number';
      } else if (attribute.type === 'datetime' && !attribute.choices) {
        return 'datetime';
      } else if (attribute.choices) {
        return 'choices';
      }
      return null;
    }
    return null;
  }

  public showAttributeUnitForFiltersModifiers(attributeName): boolean {
    const attribute = this.attrByName(attributeName);
    if (attribute) {
      return (!attribute.choices && attribute.type === 'integer' &&
        ['k', 'm', 'g', 't', 'b', 'p', 'e'].indexOf(attribute.value_size) > -1);
    }
    return false;
  }

  public getOperatorsForAttribute(selectedAttributeName): {} {
    const attribute = this.attrByName(selectedAttributeName);
    if (attribute) {
      if (attribute.choices) {
        return {
          eq: 'Equal',
          ne: 'Not equal',
        };
      } else if (attribute.type === 'string') {
        return this.createOptions.string_operators;
      } else if (attribute.type === 'integer' || attribute.type === 'datetime') {
        return this.createOptions.number_operators;
      } else {
        return {};
      }
    }
    return {};
  }
}
