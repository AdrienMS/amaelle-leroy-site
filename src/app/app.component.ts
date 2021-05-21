import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import firebase from 'firebase/app';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Amaelle Leroy - Photographie';
  public isAdmin = false;

  public isReduced = false;

  // keep refs to subscriptions to be able to unsubscribe later
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;

  constructor(private router: Router, private ccService: NgcCookieConsentService) {
    firebase.initializeApp(environment.firebaseConfig);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('admin') && !event.url.includes('login')) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        const d: Date = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
        const expires = `expires=${d.toUTCString()}`;
        console.log(expires);
        document.cookie = `${this.ccService.getConfig().cookie.name}=${event.status}; ${expires}`;
        console.log(document.cookie);
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        this.ccService.open();
      });
  }

  public toggleAdminPanel(value) {
    this.isReduced = value;
  }

  // public prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  // }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
  }
}
