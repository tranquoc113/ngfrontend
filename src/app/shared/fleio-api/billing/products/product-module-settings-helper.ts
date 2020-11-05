import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductModuleSettingsHelper {
  moduleSettingsFormMap = {
    openstack: 'openstack_product_settings',
    todo: 'todo_product_settings',
    cpanel: 'cpanel_product_settings',
    cpanelserver: 'cpanelserver_product_settings',
  }
  moduleSettings: {};
  form: FormGroup;
  mainFormSubmitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  observableMainFormSubmitted: Observable<boolean> = this.mainFormSubmitted.asObservable();
}
