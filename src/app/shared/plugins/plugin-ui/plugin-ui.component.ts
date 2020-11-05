import { Component, Input, OnInit } from '@angular/core';
import { IPluginModel } from '../../fleio-api/core/model/plugin.model';
import { PluginsComponentsRegistryService } from '../plugins-components-registry.service';

@Component({
  selector: 'app-plugin-ui',
  templateUrl: './plugin-ui.component.html',
  styleUrls: ['./plugin-ui.component.scss']
})
export class PluginUIComponent implements OnInit {
  @Input() plugin?: IPluginModel;
  @Input() pluginName: string;
  @Input() panelName: string;
  @Input() componentName: string;
  @Input() componentData: object;

  public component: Component;

  constructor(private componentsRegistry: PluginsComponentsRegistryService) {
  }

  ngOnInit(): void {
    if (!this.pluginName) {
      if (this.plugin) {
        this.pluginName = this.plugin.app_label;
      } else {
        console.error('This components needs plugin name or plugin parameter')
      }
    }
    this.component = this.componentsRegistry.getComponent(this.pluginName, this.panelName, this.componentName);
  }
}
