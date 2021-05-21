import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import firebase from 'firebase/app';
import 'firebase/analytics';

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {
    constructor(private http: HttpClient) {}

    public setScreen(name: string) {
        firebase.analytics().setCurrentScreen(name);
    }
}
