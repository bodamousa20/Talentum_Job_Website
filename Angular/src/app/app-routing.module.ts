import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@features/home/home/home.component';

export const routes: Routes = [
  // Eager loading --> not recommended
  {
    path: '',
    component: HomeComponent,
  },
  //Lazy loading
  {
    path: 'jobs',
    loadChildren: () =>
      import('./features/jobs/jobs.module').then((m) => m.JobsModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./features/company/company.module').then((m) => m.CompanyModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
