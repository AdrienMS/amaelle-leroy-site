import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  public LogoSubject: Subject<string> = new Subject<string>();

  constructor() { }

  public saveLogo(logo: string): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      firebase.database().ref('logo/').set(logo).then(() => observer.next(true)).catch(() => observer.next(false));
    });
  }

  public getLogo(): Observable<string> {
    return new Observable<string>((observer: Observer<string>) => {
      firebase.database().ref('logo/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }
}
