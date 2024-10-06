import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, CoreModule, SharedModule],
  exports: [],
})
export class UserModule {}
