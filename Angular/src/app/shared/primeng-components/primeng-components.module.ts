import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from 'primeng/editor';
import { FloatLabelModule } from 'primeng/floatlabel';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PaginatorModule } from 'primeng/paginator';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaginatorModule,
    FloatLabelModule,
    SliderModule,
    EditorModule,
    CheckboxModule,
    CalendarModule,
    ToastModule,
    AvatarModule,
  ],
  exports: [
    PaginatorModule,
    FloatLabelModule,
    SliderModule,
    EditorModule,
    CheckboxModule,
    CalendarModule,
    ToastModule,
    AvatarModule,
    KeyFilterModule,
  ],
})
export class PrimeNgComponentsModule {}
