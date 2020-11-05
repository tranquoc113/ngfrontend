import { Component, OnInit } from '@angular/core';
import { LogoLinkOptions } from '@shared/ui/logo/logo.component';
import { AuthService } from '@shared/auth/auth.service';
import { ConfigService } from '@shared/config/config.service';
import { SFALoginDataService } from '@fleio-api/second-factor-authentication/sfa-login-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-options',
  templateUrl: './confirm-options.component.html',
  styleUrls: ['./confirm-options.component.scss']
})
export class ConfirmOptionsComponent implements OnInit {
  logoLinkOptions = new LogoLinkOptions(false);

  constructor(public auth: AuthService, public config: ConfigService,
              public sfaLoginDataService: SFALoginDataService, private router: Router) { }

  redirectToOptionConfirmDetails(sfaName: string) {
    // prevent user from opening this page in new tab
    sfaName = sfaName.replace('_', '-');
    this.router.navigateByUrl(this.config.getPanelUrl(`sfa/${sfaName}/confirm`));
  }

  ngOnInit(): void {
    if (!this.sfaLoginDataService.username) {
      this.router.navigateByUrl(this.config.getPanelUrl('login'));
    }
  }

}
