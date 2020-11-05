import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { FlavorsApiService } from '@fleio-api/openstack/flavor/flavors-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IFlavorCreateOptionsModel } from '@fleio-api/openstack/model/flavor-create-options.model';

@Component({
  selector: 'app-flavor-edit-form',
  templateUrl: './flavor-edit-form.component.html',
  styleUrls: ['./flavor-edit-form.component.scss']
})
export class FlavorEditFormComponent extends DetailsFormBase<IFlavorModel> implements OnInit {
  flavorForm = this.formBuilder.group({
    preserve_id: [true],
    name: ['', Validators.required],
    region: ['', Validators.required],
    memory_mb: ['', [Validators.required, Validators.min(1)]],
    vcpus: [1, [Validators.required, Validators.min(1)]],
    root_gb: [1, [Validators.required, Validators.min(0)]],
    swap: [0, [Validators.required, Validators.min(0)]],
    ephemeral_gb: [0, [Validators.required, Validators.min(0)]],
    description: [''],
    is_public: [true],
    show_in_fleio: [true],
    out_of_stock: [false],
  });
  loading = false;

  newFlavor = false;

  public createOptions: IFlavorCreateOptionsModel;

  constructor(
    private formBuilder: FormBuilder,
    private flavorsApi: FlavorsApiService,
    private router: Router,
    private config: ConfigService,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveFlavor();
    }
    if (this.object) {
      this.flavorForm.patchValue(this.object);
    }

    if (this.object && !this.object.id) {
      // creating new flavor
      this.newFlavor = true;
      this.flavorForm.controls.region.setValue(this.createOptions.selected_region);
    }
  }

  protected initTabData() {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveFlavor();
    }
  }

  saveFlavor(): Observable<IActionResult> {
    const value = this.flavorForm.value;
    if (!this.flavorForm.invalid) {
      this.loading = true;
    }
    this.createOrUpdate(
      this.flavorsApi,
      value,
      true
    ).subscribe((response: any) => {
      if (this.newFlavor) {
        if (this.config.currentConfigurationName === 'reseller') {
          this.router.navigateByUrl(
            this.config.getPanelUrl('openstack/flavors')
          ).catch(() => {
          });
        } else {
          this.router.navigateByUrl(
            this.config.getPanelUrl('openstack/flavors')
          ).catch(() => {
          });
        }
      } else {
        let id = this.object.id;
        if (response && response.id) {
          id = response.id;
        }
        this.router.navigateByUrl(
          this.config.getPanelUrl(`openstack/flavors/${id}`)
        ).catch(() => {
        });
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    });

    return of(null);
  }
}
