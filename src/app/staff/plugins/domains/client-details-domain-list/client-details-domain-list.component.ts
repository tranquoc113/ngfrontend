import { Component, OnInit } from '@angular/core';
import { IPluginComponent } from '../../../../shared/plugins/interfaces/plugin-component';
import { FleioId } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { ConfigService } from '../../../../shared/config/config.service';
import { IDomainModel } from '../../../../shared/fleio-api/plugins/domains/model/domain.model';
import { DomainApiService } from '../../../../shared/fleio-api/plugins/domains/domain-api.service';

@Component({
  selector: 'app-client-details-domain-list',
  templateUrl: './client-details-domain-list.component.html',
  styleUrls: ['./client-details-domain-list.component.scss']
})
export class ClientDetailsDomainListComponent implements OnInit, IPluginComponent {
  domains: Array<IDomainModel>;
  public data: {
    clientId: FleioId;
  };
  displayedColumns = ['id', 'title', 'created_at'];
  currentPage = 1;
  nextPage = false;
  previousPage = false;
  loading = false;

  constructor(
    public config: ConfigService,
    private domainApiService: DomainApiService,
  ) {
  }

  changePage(action: string) {
    if (action === 'next') {
      this.currentPage = this.currentPage + 1;
      this.getClientRelatedDomains(this.currentPage);
    }
    if (action === 'previous') {
      this.currentPage = this.currentPage - 1;
      this.getClientRelatedDomains(this.currentPage);
    }
  };

  getClientRelatedDomains(page: number) {
    if (this.data) {
      this.loading = true;
      this.domainApiService.getClientDomains(this.data.clientId, page).subscribe(response => {
        this.domains = response.objects;
        this.nextPage = !!response.next;
        this.previousPage = !!response.previous;
        this.loading = false;
      });
    }
  }

  ngOnInit() {
    this.getClientRelatedDomains(this.currentPage);
  }

}
