import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';

import { Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  public getCategories(): Observable<Category[]> {
    return new Observable<Category[]>((observer: Observer<Category[]>) => {
      firebase.database().ref('categories/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }

  public saveCategory(category: Category, id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {
        firebase.database().ref(`categories`).child(id.toString()).set(category).then(
          () => resolve(true),
          (error) => reject(error)
        );
      }
    );
  }

  public saveCategories(category: Array<Category>): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {
        firebase.database().ref(`categories`).set(category).then(
          () => resolve(true),
          (error) => reject(error)
        );
      }
    );
  }
}
