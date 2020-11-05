import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IObjectListController } from '../interfaces/object-list-controller';
import { ITableData } from '../interfaces/table-data/table-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { IOrdering } from '@shared/ui-api/interfaces/route-config/ordering';
import { OrderingService } from '@shared/ui-api/ordering.service';
import { OrderingHelper } from '@shared/ui-api/helpers/ordering-helper';
import { ITableRow } from '../interfaces/table-data/table-row';
import { ColumnType, IColumnDefinition } from '../interfaces/table-data/column-definition';
import { LineDirection } from '../status-line/status-line.component';
import { Subscription } from 'rxjs';
import { state, style, trigger } from '@angular/animations';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { AppColor } from '../../common/enums/app-color.enum';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0', minHeight: '0', overflow: 'hidden'})),
      state('expanded', style({height: '*', overflow: 'visible'})),
      // transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListViewComponent implements OnInit, OnDestroy {
  @Input() objectsListController: IObjectListController;
  @ViewChild(MatSort) matSort: MatSort;

  public tableData: ITableData;
  public tableDataSource: MatTableDataSource<ITableRow>;
  private orderOptions: IOrdering[];
  public activeOrdering: Sort;
  private tableDataSubscription: Subscription;
  private orderingSubscription: Subscription;

  public ColumnType = ColumnType;
  public LineDirection = LineDirection;
  public expandedObjectId: FleioId | null = null;
  public LineColor = AppColor;

  constructor(private orderingService: OrderingService) {
  }

  ngOnInit() {
    this.orderingSubscription = this.orderingService.ordering$.subscribe(ordering => {
      if (ordering) {
        this.activeOrdering = OrderingHelper.toSort(ordering.default);
        this.orderOptions = ordering.options;
      } else {
        this.activeOrdering = {active: null, direction: null};
        this.orderOptions = [];
      }
    });
    if (this.objectsListController) {
      this.tableDataSubscription = this.objectsListController.tableData$.subscribe(tableData => {
        if (tableData) {
          // add status column
          if (tableData.header.showStatus && !tableData.header.columnNames.includes('(status)')) {
            tableData.header.columns.unshift({
              type: ColumnType.Status,
              displayName: null,
              fieldName: '(status)',
              enableSort: false,
              flex: 'none',
            });
            tableData.header.columnNames.unshift('(status)');
          }

          // adjust visible actions count
          if (typeof tableData.header.visibleActions !== 'number') {
            tableData.header.visibleActions = 4;
          }

          // adjust flex and hide settings
          for (const column of tableData.header.columns) {
            column.flex = column.flex || undefined;
            column.flexXs = column.flexXs || column.flex;
            column.flexGtMd = column.flexGtMd || column.flex;
            if (column.hide) {
              if (typeof column.hide === 'string') {
                const key = column.hide as string;
                column.hide = {};
                column.hide[key] = true;
              }
            } else {
              column.hide = {};
            }
          }

          this.tableDataSource = new MatTableDataSource(tableData.rows);
          this.tableData = tableData;
        } else {
          this.tableData = null;
        }
      });
    } else {
      console.error('Cannot receive table data due to missing objectsListController');
    }
  }

  sort(sortData: Sort) {
    this.orderingService.orderBy(OrderingHelper.fromSort(sortData));
  }

  ngOnDestroy(): void {
    if (this.tableDataSubscription) {
      this.tableDataSubscription.unsubscribe();
      this.tableDataSubscription = null;
    }
    if (this.orderingSubscription) {
      this.orderingSubscription.unsubscribe();
      this.orderingSubscription = null;
    }
  }

  toggleRowDetails(row: ITableRow, column: IColumnDefinition) {
    if (column.type !== ColumnType.Actions) {
      if (this.tableData.expandableRows && row.expandable) {
        this.expandedObjectId = this.expandedObjectId === row.object.id ? null : row.object.id;
      }
    }
  }
}
