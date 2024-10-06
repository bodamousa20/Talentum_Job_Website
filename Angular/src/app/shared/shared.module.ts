import { NgModule } from '@angular/core';
import { PrimeNgComponentsModule } from './primeng-components/primeng-components.module';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [],
  imports: [UiModule, PrimeNgComponentsModule],
  exports: [UiModule, PrimeNgComponentsModule],
})
export class SharedModule {}
