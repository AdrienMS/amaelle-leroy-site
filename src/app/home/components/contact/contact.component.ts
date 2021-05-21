import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ContactService } from '../../../core';
import { PopupComponent } from '../../../shared';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;
  public errorMessage: string = null;
  // private contact: Contact = null;
  // public public_key = environment.recaptcha_public;
  public isLoading = false;
  // public center = new google.maps.LatLng(48.8041419, 2.3238622);

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      content: ['', [Validators.required]],
      // recaptchaReactive: [null, [Validators.required]]
    });
  }

  public getErrorMessage(value: string) {
    if (value !== 'phone' && this.contactForm.get(value).hasError('required')) {
      let message = '';
      switch (value) {
        case 'email':
          message = 'Vous devez préciser votre email';
          break;

        case 'name':
          message = 'Vous devez préciser votre nom';
          break;

        case 'content':
          message = 'Vous devez écrire un message';
          break;
      }
      return message;
    }

    let error = '';
    if (value === 'email') {
      error = this.contactForm.get('email').hasError('email') ? 'Email non valide' : '';
    }

    return error;
  }

  public async sendMail() {
    // // this.errorMessage = 'Messagerie en cours de développement';
    // this.isLoading = true;
    // // this.contact = new Contact(
    // //   this.contactForm.get('email').value,
    // //   this.contactForm.get('name').value,
    // //   this.contactForm.get('content').value,
    // //   new Date()
    // // );
    // await this.contactService.sendMail(
    //   this.contactForm.get('email').value,
    //   this.contactForm.get('name').value,
    //   this.contactForm.get('phone').value,
    //   this.contactForm.get('content').value,
    // ).then(() => {
    //   this.isLoading = false;
    //   this.openSnackBar('Email envoyé', true);
    //   this.contactForm = this.formBuilder.group({
    //     email: ['', [Validators.required, Validators.email]],
    //     name: ['', [Validators.required]],
    //     phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    //     content: ['', [Validators.required]]
    //   });
    // }).catch((err) => {
    //   console.log(err);
    //   this.isLoading = false;
    //   this.openSnackBar('Une erreur est survenue. Merci d\'envoyer un mail directement à contact@amaelleleroy.fr', false);
    // });
  }

  /*public async resolved(captchaResponse: string) {
    console.log(captchaResponse);
    await this.sendToFirebaseFunction(captchaResponse).subscribe(observer => {
      console.log(observer);
    });
  }*/

  /*private sendToFirebaseFunction(token) {
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
      })
    };
    return this.httpClient.post(
      'https://us-central1-amandinepaponsite.cloudfunctions.net/checkRecaptcha',
      {recaptcha: token},
      optionRequete
      );
  }*/

  public openSnackBar(m: string, v: boolean) {
    this.snackBar.openFromComponent(PopupComponent, {
      data: {message: m, valid: v},
      duration: 5000
    });
  }
}
