import { Component, OnInit } from '@angular/core';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';

export interface IConsoleOutPut {
  console_text: string;
  length: number;
}

@Component({
  selector: 'app-instance-details-system-log',
  templateUrl: './instance-details-system-log.component.html',
  styleUrls: ['./instance-details-system-log.component.scss']
})
export class InstanceDetailsSystemLogComponent extends DetailsComponentBase<IInstanceModel> implements OnInit {
  consoleOutput: IConsoleOutPut;
  instanceId: string;
  loading = false;
  length = 30;
  constructor(private instancesApiService: InstancesApiService) {
    super();
  }

  public changedLength() {
    this.refreshConsoleOutput();
  }

  public refreshConsoleOutput() {
    this.loading = true;
    this.instancesApiService.objectGetAction(
      this.instanceId,
      'get_console_output',
      {
        length: this.length
      }
      ).pipe().subscribe((response: IConsoleOutPut) => {
        this.loading = false;
        this.consoleOutput = response;
    });
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.object) {
      this.instanceId = this.object.id as string;
    }
    if (this.objectController) {
      this.objectController.currentTabIndex$.subscribe(newTabIndex => {
        if (newTabIndex === this.componentTabIndex) {
          this.refreshConsoleOutput();
        }
      });
    }
  }

}
