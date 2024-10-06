import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from './buttons/buttons.module';
import { PriceSliderComponent } from './price-slider/price-slider.component';

@NgModule({
  declarations: [PriceSliderComponent],
  imports: [CommonModule, RouterModule, FormsModule, ButtonsModule],
  exports: [ButtonsModule, PriceSliderComponent],
})
export class UiModule {}
