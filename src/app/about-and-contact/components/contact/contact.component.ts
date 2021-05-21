import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ContactService } from '../../../core';
import { PopupComponent } from '../../../shared';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;
  public errorMessage: string = null;
  public isLoading = false;
  public activeErrorMessageOnContent = false;

  public tools: object = {
    type: 'Expand',
    items: [],
    enable: false
  };

  public content: string;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      pricing: ['', [Validators.required]],
      content: ['', [Validators.required]],
      valid: ['', [Validators.required]],
    });
  }

  public getErrorMessage(value: string) {
    if (this.contactForm.get(value).hasError('required')) {
      if (
        (this.contactForm.get(value).value === '' || this.contactForm.get(value).value === null)
        && value !== 'content'
        && value !== 'pricing'
        && !this.activeErrorMessageOnContent) {
        return;
      }
      let message = '';
      switch (value) {
        case 'email':
          message = 'Email non valide';
          break;

        case 'name':
          message = 'Vous devez préciser votre nom';
          break;

        case 'phone':
          message = 'Téléphone non valide';
          break;

        case 'pricing':
          message = 'Vous devez sélectionner une préstation';
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
    if (value === 'phone') {
      error = this.contactForm.get('phone').invalid ? 'Téléphone non valide' : '';
    }

    return error;
  }

  public async sendMail() {
    this.isLoading = true;
    await this.contactService.sendMail(
      this.contactForm.get('email').value,
      this.contactForm.get('name').value,
      this.contactForm.get('phone').value,
      this.contactForm.get('pricing').value,
      this.contactForm.get('content').value
    ).then(() => {
      this.isLoading = false;
      this.openSnackBar('Email envoyé', true);
      this.contactForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
        pricing: ['', [Validators.required]],
        content: ['', [Validators.required]],
        valid: ['', [Validators.required]],
      });
    }).catch((err) => {
      console.log(err);
      this.isLoading = false;
      this.activeErrorMessageOnContent = false;
      this.openSnackBar('Une erreur est survenue. Merci d\'envoyer un mail directement à contact@amaelleleroy.fr', false);
    });
  }

  public focusFunction() {
    document.getElementById('richtext_editor').classList.add('focus');
  }

  public focusOutFunction() {
    if (this.contactForm.get('content').value !== '') {
      return;
    }
    this.activeErrorMessageOnContent = true;
    document.getElementById('richtext_editor').classList.remove('focus');
  }

  public openSnackBar(m: string, v: boolean) {
    this.snackBar.openFromComponent(PopupComponent, {
      data: {message: m, valid: v},
      duration: 5000
    });
  }
}
