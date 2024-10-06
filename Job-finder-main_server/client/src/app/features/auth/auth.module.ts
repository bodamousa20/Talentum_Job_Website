import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';

import { Logger } from '@core/services';
import { RegisterService } from '@core/services/auth/signup/register.service';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  exports: [LoginComponent, SignupComponent],
  providers: [Logger, RegisterService],
})
export class AuthModule {}
