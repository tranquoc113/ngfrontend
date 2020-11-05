import { IYesNoDialogFlag } from '@shared/ui-api/interfaces/yes-no-dialog-flag';

export interface IYesNoDialogData {
  title: string;
  message: string;
  importantMessage?: string;
  flags?: IYesNoDialogFlag[];
}
