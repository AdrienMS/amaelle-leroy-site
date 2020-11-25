import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import { map, filter, takeUntil } from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  public bannerSubject: Subject<Array<string>> = new Subject<Array<string>>();

  constructor() { }

  public getBanner(): Observable<Array<string>> {
    return new Observable<Array<string>>((observer: Observer<string[]>) => {
      firebase.database().ref('banner/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }
}
