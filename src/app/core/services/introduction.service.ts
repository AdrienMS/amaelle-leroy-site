import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class IntroductionService {

  constructor() { }

  public getIntroduction(): Observable<string> {
    return new Observable<string>((observer: Observer<string>) => {
      firebase.database().ref('introduction/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }

  public saveIntroduction(intro: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {
        firebase.database().ref(`introduction`).set(intro).then(
          () => resolve(true),
          (error) => reject(error)
        );
      }
    );
  }
}
