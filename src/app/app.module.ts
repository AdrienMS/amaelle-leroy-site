import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { NgxImageCompressService } from 'ngx-image-compress';

/*Firebase Modules*/
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule, CONFIG, DEBUG_MODE, ScreenTrackingService } from '@angular/fire/analytics';

import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

/*Routing Module*/
import { AppRoutingModule } from './app-routing.module';

/*Environment file*/
import { environment } from '../environments/environment';

/*Main component*/
import { AppComponent } from './app.component';

/*Local Components*/
// import { HomeModule } from './home';
import { AdminModule } from './admin';
import { GalleryModule } from './gallery';
import { PageModule } from './page';
import { PricingModule } from './pricing';
import { AboutAndContactModule } from './about-and-contact';
import { PolicyModule } from './policy';

/*Shared Module*/
import { SharedModule } from './shared';
import { ServiceWorkerModule } from '@angular/service-worker';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'tinesoft.github.io',
    name: 'allow_cookies'
  },
  position: 'bottom-left',
  theme: 'classic',
  palette: {
    popup: {
      background: '#9ea7aa',
      text: '#ffffff',
      link: '#ffffff'
    },
    button: {
      background: '#fce0dd',
      text: '#000000',
      border: 'transparent'
    }
  },
  type: 'info',
  content: {
    message: 'Ce site web utilise des cookies pour vous assurer la meilleure expérience de navigation sur notre site.',
    dismiss: 'OK, j\'ai compris!',
    deny: 'Refuser',
    link: 'Plus d\'information',
    href: 'https://amaelleleroy-325ff.web.app/cookies',
    policy: 'Cookie Policy',
    header: 'Cookies sur le site!',
    allow: 'Autoriser les cookies'
  }
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    /*Firebase Modules*/
    AngularFireModule.initializeApp(environment.firebaseConfig, 'amaelleleroy-325ff'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireAnalyticsModule,

    NgcCookieConsentModule.forRoot(cookieConfig),

    /*Local Modules*/
    // HomeModule,
    AdminModule,
    GalleryModule,
    PricingModule,
    AboutAndContactModule,
    PolicyModule,
    PageModule,

    /*Shared Module*/
    SharedModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    NgxImageCompressService,
    { provide: CONFIG,
      useValue: {
        send_page_view: true,
        allow_ad_personalization_signals: false,
        anonymise_ip: true
      }
    },
    {
      provide: DEBUG_MODE,
      useValue: true
    },
    ScreenTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
