import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { ServicesApiService } from '@fleio-api/billing/services/service-api.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { IProductCycleModel } from '@fleio-api/billing/model/product-cycle.model';
import { ProductsApiService } from '@fleio-api/billing/products/product-api.service';
import { map, mergeMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-service-edit-form',
  templateUrl: './service-edit-form.component.html',
  styleUrls: ['./service-edit-form.component.scss']
})
export class ServiceEditFormComponent extends DetailsFormBase<IServiceModel> implements OnInit {
  serviceForm = this.formBuilder.group({
    display_name: ['', Validators.required],
    product: ['', Validators.required],
    cycle: ['', Validators.required],
    is_free: [false],
    notes: [''],
    override_price: [''],
    override_suspend_until: [''],
    current_service_cycle_end: [''],
    next_expiration_date: [''],
  });

  product = this.serviceForm.controls.product;
  cycle = this.serviceForm.controls.cycle;

  constructor(
    private formBuilder: FormBuilder,
    private clientsApi: ClientsApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public config: ConfigService,
    private servicesApi: ServicesApiService,
    private productsApiService: ProductsApiService,
  ) {
    super();
  }

  filteredProducts$: Observable<IProductModel[]>;

  clickedProductInput() {
    this.product.setValue('');
  }

  displayProductFn(product) {
    return product.name || product.id;
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveService();
    }
    if (this.object) {
      this.serviceForm.patchValue(this.object);
      this.serviceForm.controls.cycle.setValue(this.object.cycle.id);
      this.productsApiService.get(this.object.product.id).subscribe(product => {
        this.product.setValue(product);
      });
    }

    this.filteredProducts$ = this.product.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.productsApiService.list({
          search: value,
        }).pipe(map(productsList => productsList.objects));
      })
    );

    this.product.valueChanges.subscribe((product: IProductModel) => {
        if (product.cycles) {
          const currentCycleId = this.cycle.value.id ? this.cycle.value.id : this.cycle.value;

          if (!product.cycles.find(cycle => cycle.id === currentCycleId)) {
            this.cycle.setValue(product.cycles[0].id);
          }
        }
      }
    );
  }

  saveService(): Observable<IActionResult> {
    const value = this.serviceForm.value as IServiceModel;
    value.status = this.object.status;
    value.product = (value.product as IProductModel).id;
    if (value.cycle instanceof Object
    ) {
      value.cycle = (value.cycle as IProductCycleModel).id;
    }

    this.createOrUpdate(this.servicesApi, value).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('billing/services')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
