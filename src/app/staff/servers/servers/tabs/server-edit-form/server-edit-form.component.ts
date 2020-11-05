import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IServerModel } from '@fleio-api/servers/model/server.model';
import { IServerCreateOptionsModel } from '@fleio-api/servers/model/server-create-options.model';
import { ServersApiService } from '@fleio-api/servers/servers-api.service';
import { IServerPluginModel } from '@fleio-api/servers/model/server-plugin.model';

@Component({
  selector: 'app-server-edit-form',
  templateUrl: './server-edit-form.component.html',
  styleUrls: ['./server-edit-form.component.scss']
})
export class ServerEditFormComponent extends DetailsFormBase<IServerModel> implements OnInit {
  serverForm = this.formBuilder.group({
    name: ['', Validators.required],
    group: ['', Validators.required],
    status: ['', Validators.required],
    plugin: ['', Validators.required],

    hosting_server_settings: this.formBuilder.group({
      hostname: [''],
      port: [0, [Validators.min(0), Validators.max(65535)]],
      secure: [true],
      username: [''],
      password: [''],
      api_token: [''],
      max_accounts: [0, Validators.min(0)],
      status_url: [''],
      location: [''],
    }),
  });

  createOptions: IServerCreateOptionsModel;
  pluginCtrl = this.serverForm.controls.plugin;
  selectedPlugin: IServerPluginModel;

  constructor(
    private formBuilder: FormBuilder,
    private serversApiService: ServersApiService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.serverActions();
      this.createOptions = this.objectController.additionalObjects.createOptions;
    }

    this.pluginCtrl.valueChanges.subscribe(value => {
      this.selectedPlugin = this.createOptions.plugins.find(plugin => plugin.id === value);
    })

    if (this.object && this.object.id) {
      this.serverForm.patchValue(this.object);
    } else {
      if (this.createOptions) {
        this.serverForm.patchValue(
          {
            group: this.createOptions.groups[0].id,
            status: 'enabled',
            plugin: this.createOptions.plugins[0].id,
          }
        );
      }
    }
  }

  serverActions(): Observable<IActionResult> {
    const value = this.serverForm.value as IServerModel;

    this.createOrUpdate(
      this.serversApiService,
      value,
    ).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('servers/servers')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
