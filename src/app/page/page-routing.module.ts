import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagePageComponent } from './pages';

const routes: Routes = [
  { path: ':namePage', component: PagePageComponent },
  { path: ':namePage/:nameSubPage', component: PagePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule {}
