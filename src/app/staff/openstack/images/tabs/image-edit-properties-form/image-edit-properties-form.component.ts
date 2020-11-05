import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ImagesApiService } from '@fleio-api/openstack/image/image-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-image-edit-properties-form',
  templateUrl: './image-edit-properties-form.component.html',
  styleUrls: ['./image-edit-properties-form.component.scss']
})
export class ImageEditPropertiesFormComponent extends DetailsFormBase<IImageModel> implements OnInit {
  imagePropertiesForm = this.formBuilder.group({
    properties: this.formBuilder.array([]),
  });

  properties: FormArray = this.imagePropertiesForm.controls.properties as FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private imagesApi: ImagesApiService,
    private router: Router,
    private config: ConfigService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  ngOnInit() {
    if (this.object) {
      for (const propertyName of Object.keys(this.object.properties)) {
        this.addProperty(propertyName, this.object.properties[propertyName]);
      }
    }
  }

  addProperty(key: string = '', value: string = '') {
    this.properties.push(
      this.formBuilder.group({
        key: [key, Validators.required],
        value: [value, Validators.required],
      })
    )
  }

  cancelEdit() {
    this.router.navigateByUrl(
      this.config.getPrevUrl(`openstack/images/${this.object.id}`)
    ).then(() => {
    });
  }

  saveProperties() {
    const image = {...this.object}
    image.properties = {}
    for (const property of this.properties.controls) {
      const propertyValue = property.value;
      if (propertyValue.key) {
        image.properties[propertyValue.key] = propertyValue.value;
      }
    }

    for (const oldPropertyName of Object.keys(this.object.properties)) {
      if (!image.properties[oldPropertyName]) {
        image.properties[oldPropertyName] = '';
      }
    }

    this.imagesApi.update(image.id, image).subscribe(() => {
        this.notificationService.showMessage('Image properties updated');
        this.router.navigateByUrl(this.config.getPanelUrl(`openstack/images/${image.id}`)).then(() => {
        });
      }, () => {
        this.notificationService.showMessage('Failed to update image properties');
      }
    );
  }

  deleteProperty(index: number) {
    this.properties.removeAt(index);
  }
}
