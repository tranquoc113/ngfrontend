import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WidgetChartService } from '../widget-chart.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { Chart } from 'chart.js';
import { OpenstackSummaryApiService } from '@fleio-api/openstack/summary/openstack-summary-api.service';
import { IHypervisorsSummaryResponse } from '@fleio-api/openstack/summary/model/hypervisors-summary.model';
import { IHypervisorSummary } from '@fleio-api/openstack/summary/model/hypervisor-summary.model';

@Component({
  selector: 'app-hypervisors-panel',
  templateUrl: './hypervisors-panel.component.html',
  styleUrls: ['./hypervisors-panel.component.scss']
})
export class HypervisorsPanelComponent implements OnInit {
  @ViewChild('memoryGraph') memoryGraph: ElementRef;
  @ViewChild('legendMemory') legendMemory: ElementRef;
  @ViewChild('diskGraph') diskGraph: ElementRef;
  @ViewChild('legendDisk') legendDisk: ElementRef;
  @ViewChild('vcpuGraph') vcpuGraph: ElementRef;
  @ViewChild('legendVcpu') legendVcpu: ElementRef;
  summary: IHypervisorsSummaryResponse;
  selectedHypervisorSummary: IHypervisorSummary;
  memoryOptions = WidgetChartService.options(
    'Hypervisor memory',
    'hypervisor-memory-doughnut-legend'
  );
  memoryGraphChart: Chart;
  diskOptions = WidgetChartService.options(
    'Disk',
    'disk-doughnut-legend'
  );
  diskGraphChart: Chart;
  vcpusOptions = WidgetChartService.options(
    'vCPUs',
    'vcpus-doughnut-legend'
  );
  vcpusGraphChart: Chart;
  selectedTab = 0;

  constructor(
    private openstackSummaryApiService: OpenstackSummaryApiService,
    private notificationService: NotificationService
  ) { }

  loadData() {
    this.openstackSummaryApiService.getHypervisorsSummary().subscribe(response => {
      this.summary = response;
      if (this.summary && this.summary.hypervisors && this.summary.hypervisors.length) {
        this.selectedHypervisorSummary = this.summary.hypervisors[0];
      }
      this.createChart();
    }, error => {
      this.notificationService.showMessage('Failed to load hypervisors summary.');
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  newHypervisorSelected() {
    this.updateChart(
      this.memoryGraphChart,
      this.selectedHypervisorSummary.memory_labels,
      this.selectedHypervisorSummary.memory_data,
    );
    this.updateChart(
      this.diskGraphChart,
      this.selectedHypervisorSummary.disk_labels,
      this.selectedHypervisorSummary.disk_data,
    );
    this.updateChart(
      this.vcpusGraphChart,
      this.selectedHypervisorSummary.vcpus_labels,
      this.selectedHypervisorSummary.vcpus_data,
    );
  }

  updateChart(chart: Chart, labels: Array<string>, data: Array<number>) {
    chart.data.labels = labels;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    chart.update();
  }

  createChart() {
    const memoryGraphCtx = this.memoryGraph.nativeElement.getContext('2d');
    if (this.selectedHypervisorSummary) {
      this.memoryGraphChart = new Chart(memoryGraphCtx, {
        type: 'doughnut',
        data: {
          labels: this.selectedHypervisorSummary.memory_labels,
          datasets: [
            {
              backgroundColor: WidgetChartService.getColor,
              data: this.selectedHypervisorSummary.memory_data,
            },
          ]
        },
        options: this.memoryOptions
      });
      this.legendMemory.nativeElement.innerHTML = this.memoryOptions.legendCallback(this.memoryGraphChart);
    }
    const diskGraphCtx = this.diskGraph.nativeElement.getContext('2d');
    if (this.selectedHypervisorSummary) {
      this.diskGraphChart = new Chart(diskGraphCtx, {
        type: 'doughnut',
        data: {
          labels: this.selectedHypervisorSummary.disk_labels,
          datasets: [
            {
              backgroundColor: WidgetChartService.getColor,
              data: this.selectedHypervisorSummary.disk_data,
            },
          ]
        },
        options: this.diskOptions
      });
      this.legendDisk.nativeElement.innerHTML = this.diskOptions.legendCallback(this.diskGraphChart);
    }
    const vcpusGraphCtx = this.vcpuGraph.nativeElement.getContext('2d');
    if (this.selectedHypervisorSummary) {
      this.vcpusGraphChart = new Chart(vcpusGraphCtx, {
        type: 'doughnut',
        data: {
          labels: this.selectedHypervisorSummary.vcpus_labels,
          datasets: [
            {
              backgroundColor: WidgetChartService.getColor,
              data: this.selectedHypervisorSummary.vcpus_data,
            },
          ]
        },
        options: this.vcpusOptions
      });
      this.legendVcpu.nativeElement.innerHTML = this.vcpusOptions.legendCallback(this.vcpusGraphChart);
    }
  }

}
