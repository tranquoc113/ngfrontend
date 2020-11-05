import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../config/config.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private config: ConfigService) { }

  ngOnInit(): void {
    this.authService.logout().subscribe(response => {
      if (this.config && this.config.current && this.config.current.settings &&
          this.config.current.settings.logoutRedirect) {
          window.location.href = this.config.current.settings.logoutRedirect;
      } else {
        this.router.navigateByUrl(
          this.config.getPanelUrl('login')
        )
      }
    })
  }

}
