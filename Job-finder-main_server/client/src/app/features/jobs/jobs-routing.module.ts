import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyToJobComponent } from './pages/apply-to-job/apply-to-job.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { JobsComponent } from './pages/jobs/jobs.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
  },
  {
    path: 'job-details/:job-id',
    component: JobDetailsComponent,
  },
  {
    path: 'job-details/:job-id/apply-to-job',
    component: ApplyToJobComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
