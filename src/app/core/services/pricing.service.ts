import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';

import { Pricing } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

    constructor() { }

    public getPricings(): Observable<Pricing[]> {
        return new Observable<Pricing[]>((observer: Observer<Pricing[]>) => {
            firebase.database().ref('pricing/')
                .on('value', (data: firebase.database.DataSnapshot) => {
                    let toReturn = data.val();
                    if (toReturn === null) {
                        toReturn = [];
                    }
                    observer.next(toReturn);
                }, error => {
                    console.log(error);
                });
            }
        );
    }

    public savePricings(pricings: Array<Pricing>): Promise<boolean> {
        return new Promise<boolean>(
            (resolve, reject) => {
                firebase.database().ref(`pricing`).set(pricings).then(
                    () => resolve(true),
                    (error) => reject(error)
                );
            }
        );
    }
}
