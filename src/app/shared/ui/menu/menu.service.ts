import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public expandedMenuItemContainer?: string = null;

  constructor() { }
}
