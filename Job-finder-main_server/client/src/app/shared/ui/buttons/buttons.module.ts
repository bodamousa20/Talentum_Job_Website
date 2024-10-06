import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnimatedButtonComponent } from './animated-button/animated-button.component';
import { SaveButtonComponent } from './save-button/save-button.component';

@NgModule({
  declarations: [AnimatedButtonComponent, SaveButtonComponent],
  imports: [CommonModule, FormsModule],
  exports: [AnimatedButtonComponent, SaveButtonComponent],
})
export class ButtonsModule {}
