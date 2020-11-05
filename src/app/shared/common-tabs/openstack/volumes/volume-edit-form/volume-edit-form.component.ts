import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { IVolumeCreateOptionsModel } from '@fleio-api/openstack/model/volume-create-options.model';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { ImagesApiService } from '@fleio-api/openstack/image/image-api.service';
import { IVolumeType } from '@fleio-api/openstack/model/volume-type.model';

@Component({
  selector: 'app-volume-edit-form',
  templateUrl: './volume-edit-form.component.html',
  styleUrls: ['./volume-edit-form.component.scss']
})
export class VolumeEditFormComponent extends DetailsFormBase<IVolumeModel> implements OnInit {
  volumeForm = this.formBuilder.group({
    client: ['', Validators.required],
    region: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    source: this.formBuilder.group({
      source: ['', Validators.required],
      source_type: ['new', Validators.required],
    }),
    size: ['', [Validators.required]],
    type: ['', Validators.required],
  });

  loading = false;

  client = this.volumeForm.controls.client;
  region = this.volumeForm.controls.region;
  image = (this.volumeForm.controls.source as FormGroup).controls.source;
  source_type = (this.volumeForm.controls.source as FormGroup).controls.source_type;
  filteredClients$: Observable<IClientModel[]>;
  filteredImages$: Observable<IImageModel[]>;
  createOptions: IVolumeCreateOptionsModel;
  sourceTypes: object[];
  selectedVolumeType: IVolumeType;

  constructor(
    private formBuilder: FormBuilder,
    private volumesApi: VolumesApiService,
    private clientsApi: ClientsApiService,
    private router: Router,
    private config: ConfigService,
    private activatedRoute: ActivatedRoute,
    private imagesApi: ImagesApiService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveVolume();
    }
    if (this.object) {
      this.volumeForm.patchValue(this.object);
    }
    this.image.disable();

    if (this.object && !this.object.id) {
      // creating new volume
      this.volumeForm.controls.region.setValue(this.createOptions.selected_region);
    } else {
      this.volumeForm.disable();
    }

    this.filteredClients$ = this.client.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.clientsApi.list({
          search: value,
          openstack_project: true,
        }).pipe(map(clientsList => clientsList.objects));
      })
    );

    this.filteredImages$ = this.image.valueChanges.pipe(
      startWith(''),
      map(image => {
        return typeof image === 'string' ? image : image.id;
      }),
      mergeMap(value => {
        return this.imagesApi.list({
          search: value,
          region: this.volumeForm.controls.region.value,
        }).pipe(map(imagesList => imagesList.objects));
      })
    );

    this.region.valueChanges.subscribe(region => {
      this.volumesApi.createOptions({region}).subscribe(createOptions => {
        this.createOptions = createOptions as IVolumeCreateOptionsModel;
        this.refreshSourceTypes();
      });
    });

    this.source_type.valueChanges.subscribe(sourceType => {
      if (sourceType === 'image') {
        this.image.enable();
      } else {
        this.image.disable();
      }
    });

    this.refreshSourceTypes();
  }

  volumeTypeChanged(newVolumeType: IVolumeType) {
    this.selectedVolumeType = newVolumeType;
    if (newVolumeType) {
      this.volumeForm.controls.type.setValidators([
        Validators.required, Validators.min(newVolumeType.minimumSize)
      ]);
    } else {
      this.volumeForm.controls.type.setValidators(Validators.required);
    }
  }

  refreshSourceTypes() {
    this.sourceTypes = [{name: 'new', description: 'Create a new empty volume'}];
    if (this.createOptions && this.createOptions.sources) {
      if (this.createOptions.sources.image && this.createOptions.sources.image.length) {
        this.sourceTypes.push({name: 'image', description: 'Use image as a source'});
      }
      if (this.createOptions.sources.volume && this.createOptions.sources.volume.length) {
        this.sourceTypes.push({name: 'volume', description: 'Use an existing volume'});
      }
    }
  }

  clientDisplay(client?: IClientModel): string | undefined {
    if (client) {
      return client.name ? client.name : `${client.first_name} ${client.last_name}`;
    } else {
      return undefined;
    }
  }

  imageDisplay(image?: IImageModel): string | undefined {
    if (image) {
      return image.name;
    } else {
      return undefined;
    }
  }

  saveVolume(): Observable<IActionResult> {
    const value = this.volumeForm.value;
    if (typeof (value.client) === 'object') {
      value.client = (value.client as IClientModel).id;
    }

    if (typeof (value.source.source) === 'object') {
      value.source.source = (value.source.source as IImageModel).id;
    }

    this.loading = true;
    this.createOrUpdate(
      this.volumesApi,
      value,
    ).subscribe(() => {
      this.router.navigateByUrl('openstack/volumes');
    }).add(() => {
      this.loading = false;
    });

    return of(null);
  }

  clearClient() {
    this.volumeForm.controls.client.setValue('');
  }
}
