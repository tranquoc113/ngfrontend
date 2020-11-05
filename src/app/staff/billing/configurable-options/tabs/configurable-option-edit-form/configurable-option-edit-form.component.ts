import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IConfigOptionModel } from '@fleio-api/billing/model/config-option.model';
import { ConfigurableOptionsApiService } from '@fleio-api/billing/configurable-options/configurable-option-api.service';
import { IConfigurableOptionCreateOptionsModel } from '@fleio-api/billing/model/configurable-option-create-options.model';
import { IAction } from '@objects-view/interfaces/actions/action';
import { MatDialog } from '@angular/material/dialog';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IConfigurableOptionCycleModel } from '@fleio-api/billing/model/configurable-option-cycle.model';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { ConfigurableOptionsCycleApiService } from '@fleio-api/billing/configurable-options/configurable-option-cycle-api.service';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { map } from 'rxjs/operators';
import { EditOptionCycleDialogComponent } from '../../dialogs/edit-option-cycle-dialog/edit-option-cycle-dialog.component';
import { IConfigurableOptionChoiceModel } from '@fleio-api/billing/model/configurable-option-choice.model';
import { EditOptionChoiceDialogComponent } from '../../dialogs/edit-option-choice-dialog/edit-option-choice-dialog.component';
import { ConfigurableOptionsChoiceApiService } from '@fleio-api/billing/configurable-options/configurable-option-choice-api.service';

@Component({
  selector: 'app-configurable-option-edit-form',
  templateUrl: './configurable-option-edit-form.component.html',
  styleUrls: ['./configurable-option-edit-form.component.scss']
})
export class ConfigurableOptionEditFormComponent extends DetailsFormBase<IConfigOptionModel> implements OnInit {
  configurableOptionForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    help_text: [''],
    widget: ['', Validators.required],
    status: ['', Validators.required],
    required: [false],
    settings: ['{}'],
  });
  createOptions: IConfigurableOptionCreateOptionsModel;
  cycleActions: { [key: string]: IAction[] };
  hasChoices = false;
  choices: IConfigurableOptionChoiceModel[];
  choiceActions: { [key: string]: IAction[] };

  constructor(
    private formBuilder: FormBuilder,
    private configurableOptionsApiService: ConfigurableOptionsApiService,
    private router: Router,
    private config: ConfigService,
    private matDialog: MatDialog,
    private refreshService: RefreshService,
    private configurableOptionsCycleApiService: ConfigurableOptionsCycleApiService,
    private configurableOptionsChoiceApiService: ConfigurableOptionsChoiceApiService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = (action: IAction) => this.configurableOptionActions(action);
      this.createOptions =
        this.objectController.additionalObjects.createOptions as IConfigurableOptionCreateOptionsModel;
      this.objectController.dataChanged$.subscribe(() => {
        this.updateData();
      })
    }

    if (this.object) {
      this.configurableOptionForm.patchValue(this.object);
      this.updateData();
    }
  }

  updateData() {
    this.hasChoices = ['drop', 'radio'].includes(this.object.widget)
    this.cycleActions = {};
    this.choiceActions = {};

    if (this.hasChoices) {
      this.choices = this.object.choices;
    } else {
      this.choices = [{
        choice: '',
        label: '',
        cycles: this.object.cycles,
        option: this.object.id
      }];
    }

    for (const choice of this.choices) {
      for (const cycle of choice.cycles) {
        this.cycleActions[`${choice.id}_${cycle.id}`] = this.getCycleActions(choice, cycle);
      }

      if (this.hasChoices) {
        this.choiceActions[choice.id] = this.getChoiceActions(choice);
      }
    }
  }

  getCycleActions(choice: IConfigurableOptionChoiceModel, cycle: IConfigurableOptionCycleModel): IAction[] {
    const actions = [];

    actions.push(new ApiCallAction(
      {
        object: cycle,
        icon: {name: 'delete'},
        tooltip: 'Delete cycle',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete cycle',
          message: `Are you sure you want to delete cycle ${cycle.display_name}?`
        },
        successMessage: 'Configurable option cycle deleted',
        errorMessage: 'Failed to delete configurable option cycle, check logs for details',
        apiService: this.configurableOptionsCycleApiService,
        callType: CallType.Delete,
        refreshAfterExecute: true,
      }
    ));

    actions.push(new CallbackAction(
      {
        object: this.object,
        icon: {name: 'edit'},
        tooltip: 'Edit cycle',
        name: 'Edit',
        refreshAfterExecute: true,
        callback: () => {
          return this.matDialog.open(
            EditOptionCycleDialogComponent, {
              data: {
                createOptions: this.createOptions,
                option: this.object,
                cycle,
                choice,
              }
            }).afterClosed().pipe(map(() => {
            return null;
          }))
        }
      }
    ));

    return actions;
  }

  getChoiceActions(choice: IConfigurableOptionChoiceModel): IAction[] {
    const actions = [];

    actions.push(new ApiCallAction(
      {
        object: choice,
        icon: {name: 'delete'},
        tooltip: 'Delete choice',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete choice',
          message: `Are you sure you want to delete choice ${choice.label}?`
        },
        successMessage: 'Configurable option choice deleted',
        errorMessage: 'Failed to delete configurable option choice, check logs for details',
        apiService: this.configurableOptionsChoiceApiService,
        callType: CallType.Delete,
        refreshAfterExecute: true,
      }
    ));

    actions.push(new CallbackAction(
      {
        object: this.object,
        icon: {name: 'edit'},
        tooltip: 'Edit choice',
        name: 'Edit',
        refreshAfterExecute: true,
        callback: () => {
          return this.matDialog.open(
            EditOptionChoiceDialogComponent, {
              data: {
                option: this.object,
                choice,
              }
            }).afterClosed().pipe(map(() => {
            return null;
          }))
        }
      }
    ));

    return actions;
  }

  configurableOptionActions(action: IAction): Observable<IActionResult> {
    const value = this.configurableOptionForm.value as IConfigOptionModel;

    this.createOrUpdate(
      this.configurableOptionsApiService,
      value,
    ).subscribe((configOption: IConfigOptionModel) => {
      if (action.name === 'Create and continue') {
        this.router.navigateByUrl(
          this.config.getPanelUrl(`billing/configurable-options/${configOption.id}`)
        ).catch(() => {
        });
      } else {
        this.refreshService.refresh();
        this.configurableOptionForm.markAsPristine();
      }
    });

    return of(null);
  }

  addCycle(choice: IConfigurableOptionChoiceModel) {
    return this.matDialog.open(
      EditOptionCycleDialogComponent, {
        data: {
          createOptions: this.createOptions,
          option: this.object,
          choice,
        }
      }).afterClosed().subscribe(result => {
      this.refreshService.refresh();
      if (!result) {
        return;
      }
      return of(null);
    });
  }

  addChoice() {
    return this.matDialog.open(
      EditOptionChoiceDialogComponent, {
        data: {
          option: this.object,
        }
      }).afterClosed().subscribe(result => {
      this.refreshService.refresh();
      if (!result) {
        return;
      }
      return of(null);
    });
  }
}
