import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { SharedModule } from '@shared';
import { FooterComponent } from './footer/footer.component';
import { FullJobCardComponent } from './full-job-card/full-job-card.component';
import { HeaderComponent } from './header/header.component';
import { PageHeaderComponent } from './page-header/page-header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageHeaderComponent,
    FullJobCardComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageHeaderComponent,
    FullJobCardComponent,
  ],
  providers: [LocalStorageService],
})
export class ComponentsModule {}
