import { Component, OnInit } from '@angular/core';
import { IPluginComponent } from '@shared/plugins/interfaces/plugin-component';
import { FormBuilder } from '@angular/forms';
import { ProductModuleSettingsHelper } from '@fleio-api/billing/products/product-module-settings-helper';
import { ConfigService } from '@shared/config/config.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IUserModel } from '@fleio-api/client-user/model/user.model';
import { UsersApiService } from '@fleio-api/client-user/user/users-api.service';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss']
})
export class ProductSettingsComponent implements OnInit, IPluginComponent {
  productSettingsForm = this.formBuilder.group({
    todo_user_id: [''],
    add_todo_on_create: [false],
    add_todo_on_destroy: [false],
    add_todo_on_suspend: [false],
    add_todo_on_resume: [false],
    add_todo_on_renew: [false],
    add_todo_on_change_cycle: [false],
  })
  public data: {
    productModuleSettingsHelper: ProductModuleSettingsHelper,
    productModuleSettings: any
  };
  backendErrors = {};
  filteredUsers: Array<IUserModel> = [];

  constructor(
    private formBuilder: FormBuilder,
    private usersApiService: UsersApiService,
    public config: ConfigService,
  ) { }

  clickedAutocompleteInput(control) {
    this.productSettingsForm.controls[control].setValue('');
  }

  displayUserFn(user: IUserModel) {
    if (!user) {
      return '';
    }
    return user.full_name || user.username || user.id;
  }

  ngOnInit(): void {
    this.productSettingsForm.get('todo_user_id').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.usersApiService.list({
          search: value,
          filtering: 'is_staff:true'
        }).pipe()),
      ).subscribe((users: { objects: IUserModel[] }) => {
      this.filteredUsers = users.objects;
    });

    if (this.data && this.data.productModuleSettings) {
      this.productSettingsForm.patchValue(this.data.productModuleSettings);
      if (this.data.productModuleSettings && this.data.productModuleSettings.todo_user &&
        typeof this.data.productModuleSettings.todo_user === 'number') {
        this.usersApiService.get(this.data.productModuleSettings.todo_user).subscribe(object => {
          this.productSettingsForm.controls.todo_user_id.patchValue(object);
        });
      }
      this.productSettingsForm.addControl(
        'product', this.formBuilder.control(this.data.productModuleSettings.product)
      );
    }
    this.productSettingsForm.valueChanges.subscribe(value => {
      if (value && value.todo_user_id) {
        if (value.todo_user_id.id) {
          value.todo_user = value.todo_user_id.id;
          value.todo_user_id = value.todo_user_id.id;
        }
      } else if (value && value.todo_user_id === '') {
        value.todo_user = null;
        value.todo_user_id = null;
      }
      this.data.productModuleSettingsHelper.moduleSettings = value;
    });
  }

}
