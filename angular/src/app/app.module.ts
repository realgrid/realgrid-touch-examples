import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RealgridComponent } from './realgrid/realgrid-touch.component';

@NgModule({
  declarations: [
    AppComponent,
    RealgridComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
