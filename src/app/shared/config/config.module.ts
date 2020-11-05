import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ConfigModule {
  constructor(private router: Router, private config: ConfigService) {
    this.config.subscribeToRouterEvents(router);
  }

}
