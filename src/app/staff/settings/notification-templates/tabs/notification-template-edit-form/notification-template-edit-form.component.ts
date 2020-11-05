import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { INotificationTemplateCreateOptionsModel } from '../../../../../shared/fleio-api/notification-templates/model/notification-template-create-options';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';
import { INotificationTemplateModel } from '../../../../../shared/fleio-api/notification-templates/model/notification-template.model';
import { ConfigService } from '../../../../../shared/config/config.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTemplateDialogComponent } from '../../dialogs/add-new-template-dialog/add-new-template-dialog.component';
import { CallbackAction } from '../../../../../shared/ui/objects-view/actions/callback-action';
import { Observable, of } from 'rxjs';
import { IActionResult } from '../../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { ITemplateLanguageModel } from '../../../../../shared/fleio-api/notification-templates/model/template-language.model';
import { NotificationTemplatesApiService } from '../../../../../shared/fleio-api/notification-templates/notification-templates-api.service';
import { RefreshService } from '../../../../../shared/ui-api/refresh.service';

@Component({
  selector: 'app-notification-template-edit-form',
  templateUrl: './notification-template-edit-form.component.html',
  styleUrls: ['./notification-template-edit-form.component.scss']
})
export class NotificationTemplateEditFormComponent
  extends DetailsFormBase<INotificationTemplateModel> implements OnInit {
  createOptions: INotificationTemplateCreateOptionsModel;
  templateName: string;
  notificationTemplatesForm = this.formBuilder.group({
    disable_notification: [false],
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  tinyMCEOptions = null;
  availableLanguages: ITemplateLanguageModel[] = [];

  constructor(
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private matDialog: MatDialog,
    private notificationService: NotificationService, private config: ConfigService,
    private notificationTemplatesApiService: NotificationTemplatesApiService, private refreshService: RefreshService,
  ) {
    super();
  }

  public get notificationTemplates(): INotificationTemplateModel[] {
    return this.object as unknown as INotificationTemplateModel[];
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.config.current) {
      this.tinyMCEOptions = this.config.current.settings.tinyMCEOptions;
    }
    if (this.object) {
      this.createOptions = this.activatedRoute.snapshot.data.createOptions;
      this.templateName = this.notificationTemplates[0].name;
      this.availableLanguages = this.createOptions.languages.filter(
        lang => !this.notificationTemplates[0].template_languages.includes(lang.language_code)
      );
      if (this.objectController) {
        this.objectController.actionCallback = (action) => this.tabAction(action);
      }

      for (const template of this.notificationTemplates) {
        const groupControls: any = {}
        const groupName = `template${template.id}`;
        groupControls.title = [template.title, Validators.required];
        groupControls.content = [template.content, Validators.required];
        this.notificationTemplatesForm.addControl(groupName, this.formBuilder.group(groupControls));
      }
    }
  }

  tabAction(action: CallbackAction): Observable<IActionResult> {
    if (action.name.toLowerCase() === 'add new template') {
      this.addNewTemplate();
    }
    if (action.name.toLowerCase() === 'save templates') {
      this.saveTemplates();
    }

    return of({message: 'Action executed'});
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

  deleteTemplate(template: INotificationTemplateModel) {
    this.notificationService.confirmDialog({
      title: `Delete template ${this.templateName} - ${template.language_display}`,
      message: `Are you sure you want to delete template ${this.templateName} - ${template.language_display}?`,
    }).subscribe(result => {
      if (result === 'yes') {
        this.notificationTemplatesApiService.delete(template.id).subscribe(
          () => {
            this.notificationService.showMessage('Template deleted');
            this.refreshService.refresh();
          },
          error => {
            if (error.error && error.error.detail) {
              this.notificationService.showMessage(error.error.detail);
            } else {
              this.notificationService.showMessage('Failed to delete template');
            }
          }
        )
      }
    })
  }

  saveTemplates() {
    for (const template of this.notificationTemplates) {
      const formValue = this.notificationTemplatesForm.controls[`template${template.id}`].value;
      template.title = formValue.title;
      template.content = formValue.content;
    }

    this.notificationTemplatesApiService.updateTemplatesSet(this.notificationTemplates).subscribe(
      () => {
        this.notificationService.showMessage('Templates saved successfully');
        this.refreshService.refresh();
      },
      error => {
        if (error.error && error.error.detail) {
          this.notificationService.showMessage(error.error.detail);
        } else {
          this.notificationService.showMessage('Failed to save templates');
        }
      }
    )
  }

  addNewTemplate() {
    return this.matDialog.open(
      AddNewTemplateDialogComponent, {
        data: {
          availableLanguages: this.availableLanguages,
          templateName: this.templateName,
        }
      }).afterClosed().subscribe(result => {
      if (result !== 'close') {
        this.notificationTemplatesApiService.createTemplate(
          this.templateName, result,
        ).subscribe(
          () => {
            this.notificationService.showMessage('New template added');
            this.refreshService.refresh();
          },
          error => {
            if (error.error && error.error.detail) {
              this.notificationService.showMessage(error.error.detail);
            } else {
              this.notificationService.showMessage('Failed to add new template');
            }
          }
        )
      }
    })
  }
}
