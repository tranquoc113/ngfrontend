import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { DecimalPipe } from '@angular/common';
import { ConfigService } from '@shared/config/config.service';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';

export interface IGraphPeriod {
  label: string;
  value: string;
}

@Component({
  selector: 'app-instance-details-metrics',
  templateUrl: './instance-details-metrics.component.html',
  styleUrls: ['./instance-details-metrics.component.scss']
})
export class InstanceDetailsMetricsComponent extends DetailsComponentBase<IInstanceModel> implements OnInit {
  private readonly decimalPipe: DecimalPipe;
  @ViewChild('packetsGraph') packetsGraph: ElementRef;
  @ViewChild('bytesGraph') bytesGraph: ElementRef;
  @ViewChild('cpuGraph') cpuGraph: ElementRef;
  instanceId: string;
  metricType = 'net';
  graphPeriods: IGraphPeriod[];
  graphPeriod: string;
  loadingGraphs = true;
  packetsGraphChart: Chart;
  bytesGraphChart: Chart;
  cpuGraphChart: Chart;

  // metrics for ports
  packetsDataIn = [];
  packetsDataOut = [];
  bytesDataIn = [];
  bytesDataOut = [];
  portLabels = [];

  // metrics for cpu
  cpuLabels = [];
  cpuData = [];

  canvasHeights: {
    packets: string;
    bytes: string;
    cpu: string;
  };

  private static transformValues(value, decimals, sizes) {
    const dm = decimals || 2;
    if (value <= 1) {
      return value.toFixed(dm) + ' ' + sizes[0];
    }
    const k = 1000;
    const i = Math.floor(Math.log(value) / Math.log(k));
    return parseFloat((value / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  private static getTimeUnit(hours: string): string {
    if (hours === '1') {
      return 'minute';
    } else if (hours === '24') {
      return 'hour';
    } else if (hours === '168') {
      return 'day';
    } else if (hours === '720') {
      return 'day';
    } else {
      return 'hour';
    }
  }

  cpuGraphOptions(hours: string) {
    return {
      elements: {
        line: {
          tension: 0
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
          label: (tooltipItems) => {
            return 'CPU utilization ' + this.decimalPipe.transform(tooltipItems.yLabel, '1.1-2') + '%';
          },
          title: (tooltipItems) => {
            return tooltipItems[0].xLabel;
          }
        }
      },
      scales: {
        xAxes: [{
          type: 'time',
          position: 'bottom',
          ticks: {
            autoSkip: true,
            maxTicksLimit: 12,
            maxRotation: 0
          },
          time: {
            unit: InstanceDetailsMetricsComponent.getTimeUnit(hours),
            displayFormats: {
              week: 'll'
            }
          }
        }],
        yAxes: [{
          type: 'linear',
          unit: '%',
          ticks: {
            suggestedMax: 100,
            suggestedMin: 0,
            callback: (value) => {
              return this.decimalPipe.transform(value, '1.0-0') + '%';
            }
          }
        }]
      }
    }
  };

  netGraphOptions(sizes: string[], hours: string) {
    return {
      elements: {
        line: {
          tension: 0
        }
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'time',
          position: 'bottom',
          ticks: {
            autoSkip: true,
            maxTicksLimit: 12,
            maxRotation: 0
          },
          time: {
            unit: InstanceDetailsMetricsComponent.getTimeUnit(hours),
            displayFormats: {
              week: 'll'
            }
          }
        }],
        yAxes: [{
          type: 'linear',
          ticks: {
            beginAtZero: true,
            callback: (value) => {
              return InstanceDetailsMetricsComponent.transformValues(value, 3,
                ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']);
            }
          }
        }]
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: (tooltipItems) => {
            if (tooltipItems.datasetIndex === 0) {
              return InstanceDetailsMetricsComponent.transformValues(tooltipItems.yLabel, 2,
                sizes) + ' ' + 'in';
            } else {
              return InstanceDetailsMetricsComponent.transformValues(tooltipItems.yLabel, 2,
                sizes) + ' ' + 'out';
            }
          }
        },
        title: (tooltipItems) => {
          return tooltipItems[0].xLabel;
        }
      }
    };
  }

  constructor(private instancesApiService: InstancesApiService, private activatedRoute: ActivatedRoute,
              private config: ConfigService) {
    super();
    this.decimalPipe = new DecimalPipe(this.config.locale);
  }

  public reloadMetrics() {
    if (this.metricType === 'net') {
      if (this.cpuGraphChart) {
        this.cpuGraphChart.destroy();
      }
      this.canvasHeights.packets = '320';
      this.canvasHeights.bytes = '320';
      this.canvasHeights.cpu = '0';
      this.loadNetworkMetrics(true);
    } else {
      if (this.packetsGraphChart) {
        this.packetsGraphChart.destroy();
      }
      if (this.bytesGraphChart) {
        this.bytesGraphChart.destroy();
      }
      this.canvasHeights.packets = '0';
      this.canvasHeights.bytes = '0';
      this.canvasHeights.cpu = '320';
      this.loadCpuMetrics(false);
    }
  }

  public changedPeriod(event) {
    this.graphPeriod = event.value;
    if (this.metricType === 'net') {
      this.loadNetworkMetrics(true);
    } else {
      this.loadCpuMetrics(true);
    }
  }

  private loadNetworkMetrics(updateGraph: boolean) {
    this.loadingGraphs = true;
    this.instancesApiService.objectGetAction(
      this.instanceId,
      'measures',
      {
        hours: this.graphPeriod,
        metric: 'interface_traffic'
      }).pipe().subscribe((response) => {
        this.portLabels = [];
        this.packetsDataIn = [];
        this.packetsDataOut = [];
        this.bytesDataIn = [];
        this.bytesDataOut = [];
        for (const measure of response.measures) {
          this.portLabels.push(measure.date);
          this.packetsDataIn.push(measure.packets_in);
          this.packetsDataOut.push(measure.packets_out);
          this.bytesDataIn.push(measure.bytes_in);
          this.bytesDataOut.push(measure.bytes_out);
        }
        if (updateGraph) {
          if (this.bytesGraphChart) {
            this.bytesGraphChart.destroy();
          }
          if (this.packetsGraphChart) {
            this.packetsGraphChart.destroy();
          }
        }
        const packetsGraphCtx = this.packetsGraph.nativeElement.getContext('2d');
        this.packetsGraphChart = new Chart(packetsGraphCtx, {
          type: 'line',
          data: {
            labels: this.portLabels,
            datasets: [
              {
                borderColor : 'rgba(151,187,205,1)',
                backgroundColor: 'rgba(151,187,205,0.2)',
                borderWidth : '1',
                label: 'Packets in',
                data: this.packetsDataIn,
              },
              {
                borderColor : 'rgba(220,220,220,1)',
                backgroundColor: 'rgba(220,220,220,0.2)',
                borderWidth : '1',
                label: 'Packets out',
                data: this.packetsDataOut,
              }
            ]
          },
          options: this.netGraphOptions(['Packets', 'KiloPackets', 'MegaPackets', 'GigaPackets', 'TeraPackets',
            'PetaPackets', 'ExaPackets', 'ZettaPackets', 'YottaPackets'], this.graphPeriod)
        });
        const bytesGraphCtx = this.bytesGraph.nativeElement.getContext('2d');
        this.bytesGraphChart = new Chart(bytesGraphCtx, {
          type: 'line',
          data: {
            labels: this.portLabels,
            datasets: [
              {
                borderColor : 'rgba(151,187,205,1)',
                backgroundColor: 'rgba(151,187,205,0.2)',
                borderWidth : '1',
                label: 'Bytes in',
                data: this.bytesDataIn,
              },
              {
                borderColor : 'rgba(220,220,220,1)',
                backgroundColor: 'rgba(220,220,220,0.2)',
                borderWidth : '1',
                label: 'Bytes out',
                data: this.bytesDataOut,
              }
            ]
          },
          options: this.netGraphOptions(
            ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], this.graphPeriod
          )
        });
        this.loadingGraphs = false;
    });
  }

  private loadCpuMetrics(updateGraph: boolean) {
    this.loadingGraphs = true;
    this.instancesApiService.objectGetAction(
      this.instanceId,
      'measures',
      {
        hours: this.graphPeriod,
        metric: 'cpu_util'
      }).pipe().subscribe((response) => {
        this.cpuLabels = [];
        this.cpuData = [];
        for (const measure of response.measures) {
          this.cpuLabels.push(measure.date);
          this.cpuData.push(measure.value);
        }
        if (updateGraph) {
          if (this.cpuGraphChart) {
            this.cpuGraphChart.destroy();
          }
        }
        const cpuGraphCtx = this.cpuGraph.nativeElement.getContext('2d');
        this.cpuGraphChart = new Chart(cpuGraphCtx, {
          type: 'line',
          data: {
            labels: this.portLabels,
            datasets: [
              {
                borderColor : 'rgba(151,187,205,1)',
                backgroundColor: 'rgba(151,187,205,0.2)',
                borderWidth : '1',
                label: 'CPU',
                data: this.cpuData,
              },
            ]
          },
          options: this.cpuGraphOptions(this.graphPeriod)
        });
        this.loadingGraphs = false;
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.graphPeriods = [
      {
        label: 'Last hour',
        value: '1'
      }, {
        label: '24 hours',
        value: '24'
      }, {
        label: '7 days',
        value: '168'
      }, {
        label: '30 days',
        value: '720'
      }
    ];
    this.graphPeriod = this.graphPeriods[0].value;
    this.canvasHeights = {
      packets: '320',
      bytes: '320',
      cpu: '0'
    };
    if (this.object) {
      this.instanceId = this.object.id as string;
    }
    if (this.objectController) {
      this.objectController.currentTabIndex$.subscribe(newTabIndex => {
        if (newTabIndex === this.componentTabIndex) {
          this.reloadMetrics();
        }
      });
    }
  }

}
