import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';

import { Page } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  public PagesSubject: Subject<Page[]> = new Subject<Page[]>();

  constructor() { }

  // public savePage(logo: string): Observable<boolean> {
  //   return new Observable<boolean>((observer: Observer<boolean>) => {
  //     firebase.database().ref('logo/').set(logo).then(() => observer.next(true)).catch(() => observer.next(false));
  //   });
  // }

  public getPages(): Observable<Page[]> {
    return new Observable<Page[]>((observer: Observer<Page[]>) => {
      firebase.database().ref('pages/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }

  public getPage(id: number): Observable<Page> {
    return new Observable<Page>((observer: Observer<Page>) => {
      firebase.database().ref(`pages/${id}`)
        .once('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }
}
