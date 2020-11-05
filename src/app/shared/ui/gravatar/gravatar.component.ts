import { Component, Input, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-gravatar',
  templateUrl: './gravatar.component.html',
  styleUrls: ['./gravatar.component.scss']
})
export class GravatarComponent implements OnInit {
  @Input() email: string;
  @Input() customStyle: {};
  @Input() imgTitle = '';
  url: string;

  constructor() {
  }

  ngOnInit() {
    this.url = 'https://www.gravatar.com/avatar/';
    const md5 = new Md5();
    if (this.email) {
      this.url = this.url + md5.appendStr(this.email.trim().toLowerCase()).end() + '?default=identicon';
    }
  }

}
