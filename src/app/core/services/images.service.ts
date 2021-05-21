import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private imagesPath = null;
  public imagesSubject: Subject<string[]> = new Subject<string[]>();

  constructor(private http: HttpClient) {}

  /**
   * @description Function to get images from Firebase
   *
   * @returns Observable<Image[]>
   */
  public getImages(): Observable<string[]> {
    return new Observable<string[]>((observer: Observer<string[]>) => {
      firebase.database().ref('images/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val() != null ? data.val() : []);
        });
    });
  }

  public getNewImages(): Observable<Image[]> {
    return new Observable<Image[]>((observer: Observer<Image[]>) => {
      firebase.database().ref('images/')
        .on('value', (data: firebase.database.DataSnapshot) => {
          const toReturn: Array<Image> = [];
          if (data.val() !== null) {
            this.imagesPath = data.val();
            Object.keys(data.val()).forEach(key => {
              toReturn.push(new Image(data.val()[key].full, data.val()[key].thumbnail, data.val()[key].pixelized, key));
            });
          }
          observer.next(toReturn);
        });
    });
  }

  /**
   * @description Function to get a single image from Firebase
   *
   * @param id The ID from databse
   */
  public getSingleImage(id: string): Observable<Image> {
    return new Observable<Image>((observer: Observer<Image>) => {
      firebase.database().ref(`images/${id}`)
        .once('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        });
    });
  }

  public getNewSingleImage(id: number): Observable<Image> {
    return new Observable<Image>((observer: Observer<Image>) => {
      firebase.database().ref(`images/${id}`)
        .once('value', (data: firebase.database.DataSnapshot) => {
          observer.next(data.val());
        });
    });
  }

  public uploadFile(file: File, images: Array<string>): Observable<string> {
    return new Observable<string>((observer: Observer<string>) => {
      const upload = firebase.storage().ref().put(file);
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        error => {
          console.error(error);
          observer.error(error);
        },
        () => {
          upload.snapshot.ref.getDownloadURL().then(
            (value: string) => {
              images.push(value);
              this.saveImages(images);
              observer.next(value);
            },
            error => { console.error(error); observer.error(error); }
          );
        }
      );
    });
  }

  public uploadNewFile(files: Array<{image: File, type: string}>): Promise<string[]> {
    return new Promise(
      (resolve, reject) => {
        Promise.all(files.map(item => this.upload(item)))
          .then((urls) => {
            this.saveNewImages(new Image(urls[0], urls[1], urls[2])).then(
              (value) => {
                urls.push(value.key);
                resolve(urls);
              }
            );
          })
          .catch((error) => reject(error));
      }
    );
  }

  private upload(file: {image: File, type: string}): Promise<string> {
    return new Promise(
      (resolve, reject) => {
        const uploadFile = firebase.storage().ref().child(`images/${file.type}-${Date.now()}`).put(file.image);
        uploadFile.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {},
          (error) => console.error(error),
          () => {
            uploadFile.snapshot.ref.getDownloadURL().then(
              (value: string) => resolve(value),
              (error) => reject(error)
            );
          }
        );
      }
    );
  }

  private saveImages(images: Array<string>) {
    firebase.database().ref('images/').set(images);
  }

  private saveNewImages(image: Image) {
    return firebase.database().ref('images/').push(image);
  }

  public deleteImage(image: Image, images: Array<Image>): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        let objectKey: string = null;
        Object.keys(this.imagesPath).forEach(key => {
          if (this.imagesPath[key].thumbnail === image.thumbnail) {
            objectKey = key;
          }
        });
        if (objectKey !== null) {
          firebase.storage().refFromURL(image.full).delete().then(
            () => console.log('Image supprimée avec succès'),
            (error) => console.log(error)
          );
          firebase.storage().refFromURL(image.thumbnail).delete().then(
            () => console.log('Image supprimée avec succès'),
            (error) => console.log(error)
          );
          firebase.storage().refFromURL(image.pixelized).delete().then(
            () => console.log('Image supprimée avec succès'),
            (error) => console.log(error)
          );
          firebase.database().ref('images/').child(objectKey).remove().then(
            () => resolve(true),
            (error) => reject(error)
          );
        } else {
          reject('Impossible de trouver la clé unique de l\'image');
        }
      }
    );
  }

  public deleteViaFunction(image: Image): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      let objectKey: string = null;
      Object.keys(this.imagesPath).forEach(key => {
        if (this.imagesPath[key].thumbnail === image.thumbnail) {
          objectKey = key;
        }
      });
      const paths: Array<string> = [];
      paths.push(await firebase.storage().refFromURL(image.full).fullPath);
      paths.push(await firebase.storage().refFromURL(image.thumbnail).fullPath);
      paths.push(await firebase.storage().refFromURL(image.pixelized).fullPath);
      this.http.post('https://us-central1-amaelleleroy-325ff.cloudfunctions.net/deleteImage', null, {params: {
        image_full: image.full,
        image_thumbnail: image.thumbnail,
        image_pixelized: image.pixelized,
        image_key: objectKey,
        image_paths: paths
      }}).pipe(
        catchError(err => { reject(err); return this.handleError(err); })
      )
      .subscribe(data => {
        if (data) { resolve(true); }
        else { console.log(false); reject(false); }
      });
    });
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
