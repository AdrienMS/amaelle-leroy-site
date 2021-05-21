import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  public FooterSubject: Subject<string> = new Subject<string>();

  constructor() { }

  public saveFooter(footer: string): Promise<boolean> {
    return new Promise<boolean>(
        (resolve, reject) => {
          firebase.database().ref(`footer`).set(footer).then(
            () => resolve(true),
            (error) => reject(error)
          );
        }
      );
  }

  public getFooter(): Observable<string> {
    return new Observable<string>((observer: Observer<string>) => {
      firebase.database().ref('footer/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }
}
