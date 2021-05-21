import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { LazyLoadImageModule } from 'ng-lazyload-image';

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
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

/*Admin pages*/
import {
  AboutModifyPageComponent,
  AdminPageComponent,
  CategoriesModifyPageComponent,
  ContactMessagesPageComponent,
  GalleriesListPageComponent,
  GalleryModifyPageComponent,
  LoginPageComponent,
  MediasPageComponent,
  MiscellaneousPageComponent,
  PagesPageComponent,
  PricingModifyPageComponent,
  PortfolioModifyPageComponent,
  InstagramAdminComponent
} from './pages';

import {
  CompressImageComponent,
  ImagesGalleryComponent,
  SelectImageComponent,
} from './components';

/*Shared Module*/
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,

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
    MatTabsModule,
    MatBadgeModule,
    DragDropModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressBarModule,
    MatChipsModule,

    FontAwesomeModule,
    LazyLoadImageModule,

    RichTextEditorModule,

    /*Shared Module*/
    SharedModule,
  ],
  providers: [],
  declarations: [
    /*Pages Components*/
    AboutModifyPageComponent,
    AdminPageComponent,
    CategoriesModifyPageComponent,
    ContactMessagesPageComponent,
    GalleriesListPageComponent,
    GalleryModifyPageComponent,
    LoginPageComponent,
    MediasPageComponent,
    MiscellaneousPageComponent,
    PagesPageComponent,
    PricingModifyPageComponent,
    PortfolioModifyPageComponent,
    InstagramAdminComponent,

    /*Components*/
    CompressImageComponent,
    ImagesGalleryComponent,
    SelectImageComponent,
  ]
})
export class AdminModule { }
