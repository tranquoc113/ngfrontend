import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { IObjectController } from '../interfaces/object-controller';
import { DetailsComponentBase } from '../details-component-base';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IAction } from '@objects-view/interfaces/actions/action';

@Directive({
  selector: '[appComponentHost]'
})
export class ComponentHostDirective implements OnInit {
  @Input() component;
  @Input() objectController: IObjectController;
  @Input() componentTabIndex: number;
  @Input() data?: {};
  @Input() detailsActions?: Array<IAction>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    if (this.objectController) {
      const componentInstance = componentRef.instance as DetailsComponentBase<IBaseFleioObjectModel>;
      componentInstance.objectController = this.objectController;
      componentInstance.componentTabIndex = this.componentTabIndex;
      componentInstance.data = this.data;
      componentInstance.detailsActions = this.detailsActions;
    }
  }
}
