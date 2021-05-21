import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

import { PricingRoutingModule } from './pricing-routing.module';
import { PricingPageComponent } from './pages';

import { SharedModule } from '../shared';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PricingRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule
  ],
  providers: [
  ],
  declarations: [
    PricingPageComponent,
  ]
})
export class PricingModule {}
