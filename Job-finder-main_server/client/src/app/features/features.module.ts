import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { JobService } from '@core/services';
import { AdminService } from '@core/services/admin/admin.service';
import { RegisterService } from '@core/services/auth/signup/register.service';
import { CategoryService } from '@core/services/category/category.service';
import { CompanyService } from '@core/services/company/company.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { ScrollService } from '@core/services/scroll/scroll.service';
import { UserService } from '@core/services/user/user.service';
import { SharedModule } from '@shared';
import { MessageService } from 'primeng/api';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { HomeModule } from './home/home.module';
import { JobsModule } from './jobs/jobs.module';
import { UserModule } from './user/user.module';
@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CoreModule,
    AuthModule,
    HomeModule,
    JobsModule,
    UserModule,
    CompanyModule,
  ],
  exports: [AuthModule, HomeModule, JobsModule, UserModule, CompanyModule],
  providers: [
    CategoryService,
    JobService,
    RegisterService,
    CompanyService,
    UserService,
    AdminService,
    ScrollService,
    MessageService,
    LocalStorageService,
  ],
})
export class FeaturesModule {}
