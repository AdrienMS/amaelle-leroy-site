import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil, map } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

import { Image, About, AboutService } from '../../../core';
import { PopupComponent } from '../../../shared';

@Component({
  selector: 'app-about-modify',
  templateUrl: './about-modify.component.html',
  styleUrls: ['./about-modify.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class AboutModifyPageComponent implements OnInit, OnDestroy {
  faPencilAlt = faPencilAlt;
  public showSelectedImage = false;
  public single = true;
  private unsubscribe$: Subject<void> = new Subject<void>();
  public about$: Observable<About>;
  public aboutModify: About = null;

  // tslint:disable-next-line: ban-types
  public fontFamily: Object = {
    default: 'Montserra',
    items: [
      {text: 'Roboto', value: 'Roboto',  command: 'Font', subCommand: 'FontName'},
      {text: 'Fontfabric', value: 'Fontfabric, sans-serif',  command: 'Font', subCommand: 'FontName'},
      {text: 'FontfabricF', value: 'Fontfabric Fill, sans-serif',  command: 'Font', subCommand: 'FontName'},
      {text: 'FontfabricD', value: 'Fontfabric Doodles, sans-serif',  command: 'Font', subCommand: 'FontName'},
      {text: 'FontfabricDF', value: 'Fontfabric Doodles Fill, sans-serif',  command: 'Font', subCommand: 'FontName'},
      {text: 'Montserra', value: 'Montserra, sans-serif',  command: 'Font', subCommand: 'FontName'},
    ]
  };

  public tools: object = {
    type: 'Expand',
    items: [
      'Bold', 'Italic', 'Underline', 'StrikeThrough',
      'FontName', 'FontSize', 'FontColor', 'LowerCase', 'UpperCase', '|',
      'Alignments', 'OrderedList', 'UnorderedList',
      'Outdent', 'Indent', '|',
      'CreateLink', '|', 'ClearFormat',
      '|', 'Undo', 'Redo']
    };

  constructor(private snackBar: MatSnackBar, private aboutService: AboutService) { }

  ngOnInit(): void {
    this.getAbout();
  }

  private getAbout() {
    this.about$ = this.aboutService.getAbout().pipe(
      tap(val => this.aboutModify = new About(val.description, val.photo)),
      takeUntil(this.unsubscribe$)
    );
  }

  public getNewImages(images: Array<Image>) {
    this.aboutModify.photo = images[0];
    this.openSnackBar('La photo a été modifiée', true);
  }

  public toggleDisplayScreen() {
    this.showSelectedImage = !this.showSelectedImage;
  }

  public saveAbout() {
    console.log(this.aboutModify);
    this.aboutService.saveAbout(this.aboutModify).then(
      () => this.openSnackBar('Les informations ont été sauvegardé', true),
      error => { console.error(error); this.openSnackBar('Une erreur est survenue. Merci de contacter l\'administrateur', false); }
    );
  }

  private openSnackBar(m: string, v: boolean) {
    this.snackBar.openFromComponent(PopupComponent, {
      data: {message: m, valid: v},
      duration: 5000
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
