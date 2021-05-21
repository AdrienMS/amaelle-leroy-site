import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';

import { CustomComponent } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {
  public ComponentsSubject: Subject<CustomComponent[]> = new Subject<CustomComponent[]>();

  constructor() { }

  public getSingleComponent(id: number): Observable<CustomComponent> {
    return new Observable<CustomComponent>((observer: Observer<CustomComponent>) => {
      firebase.database().ref(`components/${id}`)
        .once('value', (data: firebase.database.DataSnapshot) => {
          console.log(data.val());
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }

  public getComponents(): Observable<CustomComponent[]> {
    return new Observable<CustomComponent[]>((observer: Observer<CustomComponent[]>) => {
      firebase.database().ref('components/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }
}
