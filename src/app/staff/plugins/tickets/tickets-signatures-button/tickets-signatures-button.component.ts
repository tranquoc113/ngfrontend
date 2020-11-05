import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-tickets-signatures-button',
  templateUrl: './tickets-signatures-button.component.html',
  styleUrls: ['./tickets-signatures-button.component.scss']
})
export class TicketsSignaturesButtonComponent implements OnInit {

  constructor(public config: ConfigService) { }

  ngOnInit(): void {
  }

}
