import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, LoginGuard, LogoutGuard } from '@insight/authentication';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: '', loadChildren: 'libs/new-insight/src/lib/new-insight.module#NewInsightModule', canLoad: [LoginGuard] },
  { path: 'insights', loadChildren: 'libs/my-insight/src/lib/my-insight.module#MyInsightModule', canLoad: [LoginGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
