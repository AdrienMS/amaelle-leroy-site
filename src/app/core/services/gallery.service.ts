import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, Observer, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/database';

import { Gallery } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  public GalleriesSubject: Subject<Gallery[]> = new Subject<Gallery[]>();

  constructor(private http: HttpClient) { }

  public getGalleriesViaFunctions(): Observable<Gallery[]> {
    return new Observable<Gallery[]>((observer: Observer<Gallery[]>) => {
      this.http.get('https://us-central1-amaelleleroy-325ff.cloudfunctions.net/getGalleries', {})
      .pipe(
        catchError(err => { console.log(err); return this.handleError(err); })
      )
      .subscribe(data => {
        if (data) {
          const toReturn: Array<Gallery> = [];
          // tslint:disable-next-line: no-string-literal
          if (data['datas'] !== null) {
            // tslint:disable-next-line: no-string-literal
            for (const d of data['datas']) {
              toReturn.push(new Gallery(
                d.name,
                d.photos,
                d.highlighted,
                d.url,
                d.isPublish,
                d.draft,
                d.category,
                d.photosID,
                d.highlightedId
              ));
            }
          }
          observer.next(toReturn);
        }
        else { console.log(false); observer.error('Impossible de récupérer les données'); }
      });
    });
  }

  public getSingleGalleryViaFunctions(id: number, isPortfolio: boolean = false): Observable<Gallery> {
    return new Observable<Gallery>((observer: Observer<Gallery>) => {
      this.http.get(
        'https://us-central1-amaelleleroy-325ff.cloudfunctions.net/getSingleGallery',
        { params: { id: id !== null ? id.toString() : null, isPortfolio: isPortfolio.toString() } }
      )
      .pipe(
        catchError(err => { console.log(err); return this.handleError(err); })
      )
      .subscribe(data => {
        if (data) {
          // tslint:disable-next-line: no-string-literal
          if (data['datas'] !== null) {
            observer.next(new Gallery(
              // tslint:disable-next-line: no-string-literal
              data['datas'].name,
              // tslint:disable-next-line: no-string-literal
              data['datas'].photos,
              // tslint:disable-next-line: no-string-literal
              data['datas'].highlighted,
              // tslint:disable-next-line: no-string-literal
              data['datas'].url,
              // tslint:disable-next-line: no-string-literal
              data['datas'].isPublish,
              // tslint:disable-next-line: no-string-literal
              data['datas'].draft,
              // tslint:disable-next-line: no-string-literal
              data['datas'].category,
              // tslint:disable-next-line: no-string-literal
              data['datas'].photosID,
              // tslint:disable-next-line: no-string-literal
              data['datas'].highlightedId
            ));
          } else {
            observer.next(new Gallery());
          }
        }
        else {
          console.log(false);
          observer.error('Impossible de récupérer les données');
        }
      });
    });
  }

  public getGalleries(): Observable<Gallery[]> {
    return new Observable<Gallery[]>((observer: Observer<Gallery[]>) => {
      firebase.database().ref('galleries/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }

  public getSingleGallery(id: number): Observable<Gallery> {
    return new Observable<Gallery>((observer: Observer<Gallery>) => {
      firebase.database().ref(`galleries/${id}`)
        .once('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }

  public getPortfolio(): Observable<Gallery> {
    return new Observable<Gallery>((observer: Observer<Gallery>) => {
      firebase.database().ref(`portfolio/`)
        .once('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        }, error => {
          console.log(error);
        });
    });
  }

  public saveGallery(gallery: Gallery, id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(`galleries`).child(id.toString()).set(gallery.getFormatToSave()).then(
          () => resolve(true),
          (error) => reject(error)
        );
      }
    );
  }

  public savePortfolio(portfolio: Gallery) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(`portfolio`).set(portfolio.getFormatToSave()).then(
          () => resolve(true),
          (error) => reject(error)
        );
      }
    );
  }

  public deleteGallery(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(`galleries`).child(id.toString()).remove().then(
          () => resolve(true),
          (error) => reject(error)
        );
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
