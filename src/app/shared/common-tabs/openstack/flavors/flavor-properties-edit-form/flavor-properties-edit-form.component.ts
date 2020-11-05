import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FlavorsApiService } from '@fleio-api/openstack/flavor/flavors-api.service';
import { EMPTY, of } from 'rxjs';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-flavor-properties-edit-form',
  templateUrl: './flavor-properties-edit-form.component.html',
  styleUrls: ['./flavor-properties-edit-form.component.scss']
})
export class FlavorPropertiesEditFormComponent extends DetailsFormBase<IFlavorModel> implements OnInit {
  flavorPropertiesForm = this.formBuilder.group({
    properties: this.formBuilder.array([])
  });
  formProperties = this.flavorPropertiesForm.get('properties') as FormArray;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private flavorsApi: FlavorsApiService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  propertiesDictToList(propDict: {}) {
    for (const key in propDict) {
      if (propDict.hasOwnProperty(key)) {
        this.formProperties.push(this.formBuilder.group({
          key: this.formBuilder.control({value: key, disabled: true}, Validators.required),
          value: propDict[key],
        }));
      }
    }
  }

  deletePropertyFromList(index: number) {
    const properties = this.formProperties.getRawValue();
    if (!properties[index].key) {
      this.formProperties.removeAt(index);
    } else {
      this.loading = true;
      this.flavorsApi.unsetProperty(this.object.id, properties[index].key).subscribe(response => {
        this.notificationService.showMessage('Successfully removed property.');
        this.formProperties.removeAt(index);
        this.loading = false;
      }, error => {
        this.loading = false;
        if (error && error.status === 404) {
          this.formProperties.removeAt(index);
          this.notificationService.showMessage('Removed property because it was not found.');
        } else {
          this.notificationService.showMessage('Could not remove property.');
        }
      });
    }
  }

  addPropertyToList() {
    this.formProperties.push(this.formBuilder.group({
      key: this.formBuilder.control('', Validators.required),
      value: '',
    }));
  }

  saveProperties() {
    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return of(null);
    }
    const value = this.flavorPropertiesForm.getRawValue();
    const propertiesDict = this.propertiesListToDict(value.properties);
    this.loading = true;
    this.flavorsApi.setProperties(this.object.id, propertiesDict).subscribe(response => {
      this.notificationService.showMessage('Successfully saved properties.');
      this.loading = false;
    }, error => {
      this.loading = false;
      if (error.error) {
        this.setErrors(error.error);
      }
    });
    return of(null);
  }

  propertiesListToDict(props: Array<{key: string; value: string;}>): {} {
    const dict = {};
    for (const prop of props) {
      dict[prop.key] = prop.value;
    }
    return dict;
  }

  protected initTabData() {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveProperties();
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.object && this.object.properties) {
      const propertiesDict = JSON.parse(this.object.properties);
      this.propertiesDictToList(propertiesDict);
    }
  }

}
