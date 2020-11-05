import { Component, OnInit } from '@angular/core';
import { IObjectController } from '@objects-view/interfaces/object-controller';
import { StaticObjectController } from '@objects-view/static-object-controller';
import { EditTermsOfServiceFormComponent } from '../tabs/edit-terms-of-service-form/edit-terms-of-service-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-tos',
  templateUrl: './edit-tos.component.html',
  styleUrls: ['./edit-tos.component.scss']
})
export class EditTosComponent implements OnInit {
  public objectController: IObjectController = new StaticObjectController({
    header: {
      title: {
        text: 'Edit terms of service',
      }
    },
    tabs: [
      {
        tabName: 'Edit tos',
        component: EditTermsOfServiceFormComponent,
      },
    ],
  });

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.objectController.object = this.activatedRoute.snapshot.data.tos;
  }
}
