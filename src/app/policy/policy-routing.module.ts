import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PolicyPageComponent, CookiesPageComponent } from './pages';

const routes: Routes = [
  { path: 'policy', component: PolicyPageComponent },
  { path: 'cookies', component: CookiesPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule {}
