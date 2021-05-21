import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, Observer, throwError } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';

import { Contact } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  public getContacts(): Observable<Contact[]> {
    return new Observable<Contact[]>((observer: Observer<Contact[]>) => {
      firebase.database().ref('contact/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          const toReturn: Array<Contact> = [];
          if (data.val() !== null) {
            Object.keys(data.val()).forEach(key => {
              toReturn.push(new Contact(
                data.val()[key].transmitter,
                data.val()[key].category,
                data.val()[key].date,
                data.val()[key].content,
                data.val()[key].isRead,
                key
              ));
            });
            observer.next(toReturn);
          }
        }, error => {
          console.log(error);
        });
    });
  }

  public isRead(key: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {
        firebase.database().ref(`contact/${key}`).child('isRead').set(true).then(
          () => resolve(true),
          (error) => { console.error(error); reject(error); }
        );
      }
    );
  }

  public sendMail(sEmail: string, sName: string, sPhone: string, sPricing: string, sContent: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {
        this.http.post('https://us-central1-amaelleleroy-325ff.cloudfunctions.net/contactMail', null, {params: {
          mail: sEmail,
          name: sName,
          phone: sPhone,
          pricing: sPricing,
          content: sContent
        }}).pipe(
          catchError(err => { reject(err); return this.handleError(err); })
        )
        .subscribe(data => {
          if (data) { resolve(true); }
          else { console.log(false); reject(false); }
        });
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
