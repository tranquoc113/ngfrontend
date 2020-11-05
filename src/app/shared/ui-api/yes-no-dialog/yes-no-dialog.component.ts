import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IYesNoDialogData } from '../interfaces/yes-no-dialog-data';
import { IYesNoDialogResult } from '@shared/ui-api/interfaces/yes-no-dialog-result';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<YesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IYesNoDialogData,
  ) {
  }

  ngOnInit() {
  }

  closeNo() {
    this.dialogRef.close('no');
  }

  closeYes() {
    if (this.data.flags) {
      const flags = {}
      for (const flag of this.data.flags) {
        flags[flag.id] = flag.selected;
      }
      const result = {
        button: 'yes',
        flags,
      } as IYesNoDialogResult;

      this.dialogRef.close(result);
    } else {
      this.dialogRef.close('yes');
    }
  }
}
