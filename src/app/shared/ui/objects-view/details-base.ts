import { ObjectController } from './object-controller';
import { map } from 'rxjs/operators';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IObjectListUIService } from './interfaces/object-list-ui-service';
import { environment } from '../../../../environments/environment';

@Directive()
export class DetailsBase<ObjectType extends IBaseFleioObjectModel> implements OnDestroy, OnInit {
  public objectController: ObjectController;
  protected state: string;
  protected objectName: string;
  protected route: ActivatedRoute;
  protected objectListUIService: IObjectListUIService;
  protected additionalObjectNames: string[];

  protected get object(): ObjectType {
    return this.objectController.object as ObjectType;
  }

  constructor(
    route: ActivatedRoute, objectListUIService: IObjectListUIService,
    state: string, objectName: string, additionalObjectNames: string[] | null = null) {
    this.route = route;
    this.objectListUIService = objectListUIService;
    this.state = state;
    this.objectName = objectName;
    this.additionalObjectNames = additionalObjectNames;
  }

  protected afterObjectControllerInit() {}

  ngOnInit() {
    this.objectController = new ObjectController(
      this.route.data.pipe(
        map((data) => {
          let object: IBaseFleioObjectModel;
          let additionalObjects: {[objectName: string]: IBaseFleioObjectModel};
          if (this.objectName) {
            object = data[this.objectName];
            if (!object) {
              if (environment.enableErrorLogging) {
                console.error(`No object named ${this.objectName} found in router data`);
              }
            }
          } else {
            object = {};
          }
          if (this.additionalObjectNames) {
            additionalObjects = {};
            for (const additionalObjectName of this.additionalObjectNames) {
              if (!data.hasOwnProperty(additionalObjectName)) {
                if (environment.enableErrorLogging) {
                  console.error(`No additional object named ${additionalObjectName} found in router data`);
                  console.error(data);
                }
              } else {
                additionalObjects[additionalObjectName] = data[additionalObjectName];
              }
            }
          }
          return {
            object,
            additionalObjects,
            permissions: data.permissions as IPermissionsModel,
          };
        })
      ),
      this.objectListUIService, this.state,
    );
    this.afterObjectControllerInit();
  }

  ngOnDestroy(): void {
    if (this.objectController) {
      this.objectController.unsubscribe();
      this.objectController = null;
    }
  }
}
