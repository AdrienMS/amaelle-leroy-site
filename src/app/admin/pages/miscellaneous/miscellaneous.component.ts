import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FooterService, Image } from '../../../core';
import { PopupComponent } from '../../../shared';

@Component({
  selector: 'app-miscellaneous',
  templateUrl: './miscellaneous.component.html',
  styleUrls: ['./miscellaneous.component.scss']
})
export class MiscellaneousPageComponent implements OnInit, OnDestroy {
  public footer$: Observable<string>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  public showSelectedImage = false;
  public single = true;

  constructor(private footerService: FooterService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
      this.footer$ = this.footerService.getFooter().pipe(takeUntil(this.unsubscribe$));
  }

  public getNewImages(images: Array<Image>) {
    this.footerService.saveFooter(images[0].key).then(
        () => this.openSnackBar('Pied de page sauvegradées', true),
        (error) => { console.error(error); this.openSnackBar('Une erreur est survenue. Merci de contacter l\'administrateur', false); }
    );
  }

  public toggleDisplayScreen() {
    this.showSelectedImage = !this.showSelectedImage;
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
