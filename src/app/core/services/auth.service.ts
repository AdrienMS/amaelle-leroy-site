import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * @description
   * Function to sign in a user via Firebase
   *
   * @param email user's email
   *
   * @param password user's password
   */
  public signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve(true);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /**
   * @description
   * Function to sign out user
   */
  public signOutUser() {
    firebase.auth().signOut();
  }
}
