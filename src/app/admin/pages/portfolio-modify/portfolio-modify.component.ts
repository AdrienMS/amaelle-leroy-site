import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

import { IntroductionService } from '../../../core';
import { PopupComponent } from '../../../shared';

@Component({
  selector: 'app-portfolio-modify',
  templateUrl: './portfolio-modify.component.html',
  styleUrls: ['./portfolio-modify.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class PortfolioModifyPageComponent implements OnInit, OnDestroy {
  public introduction$: Observable<string>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  public toModify = '';

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

  constructor(private introductionService: IntroductionService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getIntro();
  }

  private getIntro() {
    this.introduction$ = this.introductionService.getIntroduction().pipe(
      tap(val => this.toModify = val),
      takeUntil(this.unsubscribe$)
    );
  }

  public saveIntro() {
    this.introductionService.saveIntroduction(this.toModify).then(() => this.openSnackBar('Texte d\'introduction sauvegarder', true));
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
