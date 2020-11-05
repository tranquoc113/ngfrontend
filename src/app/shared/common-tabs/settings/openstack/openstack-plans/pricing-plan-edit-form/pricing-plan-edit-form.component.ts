import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IPricingPlanModel } from '../../../../../fleio-api/openstack/model/pricing-plan.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPricingPlanCreateOptions } from '../../../../../fleio-api/openstack/model/pricing-plan-create-options';
import { DetailsFormBase } from '../../../../../ui/objects-view/details-form-base';
import { Observable, of } from 'rxjs';
import { IActionResult } from '../../../../../ui/objects-view/interfaces/actions/action-result';
import { PricingPlansApiService } from '../../../../../fleio-api/openstack/pricing-plan/pricing-plans-api.service';
import { ConfigService } from '../../../../../config/config.service';

@Component({
  selector: 'app-pricing-plan-edit-form',
  templateUrl: './pricing-plan-edit-form.component.html',
  styleUrls: ['./pricing-plan-edit-form.component.scss']
})
export class PricingPlanEditFormComponent
  extends DetailsFormBase<IPricingPlanModel>
  implements OnInit, AfterViewInit {

  pricingPlanForm = this.formBuilder.group({
    name: ['', Validators.required],
    currency: ['', Validators.required],
    is_default: [false],
    other_default: [''],
  });

  createOptions: IPricingPlanCreateOptions;
  initialDefault = false;
  isDefault = this.pricingPlanForm.controls.is_default;

  constructor(
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private config: ConfigService,
    private pricingPlansApi: PricingPlansApiService, private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;
    if (this.objectController) {
      this.objectController.actionCallback = () => this.savePlan();
    }
    if (this.object) {
      this.pricingPlanForm.patchValue(this.object);
      this.initialDefault = !!this.object.is_default;
    }
  }

  ngAfterViewInit(): void {
  }

  private savePlan(): Observable<IActionResult> {
    const value = this.pricingPlanForm.value as any;

    if (value.other_default === '') {
      delete value.other_default;
    }

    this.createOrUpdate(this.pricingPlansApi, value).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('settings/openstack-plans')
      ).catch(() => {});
    });

    return of(null);
  }
}
