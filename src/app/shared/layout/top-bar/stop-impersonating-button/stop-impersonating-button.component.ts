import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-stop-impersonating-button',
  templateUrl: './stop-impersonating-button.component.html',
  styleUrls: ['./stop-impersonating-button.component.scss']
})
export class StopImpersonatingButtonComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  closeImpersonation() {
    this.auth.stopImpersonating();
  }
}
