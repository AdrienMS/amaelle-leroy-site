import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home';
import { PagePageComponent } from './page';


const routes: Routes = [
  { path: '', component: HomePageComponent, data: { animationState: 'Home'} },
  { path: '**', component: PagePageComponent, data: { animationState: 'Others'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
