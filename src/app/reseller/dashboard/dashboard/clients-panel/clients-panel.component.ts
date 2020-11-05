import { Component, OnInit } from '@angular/core';
import { ClientsApiService } from '../../../../shared/fleio-api/client-user/client/clients-api.service';

@Component({
  selector: 'app-clients-panel',
  templateUrl: './clients-panel.component.html',
  styleUrls: ['./clients-panel.component.scss']
})
export class ClientsPanelComponent implements OnInit {
  tableData: {
    description: string;
    number: number;
  }[] = [];
  displayedColumns: string[] = ['description', 'number'];
  constructor(private clientsService: ClientsApiService) { }

  ngOnInit() {
    this.clientsService.getAction('summary').subscribe(response => {
      this.tableData.push({
        description: 'Total clients',
        number: response.count
      });
      this.tableData.push({
        description: 'New clients',
        number: response.new
      });
    });
  }

}
