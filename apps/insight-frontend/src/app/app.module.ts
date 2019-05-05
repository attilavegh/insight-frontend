import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LayoutModule } from '@angular/cdk/layout';

import { NxModule } from '@nrwl/nx';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeFreeze } from 'ngrx-store-freeze';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { AuthenticationModule } from '@insight/authentication';
import { NotificationModule } from '@insight/shared-components';
import { environmentProvider } from '@insight/environment';
import { CoreModule } from '@insight/core';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appInitialState as appInitialState, appReducer, routerInitialState } from './+state/app.reducer';
import { AppEffects } from './+state/app.effects';

import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    NotificationModule,
    LayoutModule,
    NxModule.forRoot(),
    StoreModule.forRoot(
      {
        app: appReducer,
        router: routerReducer
      },
      {
        initialState: {
          app: appInitialState,
          router: routerInitialState
        },
        metaReducers: !environment.production ? [storeFreeze] : []
      }
    ),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    DeviceDetectorModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [environmentProvider]
})
export class AppModule {}
