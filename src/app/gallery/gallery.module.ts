import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { GalleryRoutingModule } from './gallery-routing.module';

import {
  GalleryPageComponent,
  GalleryCategoriesPageComponent,
  SingleGalleryComponent
} from './pages';

import { SharedModule } from '../shared';

@NgModule({
  imports: [
    GalleryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    SharedModule,
  ],
  providers: [],
  declarations: [
    GalleryPageComponent,
    SingleGalleryComponent,
    GalleryCategoriesPageComponent
  ]
})
export class GalleryModule { }
