import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FleioApiService } from '../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LicenseApiService extends FleioApiService<any> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl(''));
  }

  getLicenseInfo(): Observable<{ [key: string] : any; }> {
    return this.getAction('get-license-info');
  }

  setLicense(licenseKey: string): Observable<any> {
    return this.postAction('set-license', {
      license_key: licenseKey
    });
  }

  refreshLicense(): Observable<any> {
    return this.postAction('refresh-license');
  }
}
