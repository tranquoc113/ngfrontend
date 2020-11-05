import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';

export class LogoLinkOptions {
  constructor(public useLink = false, public customLink: string | null = null) {
    if (this.customLink && this.useLink === false) {
      throw new Error('Cannot use custom link if useLink param is disabled');
    }
  }
}

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  logoPath: string;
  @Input() darkContext: boolean;
  @Input() linkOptions: LogoLinkOptions;
  @Input() customStyle: {};

  constructor(public config: ConfigService) { }

  ngOnInit() {
    if (this.darkContext) {
      // dark context, light image
      let imageName;
      if (this.config && this.config.current && this.config.current.settings.logoDark) {
        imageName = this.config.current.settings.logoDark;
      } else {
        imageName = 'logo-dark.svg';
      }
      this.logoPath = this.config.getImagePath(imageName);
    } else {
      // light context, colored image
      let imageName;
      if (this.config && this.config.current && this.config.current.settings.logoLight) {
        imageName = this.config.current.settings.logoLight;
      } else {
        imageName = 'logo.svg';
      }
      this.logoPath = this.config.getImagePath(imageName);
    }
  }

}
