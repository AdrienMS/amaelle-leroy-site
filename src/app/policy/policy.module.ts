import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyPageComponent, CookiesPageComponent } from './pages';

import { SharedModule } from '../shared';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PolicyRoutingModule,
    SharedModule,
    // NgbModule,
  ],
  providers: [
  ],
  declarations: [
    PolicyPageComponent,
    CookiesPageComponent
  ]
})
export class PolicyModule {}
