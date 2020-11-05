import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OpenstackSummaryApiService } from '@fleio-api/openstack/summary/openstack-summary-api.service';
import { IOperatingSystemsSummary } from '@fleio-api/openstack/summary/model/operating-systems-summary.model';
import { NotificationService } from '@shared/ui-api/notification.service';
import { WidgetChartService } from '../widget-chart.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-operating-systems-panel',
  templateUrl: './operating-systems-panel.component.html',
  styleUrls: ['./operating-systems-panel.component.scss']
})
export class OperatingSystemsPanelComponent implements OnInit {
  @ViewChild('osGraph') osGraph: ElementRef;
  @ViewChild('legend') legend: ElementRef;
  summary: IOperatingSystemsSummary;
  options = WidgetChartService.options('Operating system distribution', 'os-doughnut-legend');
  osGraphChart: Chart;

  constructor(
    private openstackSummaryApiService: OpenstackSummaryApiService,
    private notificationService: NotificationService
  ) { }

  loadData() {
    this.openstackSummaryApiService.getOperatingSystemsSummary().subscribe(response => {
      this.summary = response;
      this.createChart();
    }, error => {
      this.notificationService.showMessage('Failed to load operating systems summary.');
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  createChart() {
    const osGraphCtx = this.osGraph.nativeElement.getContext('2d');
    this.osGraphChart = new Chart(osGraphCtx, {
      type: 'doughnut',
      data: {
        labels: this.summary.os_labels,
        datasets: [
          {
            backgroundColor: WidgetChartService.getColor,
            data: this.summary.os_data,
          },
        ]
      },
      options: this.options
    });
    this.legend.nativeElement.innerHTML = this.options.legendCallback(this.osGraphChart);
  }

}
