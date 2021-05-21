import { Injectable } from '@angular/core';
import { Subject, Observable, Observer, throwError } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';

import { Insta } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InstaService {

  constructor() { }

  public getInsta(): Observable<Insta> {
    return new Observable<Insta>((observer: Observer<Insta>) => {
      firebase.database().ref('insta/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          let toReturn = data.val();
          if (toReturn === null) {
            toReturn = new Insta();
          }
          observer.next(toReturn);
        }, error => {
          console.log(error);
        });
    });
  }

  public saveInsta(insta: Insta): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {
        firebase.database().ref(`insta`).set(insta).then(
          () => resolve(true),
          (error) => reject(error)
        );
      }
    );
  }
}
