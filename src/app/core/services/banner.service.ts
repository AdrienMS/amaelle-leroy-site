import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';

import { Banner } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  public bannerSubject: Subject<Banner> = new Subject<Banner>();

  constructor() { }

  public getBanner(): Observable<Banner> {
    return new Observable<Banner>((observer: Observer<Banner>) => {
      firebase.database().ref('banner/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }
}
