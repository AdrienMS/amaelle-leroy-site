import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutAndContactPageComponent } from './pages';

const routes: Routes = [
    { path: 'about', component: AboutAndContactPageComponent },
    { path: 'contact', component: AboutAndContactPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutAndContactRoutingModule {}
