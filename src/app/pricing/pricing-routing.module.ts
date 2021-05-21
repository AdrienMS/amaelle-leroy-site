import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PricingPageComponent } from './pages';

const routes: Routes = [
  { path: 'pricing', component: PricingPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingRoutingModule {}
