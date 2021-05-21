import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';

import { About } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor() { }

  public getAbout(): Observable<About> {
    return new Observable<About>((observer: Observer<About>) => {
      firebase.database().ref('about/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }

  public saveAbout(about: About): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {
        firebase.database().ref(`about`).set(about).then(
          () => resolve(true),
          (error) => reject(error)
        );
      }
    );
  }
}
