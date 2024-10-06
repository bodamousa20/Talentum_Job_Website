import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { CompanyRoutingModule } from './company-routing.module';
import { AddJobComponent } from './pages/add-job/add-job.component';
import { CompanyComponent } from './pages/company/company.component';

@NgModule({
  declarations: [CompanyComponent, AddJobComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
  ],
  exports: [],
})
export class CompanyModule {}
