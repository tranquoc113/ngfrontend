import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../config/config.service';

@Component({
  selector: 'app-hello-user-button',
  templateUrl: './hello-user-button.component.html',
  styleUrls: ['./hello-user-button.component.scss']
})
export class HelloUserButtonComponent implements OnInit {
  @Input() panel: string;
  constructor(public authService: AuthService, private router: Router, public config: ConfigService) { }

  ngOnInit() {
  }

}
