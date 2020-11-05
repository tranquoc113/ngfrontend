import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IBaseFleioObjectModel } from '../../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '../../../../../shared/fleio-api/fleio-objects-list';
import { CurrenciesApiService } from '../../../../../shared/fleio-api/core/currencies-api.service';
import { ICurrencyModel } from '../../../../../shared/fleio-api/billing/model/currency.model';
import { CallbackAction } from '../../../../../shared/ui/objects-view/actions/callback-action';
import { IActionResult } from '../../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { Observable } from 'rxjs';
import { IAction } from '../../../../../shared/ui/objects-view/interfaces/actions/action';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditCurrencyDialogComponent } from './dialogs/edit-currency-dialog/edit-currency-dialog.component';
import { ICurrencyCreateOptions } from '../../../../../shared/fleio-api/billing/model/currency-create-options';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent
  extends DetailsComponentBase<IBaseFleioObjectModel> implements OnDestroy {

  public loadingCurrencies: boolean;
  public currencies: FleioObjectsList<ICurrencyModel>;
  public currencyActions: { [code: string]: IAction[] };
  private createOptions: ICurrencyCreateOptions;

  constructor(
    private currenciesApiService: CurrenciesApiService, private matDialog: MatDialog,
    private notificationService: NotificationService,
  ) {
    super();
  }

  protected initTabData() {
    this.loadingCurrencies = true;
    this.currenciesApiService.list().subscribe((currencyList) => {
      this.currencies = currencyList;
      this.currencyActions = {};
      for (const currency of this.currencies.objects) {
        this.currencyActions[currency.code] = this.getCurrencyActions(currency);
      }
    });
    this.currenciesApiService.createOptions({}).subscribe(createOptions => {
      this.createOptions = createOptions as ICurrencyCreateOptions;
    })
    this.loadingCurrencies = false;
  }

  createCurrency() {
    return this.matDialog.open(
      EditCurrencyDialogComponent, {
        data: {
          currency: null,
          createOptions: this.createOptions,
          autoFocus: false,
        }
      }).afterClosed().subscribe(() => {
      this.initTabData();
    })
  }

  updateExchangeRates() {
    this.notificationService.confirmDialog(
      {
        title: 'Update exchange rates',
        message: 'Do you want to update exchange rates?'
      }
    ).subscribe(result => {
      if (result === 'yes') {
        this.currenciesApiService.updateExchangeRates().subscribe(() => {
          this.initTabData();
          this.notificationService.showMessage('Exchange rates updated');
        })
      }
    })
  }

  updateRelativePrices() {
    this.notificationService.confirmDialog(
      {
        title: 'Update relative prices',
        message: 'Do you want to update relative prices?'
      }
    ).subscribe(result => {
      if (result === 'yes') {
        this.currenciesApiService.updateRelativePrices().subscribe(() => {
          this.initTabData();
          this.notificationService.showMessage('Relative prices updated.');
        })
      }
    })
  }

  editCurrency(action: CallbackAction): Observable<IActionResult> {
    return this.matDialog.open(
      EditCurrencyDialogComponent, {
        data: {
          currency: action.object,
          createOptions: this.createOptions,
        },
        autoFocus: false,
      }).afterClosed().pipe(map(() => {
        this.initTabData();
        return {message: 'Currency updated'};
      }
    ))
  }

  deleteCurrency(action: CallbackAction): Observable<IActionResult> {
    const currency = action.object as ICurrencyModel;
    return this.currenciesApiService.delete(currency.code).pipe(catchError(map(() => {
      return {message: 'Failed to delete currency'};
    }))).pipe(map(() => {
      this.initTabData();
      return {message: 'Currency deleted'};
    }));
  }

  getCurrencyActions(currency: ICurrencyModel): IAction[] {
    const actions = [
      new CallbackAction({
        object: currency,
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit',
        callback: action => {
          return this.editCurrency(action)
        },
      })
    ];

    if (!currency.is_default) {
      actions.push(
        new CallbackAction({
          object: currency,
          icon: {name: 'delete', class: 'fl-icons'},
          name: 'Delete',
          tooltip: 'Delete',
          confirmOptions: {
            confirm: true,
            message: `Are you sure you want to delete currency ${currency.code}?`,
            title: `Delete ${currency.code} currency`,
          },
          options: {
            displayConfirmation: true,
            displayMessages: true,
          },
          callback: action => {
            return this.deleteCurrency(action)
          },
        }));
    }

    return actions;
  }
}
