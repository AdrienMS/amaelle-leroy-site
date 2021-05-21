import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

/*Angular Material Modules*/
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DynamicFieldDirective } from './directives';
import { HeaderComponent, FooterComponent } from './layout';
import {
  BaseComponent,
  InputComponent,
  ButtonComponent,
  DateComponent,
  ArrayComponent,
  SelectComponent,
  ImageSelectionComponent,
  DynamicFormComponent,
  MenuComponent,
  CarouselComponent,
  GalleryComponent,
  ViewImageComponent,
  GalleriesListComponent,
  PopupComponent,
  ActionPopupComponent,
  SinglePricingComponent,
  LoadingElementComponent
} from './components';
import { SingleImagePipe, SinglePagePipe, SingleComponentPipe, ThumbnailImagePipe, NumberToArrayPipe, SingleGalleryPipe, SafeHtmlPipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,

    LazyLoadImageModule,

    /*Angular Material Modules*/
    MatButtonToggleModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
  ],
  declarations: [
    CarouselComponent,
    HeaderComponent,
    FooterComponent,

    /*Form Directive*/
    DynamicFieldDirective,

    /*Pipes*/
    SingleImagePipe,
    SinglePagePipe,
    SingleComponentPipe,
    ThumbnailImagePipe,
    NumberToArrayPipe,
    SingleGalleryPipe,
    SafeHtmlPipe,

    /*Form Components*/
    BaseComponent,
    InputComponent,
    ButtonComponent,
    DateComponent,
    ArrayComponent,
    SelectComponent,
    ImageSelectionComponent,
    DynamicFormComponent,

    /*Admin Menu*/
    MenuComponent,

    GalleryComponent,

    ViewImageComponent,

    GalleriesListComponent,

    PopupComponent,

    ActionPopupComponent,

    SinglePricingComponent,

    LoadingElementComponent,
    ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CarouselComponent,
    HeaderComponent,
    FooterComponent,

    /*Form Directive*/
    DynamicFieldDirective,

    /*Pipes*/
    SingleImagePipe,
    SinglePagePipe,
    SingleComponentPipe,
    ThumbnailImagePipe,
    NumberToArrayPipe,
    SingleGalleryPipe,
    SafeHtmlPipe,

    /*Form Components*/
    BaseComponent,
    InputComponent,
    ButtonComponent,
    DateComponent,
    ArrayComponent,
    SelectComponent,
    ImageSelectionComponent,
    DynamicFormComponent,

    /*Admin Menu*/
    MenuComponent,

    GalleryComponent,

    ViewImageComponent,

    GalleriesListComponent,
    PopupComponent,
    ActionPopupComponent,
    SinglePricingComponent,
    LoadingElementComponent
  ],
  entryComponents: [
    /*Form Components*/
    InputComponent,
    ArrayComponent,
    ButtonComponent,
    DateComponent,
    SelectComponent,
    ImageSelectionComponent,
  ]
})
export class SharedModule {
}
