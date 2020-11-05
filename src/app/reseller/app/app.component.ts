import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ConfigService } from '../../shared/config/config.service';
import { TitleBuilder } from '../../shared/ui-api/helpers/title-builder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private titleService: Title,
    private config: ConfigService,
    private activatedRoute: ActivatedRoute
  ) {
    new TitleBuilder(titleService, router, config, activatedRoute).build();
  }
}
