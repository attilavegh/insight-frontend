import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MyInsightModule } from './module/my-insight/my-insight.module';
import { NewInsightModule } from './module/new-insight/new-insight.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NewInsightModule,
    MyInsightModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
