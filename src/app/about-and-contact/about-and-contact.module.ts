import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

import { AboutAndContactRoutingModule } from './about-and-contact-routing.module';
import { AboutAndContactPageComponent } from './pages';
import { AboutComponent, ContactComponent} from './components';

import { SharedModule } from '../shared';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AboutAndContactRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatCheckboxModule,
    LazyLoadImageModule,
    RichTextEditorModule
  ],
  providers: [
  ],
  declarations: [
    AboutAndContactPageComponent,
    AboutComponent,
    ContactComponent,
  ]
})
export class AboutAndContactModule {}
