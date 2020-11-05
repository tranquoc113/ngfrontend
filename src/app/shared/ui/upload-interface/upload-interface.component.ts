import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '../../ui-api/notification.service';

@Component({
  selector: 'app-upload-interface',
  templateUrl: './upload-interface.component.html',
  styleUrls: ['./upload-interface.component.scss']
})
export class UploadInterfaceComponent implements OnInit {
  @Input() multipleFileSelectors = false;
  @Input() maxSize: number;
  @ViewChildren('actualFileInputs') actualFileInputs: QueryList<ElementRef>;
  file: any;
  form: FormGroup = this.formBuilder.group({});
  fileNames: {
    [key: number]: string;
  } = {};

  maxSizeReadable: string;
  fileInputs = Array(1).fill(0).map((x,i) => i);

  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  getFileInputElemRef(inputNr: number): ElementRef {
    return this.actualFileInputs.toArray()[inputNr];
  }

  selectFile(inputNr: number) {
    this.getFileInputElemRef(inputNr).nativeElement.click();
  }

  fileInputChanged(event, inputNr: number) {
    const files = event.target.files;
    this.fileNames[inputNr] = null;
    if (files.length) {
      this.fileNames[inputNr] = '';
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > this.maxSize) {
          this.notificationService.showMessage('Chosen file exceeds maximum allowed size.')
          this.getFileInputElemRef(inputNr).nativeElement.value = null;
          break;
        }
        this.fileNames[inputNr] = this.fileNames[inputNr] + files[i].name;
        if (i !== files.length - 1) {
          this.fileNames[inputNr] = this.fileNames[inputNr] + ', ';
        }
      }
    }
    this.form.controls[`file${inputNr}`].setValue(this.fileNames[inputNr]);
  }

  removeSelection(inputNr: number) {
    const inputElem = this.getFileInputElemRef(inputNr).nativeElement;
    inputElem.value = null;
    this.fileNames[inputNr] = null;
    this.form.controls[`file${inputNr}`].setValue(this.fileNames[inputNr]);
    if (this.fileInputs.length > 1) {
      this.fileInputs.splice(inputNr, 1);
    }
  }

  addMoreAtt() {
    const inputNr = this.fileInputs.length;
    this.fileInputs.push(this.fileInputs.length);
    this.form.addControl(`file${inputNr}`, this.formBuilder.control(['']));
  }

  public getFileInputs(): Array<ElementRef> {
    const fileInputsRef = [];
    for (const elem of this.actualFileInputs.toArray()) {
      fileInputsRef.push(elem);
    }
    return fileInputsRef;
  }

  public resetFileInputs() {
    this.fileInputs = Array(1).fill(0).map((x,i) => i);
    this.form = this.formBuilder.group({});
    this.addControls();
    this.fileNames = {};
  }

  private addControls() {
    for (const nr of this.fileInputs) {
      this.form.addControl(`file${nr}`, this.formBuilder.control(['']));
    }
  }

  ngOnInit(): void {
    if (this.maxSize) {
      const i = Math.floor(Math.log(this.maxSize) / Math.log(1024));
      const sizes = ['B', 'KB', 'MB', 'GB'];
      this.maxSizeReadable = 'Max. ' + (
        // @ts-ignore
        (this.maxSize / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i]
      ) + ' / file';
    }
    this.addControls();
  }

}
