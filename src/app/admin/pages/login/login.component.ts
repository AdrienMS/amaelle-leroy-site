import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';

import { AuthService } from '../../../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent implements OnInit {
  public isLoading = false;

  /*form variables*/
  public hide = true;
  public errorMessage = '';
  public isLock = true;
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.router.navigate(['/admin']);
        }
      }
    );
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }


  public getErrorMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return 'Rentrez une adresse email';
    }
    return this.loginForm.get('email').hasError('email') ? 'Email non valide' : '';
  }

  public onEnter() {
    this.onSubmit();
  }

  public onSubmit() {
    if (this.loginForm.get('email').hasError('required')) {
      return;
    }
    this.isLoading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/admin']);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        if (error.code === 'auth/internal-error') {
          this.errorMessage = 'Une erreur interne est survenu. Merci de contacter l\'administrateur';
        }
      }
    );
  }

}
