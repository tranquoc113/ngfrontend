import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { BehaviorSubject } from 'rxjs';
import { ConfigurationsApiService } from '@fleio-api/configurations/configurations-api.service';
import { RegionsApiService } from '@fleio-api/openstack/region/regions-api.service';
import { FlavorsApiService } from '@fleio-api/openstack/flavor/flavors-api.service';
import { UsersApiService } from '@fleio-api/client-user/user/users-api.service';
import { IRouteConfig } from './interfaces/route-config/route-config';
import { IFilterConfig } from './interfaces/route-config/filter-config';
import { RouteHelper } from './route-helper';
import { AuthService } from '../auth/auth.service';
import { TicketDepartmentsApiService } from '@fleio-api/plugins/tickets/ticket-departments-api.service';
import { TLDsApiService } from '@fleio-api/plugins/domains/tlds-api.service';
import { DomainRegistrarsApiService } from '@fleio-api/plugins/domains/domain-registrars-api.service';
import { ProductsApiService } from '@fleio-api/billing/products/product-api.service';
import { ClientGroupsApiService } from '@fleio-api/client-user/client-group/client-groups-api.service';
import { ClusterTemplatesApiService } from '@fleio-api/openstack/cluster-template/cluster-templates-api.service';
import { FlavorGroupsApiService } from '@fleio-api/openstack/flavor-group/flavor-groups-api.service';
import { NetworksApiService } from '@fleio-api/openstack/network/networks-api.service';
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';
import { ImagesApiService } from '@fleio-api/openstack/image/image-api.service';
import { ListFilteringActionsTrackService } from '@objects-view/objects-list-filtering/list-filtering-actions-track.service';

@Injectable({
  providedIn: 'root',
})
export class FilteringService {
  public itemsServices = {
    clients: this.clientsApi,
    configurations: this.configurationsApi,
    regions: this.regionsApi,
    flavors: this.flavors,
    users: this.usersService,
    departments: this.ticketDepartmentsApiService,
    tlds: this.tldsApiService,
    domainRegistrars: this.domainRegistrarsApiService,
    products: this.productsApiService,
    clientgroups: this.clientGroupsApiService,
    networks: this.networksApiService,
    clustertemplates: this.clusterTemplatesApiService,
    flavorgroups: this.flavorGroupsApiService,
    volumes: this.volumesApiService,
    images: this.imagesApiService,
  }; // used to dynamically resolve display values in filtering components
  filteringChangeBS = new BehaviorSubject<boolean>(false);
  filteringChange$ = this.filteringChangeBS.asObservable();
  defaultFilterMap: { [url: string]: string } = {}

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private filteringActionsTrackService: ListFilteringActionsTrackService,
    private clientsApi: ClientsApiService,
    private configurationsApi: ConfigurationsApiService,
    private regionsApi: RegionsApiService,
    private flavors: FlavorsApiService,
    private usersService: UsersApiService,
    private ticketDepartmentsApiService: TicketDepartmentsApiService,
    private tldsApiService: TLDsApiService,
    private domainRegistrarsApiService: DomainRegistrarsApiService,
    private productsApiService: ProductsApiService,
    private clientGroupsApiService: ClientGroupsApiService,
    private networksApiService: NetworksApiService,
    private clusterTemplatesApiService: ClusterTemplatesApiService,
    private flavorGroupsApiService: FlavorGroupsApiService,
    private volumesApiService: VolumesApiService,
    private imagesApiService: ImagesApiService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const routeHelper = new RouteHelper(this.route);
        if (!event.url.includes('filtering=')) {
          const routeConfig = routeHelper.getFinalRoute().snapshot.data.config as IRouteConfig;
          if (routeConfig) {
            const filter = this.formatDefaultFilterOptions(routeConfig.filterConfig);
            if (filter) {
              const key = event.url.split('?')[0];
              this.defaultFilterMap[key] = filter;
              const filteringParam = event.url.includes('?') ? '&filtering=' : '?filtering=';
              const nextUrl = event.url + filteringParam + encodeURIComponent(filter);
              this.filteringChangeBS.next(true);
              router.navigateByUrl(nextUrl, {replaceUrl: true}).then(() => {});
            }
          }
        }
      }
    });
  }

  private static formatFilter(filteringField: string, filteringValue: string) {
    return filteringField + ':' + filteringValue;
  }

  public formatDefaultFilterOptions(filterConfig: IFilterConfig): string {
    let filtering = ''
    if (filterConfig && filterConfig.defaultFilters)
      for (const filterOption of filterConfig.defaultFilters) {
        if (filtering) {
          filtering += '+';
        }
        if (filterOption.field === 'assigned_to' && filterOption.value === 'current_user') {
          filterOption.value = this.auth.userData.user.id.toString();
        }
        filtering += FilteringService.formatFilter(filterOption.field, filterOption.value);
      }

    return filtering;
  }

  public addFilter(filteringField: string, filteringValue: string) {
    const queryParams = {filtering: undefined};
    Object.assign(queryParams, this.route.snapshot.queryParams);
    const newFilter = FilteringService.formatFilter(filteringField, filteringValue);
    if (!queryParams.filtering) {
      queryParams.filtering = newFilter;
    } else {
      if (queryParams && queryParams.filtering && queryParams.filtering.indexOf(newFilter) !== -1) {
        return this.notificationService.showMessage('This filter is already applied.');
      }
      queryParams.filtering = queryParams.filtering + '+' + newFilter;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    }).then(() => {
      this.filteringChangeBS.next(true);
      // notify that a change was made by user action
      this.filteringActionsTrackService.didAction();
    }).catch(() => {
      // error has to be handled by interceptor, or where the request is done
    });
  }

  public removeFilter(appliedFilteringFieldWithLookups: string, appliedFilteringValue) {
    const queryParams = {filtering: undefined};
    Object.assign(queryParams, this.route.snapshot.queryParams);
    const filterToRemove = FilteringService.formatFilter(appliedFilteringFieldWithLookups, appliedFilteringValue);
    // make sure to remove the filtering + sign (separator between filters) before or after the filter to remove
    queryParams.filtering = queryParams.filtering.replace('+' + filterToRemove, '');
    queryParams.filtering = queryParams.filtering.replace(filterToRemove + '+', '');
    queryParams.filtering = queryParams.filtering.replace(filterToRemove, '');
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    }).then(() => {
      this.filteringChangeBS.next(true);
    }).catch(() => {
      // error has to be handled by interceptor, or where the request is done
    });
  }

  updateQueryParams(angularRoute: string, queryParams: Params) {
    angularRoute = '/' + angularRoute;
    if (this.defaultFilterMap[angularRoute]) {
      if (!queryParams) {
        queryParams = {};
      }
      queryParams.filtering = this.defaultFilterMap[angularRoute];
    }

    return queryParams;
  }
}
