import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IZoneModel } from '@fleio-api/openstack/zone/model/zone.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { IRecordListModel } from '@fleio-api/openstack/zone/model/record-list.model';
import { IRecordsetModel } from '@fleio-api/openstack/zone/model/recordset.model';

@Injectable({
  providedIn: 'root'
})
export class ZonesApiService extends FleioApiService<IZoneModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/dns'));
  }

  listRecords(zoneId: FleioId): Observable<IRecordListModel> {
    return this.objectGetAction(zoneId, 'list_records');
  }

  synchronizeRecords(zoneId: FleioId, recordsets: IRecordsetModel[]): Observable<IRecordListModel> {
    return this.objectPostAction(zoneId, 'synchronize_records', recordsets);
  }
}
