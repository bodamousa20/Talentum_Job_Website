import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddJobComponent } from './pages/add-job/add-job.component';
import { CompanyComponent } from './pages/company/company.component';

const routes: Routes = [
  { path: ':company-id', component: CompanyComponent },
  {
    path: ':company-id/add-job',
    component: AddJobComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
