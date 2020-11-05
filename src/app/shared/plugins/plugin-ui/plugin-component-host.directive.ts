import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { IPluginComponent } from '../interfaces/plugin-component';

@Directive({
  selector: '[appPluginComponentHost]'
})
export class PluginComponentHostDirective implements OnInit {
  @Input() component;
  @Input() data: object;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(componentFactory)
    const componentInstance = componentRef.instance as IPluginComponent;
    componentInstance.data = this.data;
  }
}
