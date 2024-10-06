import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModule } from '@shared';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent, CategoryCardComponent, JobCardComponent],
  imports: [CommonModule, UiModule],
  exports: [HomeComponent, CategoryCardComponent, JobCardComponent],
})
export class HomeModule {}
