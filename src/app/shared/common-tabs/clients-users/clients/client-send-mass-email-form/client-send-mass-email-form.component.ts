import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsFormBase } from '../../../../ui/objects-view/details-form-base';
import { IClientModel } from '../../../../fleio-api/client-user/model/client.model';
import { ConfigService } from '../../../../config/config.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadInterfaceComponent } from '../../../../ui/upload-interface/upload-interface.component';
import { IClientCreateOptions } from '../../../../fleio-api/client-user/model/client-create-options';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../ui-api/notification.service';
import { ClientsApiService } from '../../../../fleio-api/client-user/client/clients-api.service';
import { EMPTY, Observable, of } from 'rxjs';
import { IActionResult } from '../../../../ui/objects-view/interfaces/actions/action-result';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { IImageModel } from '../../../../fleio-api/openstack/model/image.model';

@Component({
  selector: 'app-client-send-mass-email-form',
  templateUrl: './client-send-mass-email-form.component.html',
  styleUrls: ['./client-send-mass-email-form.component.scss']
})
export class ClientSendMassEmailFormComponent extends DetailsFormBase<IClientModel> implements OnInit {
  @ViewChild('uploadInterface') uploadInterface: UploadInterfaceComponent;
  massEmailForm = this.formBuilder.group({
    from_name_addr: ['', Validators.required],
    subject: ['', Validators.required],
    body: ['', Validators.required],
    send_batch_size: [16, [Validators.required, Validators.min(1)]],
    send_interval: [30, [Validators.required, Validators.min(1)]],
    filter: [''],
    search: [''],
  });
  filteringString = '';
  searchingString = '';
  tinyMCEOptions: any;
  maxAttachmentSize = 10 * 1024 * 1024;
  createOptions: IClientCreateOptions;
  uploading = false;
  uploadProgress: number;

  constructor(
    private config: ConfigService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private clientsApiService: ClientsApiService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.sendMassEmail();
    }
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;
    if (this.config && this.config.current) {
      this.tinyMCEOptions = this.config.current.settings.tinyMCEOptions;
    }
    this.initClientFilteringData();
  }

  clickVariable(item: string) {
    const textArea = document.createElement('textarea');
    textArea.value = item;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
    this.notificationService.showMessage('Successfully copied');
  }

  sendMassEmail(): Observable<IActionResult>  {
    const value = this.massEmailForm.value;
    const formData = new FormData();
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        formData.append(key, value[key]);
      }
    }
    const fileInputs = this.uploadInterface.getFileInputs();
    const allFiles = [];
    for (const fileInput of fileInputs) {
      if (fileInput && fileInput.nativeElement.files.length) {
        // on send mass email, for one input there is at most one file
        allFiles.push(fileInput.nativeElement.files[0]);
      }
    }
    let i = 0;
    for (const file of allFiles) {
      formData.append('file_data_' + i, file);
      formData.append('file_name_' + i, file.name);
      i++;
    }

    const response = this.createOrUpdate(
      this.clientsApiService,
      formData,
      false,
      'send_mass_email'
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
          this.router.navigateByUrl(
            this.config.getPrevUrl('clients-users/clients')
          ).catch(() => {
          });
        }
      });
    }
    return of(null);
  }

  initClientFilteringData() {
    const prevUrl = this.config.getPrevUrl();
    if (prevUrl.includes('clients')) {
      const filteringSearchNeedle = 'filtering=';
      const filteringIndex = prevUrl.indexOf(filteringSearchNeedle);
      if (filteringIndex > -1) {
        let i = filteringIndex + filteringSearchNeedle.length;
        while (prevUrl[i] !== '&' && prevUrl[i]) {
          this.filteringString += prevUrl[i];
          i++;
        }
      }
      if (this.filteringString) {
        this.filteringString = decodeURIComponent(this.filteringString);
      }
      const searchingSearchNeedle = 'search=';
      const searchingIndex = prevUrl.indexOf(searchingSearchNeedle);
      if (searchingIndex > -1) {
        let j = searchingIndex + searchingSearchNeedle.length;
        while (prevUrl[j] !== '&' && prevUrl[j]) {
          this.searchingString += prevUrl[j];
          j++;
        }
      }
      if (this.searchingString) {
        this.searchingString = decodeURIComponent(this.searchingString);
      }
      this.massEmailForm.controls.filter.setValue(this.filteringString);
      this.massEmailForm.controls.search.setValue(this.searchingString);
    }
  }

}
