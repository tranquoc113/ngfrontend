import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlavorsApiService } from '@fleio-api/openstack/flavor/flavors-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { WidgetChartService } from '../widget-chart.service';
import { Chart } from 'chart.js';
import { IFlavorsSummary } from '@fleio-api/openstack/summary/model/flavors-summary.model';

@Component({
  selector: 'app-flavors-panel',
  templateUrl: './flavors-panel.component.html',
  styleUrls: ['./flavors-panel.component.scss']
})
export class FlavorsPanelComponent implements OnInit {
  @ViewChild('flavorGraph') flavorGraph: ElementRef;
  @ViewChild('legend') legend: ElementRef;
  summary: IFlavorsSummary;
  options = WidgetChartService.options('Flavor distribution', 'flavor-doughnut-legend');
  flavorGraphChart: Chart;

  constructor(
    private flavorsApiService: FlavorsApiService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.flavorsApiService.getSummary().subscribe(response => {
      this.summary = response;
      this.createChart();
    }, error => {
      this.notificationService.showMessage('Failed to load operating systems summary.');
    });
  }

  createChart() {
    const flavorGraphCtx = this.flavorGraph.nativeElement.getContext('2d');
    this.flavorGraphChart = new Chart(flavorGraphCtx, {
      type: 'doughnut',
      data: {
        labels: this.summary.flavor_labels,
        datasets: [
          {
            backgroundColor: WidgetChartService.getColor,
            data: this.summary.flavor_data,
          },
        ]
      },
      options: this.options
    });
    this.legend.nativeElement.innerHTML = this.options.legendCallback(this.flavorGraphChart);
  }

}
