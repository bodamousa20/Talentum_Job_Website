import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { MessageService } from 'primeng/api';
import { Logger } from '../../../core/services/auth/logger/logger';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  type: string = 'password';
  passwordIcon: string = 'pi-eye-slash';
  submitted = false;
  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private logger: Logger,
    private storage: LocalStorageService,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ],
    });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  showPassword: boolean = false;
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.logger
      .login(
        this.loginFormControls['email'].value as string,
        this.loginFormControls['password'].value as string
      )
      .subscribe({
        next: (data) => {
          this.storage.setId(data.id);
          this.storage.setRole(data.role);
          this.storage.setIsLoggedIn(true);
          this.messageService.add({
            icon: 'pi pi-check',
            summary: 'Success',
            detail: 'Signed In Successfully',
            life: 1500,
          });
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        },
        error: (error) => {
          this.messageService.add({
            icon: 'pi pi-times',
            summary: 'Error',
            detail: error.error,
            life: 2500,
          });
        },
      });
  }

  hideShowPass() {
    if (this.type === 'password') {
      this.type = 'text';
      this.passwordIcon = 'pi-eye';
    } else {
      this.type = 'password';
      this.passwordIcon = 'pi-eye-slash';
    }
  }
}
