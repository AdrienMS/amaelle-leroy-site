import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages';

import { BannerComponent } from './components';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeRoutingModule,
    NgbModule,
  ],
  providers: [
  ],
  declarations: [
    HomePageComponent,
    BannerComponent,
  ]
})
export class HomeModule {}
