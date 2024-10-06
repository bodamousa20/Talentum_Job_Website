import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { PrimeNgComponentsModule } from '@shared/primeng-components/primeng-components.module';
import { ComponentsModule } from './components';

@NgModule({
  declarations: [],
  imports: [SharedModule],
  exports: [ComponentsModule, PrimeNgComponentsModule],
  providers: [],
})
export class CoreModule {}
