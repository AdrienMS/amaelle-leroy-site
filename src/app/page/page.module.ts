import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PageRoutingModule } from './page-routing.module';
import { PagePageComponent } from './pages';

import { BannerComponent, NotFoundPageComponent } from './components';

import { SharedModule } from '../shared';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageRoutingModule,
    SharedModule,
    // NgbModule,
  ],
  providers: [
  ],
  declarations: [
    PagePageComponent,
    BannerComponent,
    NotFoundPageComponent
  ]
})
export class PageModule {}
