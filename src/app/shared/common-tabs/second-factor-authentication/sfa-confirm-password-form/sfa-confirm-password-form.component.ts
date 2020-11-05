import { Component, OnInit } from '@angular/core';
import { SfaTypesApiService } from '@fleio-api/core/sfa-types-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-sfa-confirm-password-form',
  templateUrl: './sfa-confirm-password-form.component.html',
  styleUrls: ['./sfa-confirm-password-form.component.scss']
})
export class SfaConfirmPasswordFormComponent extends DetailsFormBase<any> implements OnInit {
  confirmPassForm = this.formBuilder.group({
    password: ['', Validators.required]
  });
  loading = false;

  constructor(
    private sfaTypesApiService: SfaTypesApiService,
    private router: Router,
    private config: ConfigService,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  confirm() {
    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }
    const value = this.confirmPassForm.value;
    this.sfaTypesApiService.confirmPassword(value.password).subscribe(response => {
      this.router.navigateByUrl(this.config.getPrevUrl('sfa/options'));
    }, error => {
      if (error.error) {
        this.setErrors(error.error)
      }
    })
  }

  ngOnInit(): void {
    this.loading = true;
    this.sfaTypesApiService.hasPasswordConfirmed().subscribe(response => {
      if (response.allowed) {
        this.router.navigateByUrl(this.config.getPanelUrl('sfa/options'));
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

}
