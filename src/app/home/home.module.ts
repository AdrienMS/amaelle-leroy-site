import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages';

// import { BannerComponent } from './components';

import { SharedModule } from '../shared';
import { AboutComponent, ContactComponent, PortfolioComponent, ScreenComponent, InstagramComponent } from './components';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeRoutingModule,
    SharedModule,
    LazyLoadImageModule,
    // NgbModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FontAwesomeModule
  ],
  providers: [
  ],
  declarations: [
    HomePageComponent,
    PortfolioComponent,
    ScreenComponent,
    AboutComponent,
    ContactComponent,
    InstagramComponent,
    // BannerComponent,
  ]
})
export class HomeModule {}
