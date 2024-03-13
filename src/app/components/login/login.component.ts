import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { login } from 'src/app/store/actions/auth.actions';
import {
  AppState,
  selectError,
  selectIsLoading,
  selectToken
} from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private unsubscribe$ = new Subject<void>();
  PasswordRequirements = [
    ['pattern', 'required'],
    ['minlength', 'hasNumber', 'hasSmallCase', 'hasCapitalCase', 'hasSpecialCharacters']
  ];
  LoginForm: FormGroup;
  error: string = '';
  user: { token: string; role: string; firstName: string } = {
    token: '',
    role: '',
    firstName: ''
  };
  isloading$: Observable<boolean> = this.store.select(selectIsLoading);
  loginFailure: boolean = false;
  passwordVisibility: boolean = false;
  error$: Observable<string> = this.store.select(selectError);
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private passwordValidator: CustomValidatorsService
  ) {
    this.LoginForm = this.createLoginForm();
    this.store.select(selectToken).subscribe((user) => (this.user = user));
  }
  createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.compose([
            this.passwordValidator.patternValidators(/\d/, { hasNumber: true }),
            this.passwordValidator.patternValidators(/[a-z]/, {
              hasSmallCase: true
            }),
            this.passwordValidator.patternValidators(/[A-Z]/, {
              hasCapitalCase: true
            }),
            this.passwordValidator.patternValidators(/[\s!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/, {
              hasSpecialCharacters: true
            }),
            Validators.required,
            Validators.minLength(8)
          ])
        ]
      ]
    });
  }
  ngOnInit() {
    this.LoginForm.valueChanges.subscribe(() => {
      this.loginFailure = false;
    });
  }
  onSubmit() {
    if (!this.LoginForm.valid) {
      return;
    }

    this.store.dispatch(login(this.LoginForm.value));

    this.store.select(selectError).subscribe((err) => {
      if (err) {
        this.handleLoginError(err);
      } else {
        this.handleLoginSuccess();
      }
    });
  }

  private handleLoginError(err: string) {
    this.loginFailure = true;
    this.error = err;
  }

  private handleLoginSuccess() {
    this.loginFailure = false;
    this.store.select(selectToken).subscribe((user) => {
      if (user && user.token) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('firstName', user.firstName);
        if (user.role === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else if (user.role === 'LECTURER') {
          this.router.navigate(['/lecturer']);
        } else {
          this.router.navigate(['/student']);
        }
      }
    });
  }
  showPassword() {
    this.passwordVisibility = !this.passwordVisibility;
  }
  ShowPasswordErrors(controls: string): boolean {
    const passwordControl = this.LoginForm.controls[controls];
    return passwordControl.invalid && (passwordControl.dirty || passwordControl.touched);
  }

  shouldShowPasswordRequirementError(requirement: string, control: string): boolean {
    const passwordControl = this.LoginForm.controls[control];
    return passwordControl.hasError(requirement) || passwordControl.hasError('required');
  }

  getEmailRequirement(requirement: string): string {
    switch (requirement) {
      case 'pattern':
        return 'Please enter correct email address';
      default:
        return '';
    }
  }
  getPasswordRequirementText(requirement: string): string {
    switch (requirement) {
      case 'minlength':
        return 'At least 8 characters';
      case 'hasSmallCase':
        return 'Lower case letter (a-z)';
      case 'hasCapitalCase':
        return 'Upper case letter (A-Z)';
      case 'hasNumber':
        return 'Numbers (0-9)';
      case 'hasSpecialCharacters':
        return 'Special characters (@-#)';
      default:
        return '';
    }
  }

  ngDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
