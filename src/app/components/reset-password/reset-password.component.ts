import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { resetAction } from 'src/app/store/actions/auth.actions';
import { AppState, selectResetLoading } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  LoginForm: FormGroup;
  loginFailure: boolean = false;
  passwordVisibility: boolean = false;
  isLoading$: Observable<boolean> = this.store.select(selectResetLoading);
  message$: Observable<string> = this.store.select((state) => state.resetPassword.message);
  newPassword: string = '';
  constructor(
    private fb: FormBuilder,
    private customerService: CustomValidatorsService,
    private store: Store<AppState>,
  ) {
    this.LoginForm = this.createResetForm();
  }
  createResetForm() {
    return this.fb.group({
      password: [
        '',
        [
          Validators.compose([
            this.customerService.patternValidators(/\d/, { hasNumber: true }),
            this.customerService.patternValidators(/[a-z]/, {
              hasSmallCase: true
            }),
            this.customerService.patternValidators(/[A-Z]/, {
              hasCapitalCase: true
            }),
            this.customerService.patternValidators(/[\s!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/, {
              hasSpecialCharacters: true
            }),
            Validators.required,
            Validators.minLength(8)
          ])
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.compose([
            this.customerService.patternValidators(/\d/, { hasNumber: true }),
            this.customerService.patternValidators(/[a-z]/, {
              hasSmallCase: true
            }),
            this.customerService.patternValidators(/[A-Z]/, {
              hasCapitalCase: true
            }),
            this.customerService.patternValidators(/[\s!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/, {
              hasSpecialCharacters: true
            }),
            Validators.required,
            Validators.minLength(8)
          ])
        ]
      ]
    });
  }
  ShowPasswordErrors(controls: string): boolean {
    const passwordControl = this.LoginForm.controls[controls];
    return passwordControl.invalid && (passwordControl.dirty || passwordControl.touched);
  }
  showPassword() {
    this.passwordVisibility = !this.passwordVisibility;
  }
  onSubmit() {
    if (this.LoginForm.valid) {
      this.newPassword = this.LoginForm.controls['password'].value;
      this.message$.subscribe((message) => {
        if (message === 'Password reset successful.') {
          this.customerService.Navigate('/');
        }
      });
      this.store.dispatch(resetAction({ newPassword: { newPassword: this.newPassword } }));
    }
    return;
  }
}
