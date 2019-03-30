import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewInsightComponent } from './module/new-insight/container/new-insight/new-insight.component';
import { MyInsightComponent } from './module/my-insight/container/my-insight/my-insight.component';
import { LoginComponent } from './module/login/container/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: NewInsightComponent },
  { path: 'insights', component: MyInsightComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
