import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NxModule } from '@nrwl/nx';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeFreeze } from 'ngrx-store-freeze';

import { NewInsightModule } from '@insight/new-insight';
import { MyInsightModule } from '@insight/my-insight';
import { AuthenticationModule } from '@insight/authentication';
import { CoreModule } from '@insight/core';
import { environmentProvider } from '@insight/environment';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initialState as appInitialState, appReducer } from './+state/app.reducer';
import { AppEffects } from './+state/app.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NewInsightModule,
    MyInsightModule,
    AuthenticationModule,
    NxModule.forRoot(),
    StoreModule.forRoot(
      { app: appReducer },
      {
        initialState: { app: appInitialState },
        metaReducers: !environment.production ? [storeFreeze] : []
      }
    ),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [AppComponent],
  providers: [environmentProvider]
})
export class AppModule {}
