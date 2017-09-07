import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ngfModule } from '../src';

@Component({ selector: 'app', template: 'nothing here'})
export class AppComponent {}

@NgModule({
  imports: [
    BrowserModule,
    ngfModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [AppComponent]
}) export class AppModule {}