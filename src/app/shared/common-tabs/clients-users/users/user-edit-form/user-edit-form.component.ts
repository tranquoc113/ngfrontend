import { Component, OnInit, Optional } from '@angular/core';
import { IUserModel } from '../../../../fleio-api/client-user/model/user.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IActionResult } from '../../../../ui/objects-view/interfaces/actions/action-result';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../config/config.service';
import { UsersApiService } from '../../../../fleio-api/client-user/user/users-api.service';
import { DetailsFormBase } from '../../../../ui/objects-view/details-form-base';
import { PanelLayoutComponent } from '../../../../layout/panel-layout/panel-layout.component';
import { AuthService } from '../../../../auth/auth.service';
import { IClientModel } from '../../../../fleio-api/client-user/model/client.model';
import { ClientsApiService } from '../../../../fleio-api/client-user/client/clients-api.service';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss']
})
export class UserEditFormComponent extends DetailsFormBase<IUserModel> implements OnInit {
  country: FormControl = new FormControl('', Validators.required);

  userForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    email_as_username: [false],
    password: ['', Validators.required],
    is_active: [true, Validators.required],
    email_verified: [false, Validators.required],
  });

  emailAsUsername = this.userForm.controls.email_as_username;
  username = this.userForm.controls.username;
  email = this.userForm.controls.email;
  usernameValue: string;
  filteredClients: Array<IClientModel>;
  canEditReseller = false;
  isStaffPanel = false;
  showResellerClientSelect = false;

  constructor(
    private formBuilder: FormBuilder, private usersApi: UsersApiService, private router: Router,
    private config: ConfigService, private authService: AuthService,
    private clientsApiService: ClientsApiService,
    @Optional() public panelLayout?: PanelLayoutComponent,
  ) {
    super();
  }

  displayClientFn(client) {
    if (client) {
      return client.name || client.id;
    }
    return '';
  }

  clickedClientInput() {
    this.userForm.get('reseller_client').setValue('');
  }

  ngOnInit() {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveUser();
    }

    if (this.panelLayout && this.panelLayout.panel === 'staff') {
      this.isStaffPanel = true;
      this.userForm.addControl('is_superuser', this.formBuilder.control([false]));
      this.userForm.controls.is_superuser.setValue(false);
      this.userForm.addControl('is_staff', this.formBuilder.control([false]));
      this.userForm.controls.is_staff.setValue(false);
      this.userForm.get('is_superuser').valueChanges.subscribe(isSuperuserValue => {
        if (isSuperuserValue === true) {
          this.userForm.controls.is_staff.setValue(true);
          this.userForm.controls.is_staff.disable();
          if (this.canEditReseller) {
            this.userForm.controls.is_reseller.setValue(false);
            this.userForm.controls.is_reseller.disable();
          }
        } else {
          this.userForm.controls.is_staff.enable();
          if (this.canEditReseller) {
            if (this.userForm.controls.is_staff.value === false) {
              this.userForm.controls.is_reseller.enable();
            }
          }
        }
      });
      this.userForm.get('is_staff').valueChanges.subscribe(isStaffValue => {
        if (isStaffValue === true) {
          this.showResellerClientSelect = false;
          if (this.canEditReseller) {
            this.userForm.controls.is_reseller.setValue(false);
            this.userForm.controls.is_reseller.disable();
          }
        } else {
          this.showResellerClientSelect = true;
          if (this.canEditReseller) {
            this.userForm.controls.is_reseller.enable();
          }
        }
      });
    }

    if (this.isStaffPanel && this.authService.feature('billing.reseller')) {
      this.canEditReseller = true;
      if (this.object && !this.object.id) {
        this.showResellerClientSelect = true;
      }
      this.userForm.addControl('is_reseller', this.formBuilder.control([false]));
      this.userForm.controls.is_reseller.setValue(false);
      this.userForm.get('is_reseller').valueChanges.subscribe(isResellerValue => {
        if (!this.userForm.controls.is_staff.value) {
          this.showResellerClientSelect = isResellerValue !== true;
        }
      })
      if (this.object.is_staff) {
        this.userForm.controls.is_reseller.disable();
      }
      this.userForm.addControl('reseller_client', this.formBuilder.control(['']));
      if (this.object && this.object.reseller_client) {
        this.clientsApiService.get(this.object.reseller_client).subscribe(client => {
          this.userForm.controls.reseller_client.setValue(client);
        });
      }
      this.userForm.get('reseller_client').valueChanges
        .pipe(
          debounceTime(300),
          switchMap(value => this.clientsApiService.withResellerService(value).pipe()),
        ).subscribe((clients: {objects: IClientModel[]}) => {
          this.filteredClients = clients.objects;
        });
    }

    if (this.object) {
      this.userForm.patchValue(this.object);
    }

    this.emailAsUsername.valueChanges.subscribe(emailAsUsername => {
      if (emailAsUsername) {
        this.usernameValue = this.username.value;
        this.username.setValue(this.email.value);
        this.username.disable();
      } else {
        this.username.setValue(this.usernameValue);
        this.username.enable();
      }
    });
  }

  private saveUser(): Observable<IActionResult> {
    const value = this.userForm.getRawValue() as IUserModel;
    if (this.username.disabled) {
      value.username = this.username.value;
    }

    if (!value.password) {
      delete value.password;
    }

    if (value.is_staff || value.is_reseller) {
      if (value.reseller_client) {
        delete value.reseller_client;
      }
    }

    if (value.reseller_client) {
      // @ts-ignore
      value.reseller_client = value.reseller_client.id;
    } else {
      value.reseller_client = null;
    }

    let request;

    if (this.object.id) {
      value.id = this.object.id;
      request = this.usersApi.update(value.id, value);
    } else {
      request = this.usersApi.create(value);
    }

    request.subscribe(() => {
        this.router.navigateByUrl(
          this.config.getPrevUrl('clients-users/users')
        ).catch(() => {});
    }, (error) => {
      this.setErrors(error.error);
    });

    return of(null);
  }
}
