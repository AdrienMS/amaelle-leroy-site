import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AboutModifyPageComponent,
  AdminPageComponent,
  ContactMessagesPageComponent,
  GalleriesListPageComponent,
  GalleryModifyPageComponent,
  LoginPageComponent,
  MediasPageComponent,
  MiscellaneousPageComponent,
  PortfolioModifyPageComponent,
  CategoriesModifyPageComponent,
  PricingModifyPageComponent,
  InstagramAdminComponent
} from './pages';

import { AuthGuardService } from '../core';

const routes: Routes = [
  { path: 'admin',
    children: [
        { path: 'login', component: LoginPageComponent },
        { path: 'portfolio', canActivate: [AuthGuardService], component: PortfolioModifyPageComponent },
        { path: 'categories', canActivate: [AuthGuardService], component: CategoriesModifyPageComponent },
        { path: 'galeries',
          children: [
            { path: ':id', canActivate: [AuthGuardService], component: GalleryModifyPageComponent },
            { path: '', canActivate: [AuthGuardService], component: GalleriesListPageComponent }
          ]
        },
        { path: 'medias', canActivate: [AuthGuardService], component: MediasPageComponent },
        { path: 'pricing', canActivate: [AuthGuardService], component: PricingModifyPageComponent },
        { path: 'instagram', canActivate: [AuthGuardService], component: InstagramAdminComponent },
        { path: 'about', canActivate: [AuthGuardService], component: AboutModifyPageComponent },
        { path: 'contact', canActivate: [AuthGuardService], component: ContactMessagesPageComponent },
        { path: 'miscellaneous', canActivate: [AuthGuardService], component: MiscellaneousPageComponent },

        { path: '', canActivate: [AuthGuardService], component: AdminPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
