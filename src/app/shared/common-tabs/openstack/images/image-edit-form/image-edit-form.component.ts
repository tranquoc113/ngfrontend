import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { EMPTY, Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { ImagesApiService } from '@fleio-api/openstack/image/image-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IImageCreateOptionsModel } from '@fleio-api/openstack/model/image-create-options.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { NotificationService } from '@shared/ui-api/notification.service';
import { AuthService } from '@shared/auth/auth.service';
import { RefreshService } from '@shared/ui-api/refresh.service';

@Component({
  selector: 'app-image-edit-form',
  templateUrl: './image-edit-form.component.html',
  styleUrls: ['./image-edit-form.component.scss']
})
export class ImageEditFormComponent extends DetailsFormBase<IImageModel> implements OnInit {
  imageForm = this.formBuilder.group({
    region: ['', Validators.required],
    name: ['', Validators.required],
    min_disk: [0, Validators.required],
    min_ram: [0, Validators.required],
    disk_format: ['', Validators.required],
    os_distro: [''],
    os_version: [''],
    architecture: [''],
    hypervisor_type: [''],
    visibility: ['private', Validators.required],
    protected: [false],
    source: ['url', Validators.required],
    url: ['', Validators.required],
    file: ['', Validators.required],
  });
  createOptions: IImageCreateOptionsModel;
  @ViewChild('fileInput') fileInput;
  imageFile: File;
  uploading = false;
  uploadProgress = 7;
  changingActiveState = false;
  fromInstanceCreate = (this.activatedRoute.snapshot.queryParams?.from_instance_create === 'true') || false;

  constructor(
    private formBuilder: FormBuilder,
    private imagesApi: ImagesApiService,
    private router: Router,
    private config: ConfigService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    public auth: AuthService,
    private refreshService: RefreshService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;
    if (this.object && !this.object.id) {
      if (this.createOptions.disk_formats.indexOf('qcow2') > -1) {
        this.imageForm.controls.disk_format.setValue('qcow2');
      } else {
        this.imageForm.controls.disk_format.setValue(this.createOptions.disk_formats[0]);
      }
      this.imageForm.controls.architecture.setValue(this.createOptions.architectures[0][0]);
    }
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveImage();
    } else {
      console.error('Cannot set actionCallback due to missing objectController');
    }
    if (this.object) {
      this.imageForm.patchValue(this.object);
    }

    if (this.object && !this.object.id) {
      // creating new flavor
      this.imageForm.controls.region.setValue(this.createOptions.selected_region);
      this.imageForm.controls.file.disable();
      this.imageForm.controls.source.valueChanges.subscribe((newValue) => {
        if (newValue === 'url') {
          this.imageForm.controls.file.disable();
          this.imageForm.controls.url.enable();
        } else {
          this.imageForm.controls.file.enable();
          this.imageForm.controls.url.disable();
        }
      });
    } else {
      this.imageForm.controls.source.disable();
      this.imageForm.controls.url.disable();
      this.imageForm.controls.file.disable();
    }
  }

  fileChanged($event: Event) {
    const files = ($event.target as HTMLInputElement).files;
    this.imageFile = files.length > 0 ? files[0] : null;
    this.imageForm.controls.file.setValue(this.imageFile.name);
  }

  cancelEdit() {
    this.router.navigateByUrl(
      this.config.getPanelUrl(
        this.object.id ? `openstack/images/${this.object.id}` : 'openstack/images',
      )
    ).catch(() => {
    });
  }

  saveImage(): Observable<IActionResult> {
    const imageData = this.imageForm.value;
    let formData: FormData;
    if (imageData.source === 'file' && this.imageFile) {
      imageData.file = this.imageFile;
      formData = new FormData();
      Object.keys(imageData).map(fieldName => {
        formData.append(fieldName, imageData[fieldName]);
      });
      formData.append('file', this.imageFile, this.imageFile.name);
    }

    const response = this.createOrUpdate(
      this.imagesApi,
      formData ? formData : imageData,
    );

    if (response !== EMPTY) {
      this.uploading = !!formData;
      response.subscribe((data) => {
        let requestCompleted = false;
        if (formData) {
          const event = data as HttpEvent<IImageModel>;
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = event.loaded / event.total * 100;
          }

          if (event.type === HttpEventType.Response) {
            requestCompleted = true;
          }
        } else {
          requestCompleted = true;
        }

        if (requestCompleted) {
          this.uploading = false;
          if (this.object.id) {
            this.notificationService.showMessage('Image updated');
          } else {
            this.notificationService.showMessage('Image creation scheduled');
            if (this.fromInstanceCreate) {
              // if user came from instance create, redirect back having the image preselected
              const image = data as IImageModel;
              this.router.navigateByUrl(
                this.config.getPanelUrl(
                  `openstack/instances/create?image_id=${image.id}&region=${image.region}&requestedImage=true`,
                )
              ).catch(() => {});
              return of(null);
            }
          }
          this.router.navigateByUrl(
            this.config.getPanelUrl(
              this.object.id ? `openstack/images/${this.object.id}` : 'openstack/images',
            )
          ).catch(() => {
          });
        }
      });
    }

    return of(null);
  }

  toggleActiveStatus() {
    this.changingActiveState = true;
    if (this.object.status === 'active') {
      this.imagesApi.deactivate(this.object.id).subscribe(() => {
        this.refreshService.refresh();
      }).add(() => {
        this.changingActiveState = false;
      });
    } else {
      this.imagesApi.reactivate(this.object.id).subscribe(() => {
        this.refreshService.refresh();
      }).add(() => {
        this.changingActiveState = false;
      });
    }
  }
}
