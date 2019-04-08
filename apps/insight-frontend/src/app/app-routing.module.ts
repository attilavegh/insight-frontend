import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, LoginGuard, LogoutGuard } from '@insight/authentication';
import { NewInsightComponent } from '@insight/new-insight';
import { MyInsightComponent } from '@insight/my-insight';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: '', component: NewInsightComponent, canActivate: [LoginGuard] },
  { path: 'insights', component: MyInsightComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
