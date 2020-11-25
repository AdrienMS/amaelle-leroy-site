import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*Firebase Modules*/
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

/*Routing Module*/
import { AppRoutingModule } from './app-routing.module';

/*Environment file*/
import { environment } from '../environments/environment';

/*Main component*/
import { AppComponent } from './app.component';

/*Local Components*/
import { HomeModule } from './home';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    /*Firebase Modules*/
    AngularFireModule.initializeApp(environment.firebaseConfig, 'amaelleleroy-325ff'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,

    /*Local Modules*/
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
