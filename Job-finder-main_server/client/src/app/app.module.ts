import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeFormatterPipe } from './time-formatter.pipe';
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    FeaturesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
