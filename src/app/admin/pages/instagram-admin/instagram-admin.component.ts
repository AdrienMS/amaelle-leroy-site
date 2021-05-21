import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

import { Insta, InstaService } from '../../../core';
import { PopupComponent } from '../../../shared';

@Component({
  selector: 'app-instagram-admin',
  templateUrl: './instagram-admin.component.html',
  styleUrls: ['./instagram-admin.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class InstagramAdminComponent implements OnInit , OnDestroy {
  public insta$: Observable<Insta>;
  private unsubscribe$: Subject<void> = new Subject<void>();
  public insta: Insta;

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

  constructor(private snackBar: MatSnackBar, private instaService: InstaService) { }

  ngOnInit(): void {
    this.getInsta();
  }

  private getInsta() {
    this.insta$ = this.instaService.getInsta().pipe(
      tap(insta => this.insta = insta),
      takeUntil(this.unsubscribe$)
    );
  }

  public saveInsta() {
    this.instaService.saveInsta(this.insta).then(
      () => this.openSnackBar('Informations d\'instagram enregistrés', true),
      (error) => {
        console.error(error);
        this.openSnackBar('Un problème est survenue, merci de contacter l\'administrateur', false);
      }
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
