import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { faTrashAlt, faPencilAlt, faCheck, faPencilRuler } from '@fortawesome/free-solid-svg-icons';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Gallery, GalleryService } from '../../../core';
import { ActionPopupComponent, PopupComponent } from '../../../shared';

@Component({
  selector: 'app-galleries-list-admin',
  templateUrl: './galleries-list.component.html',
  styleUrls: ['./galleries-list.component.scss']
})
export class GalleriesListPageComponent implements OnInit, OnDestroy {
  faTrashAlt = faTrashAlt; faPencilAlt = faPencilAlt;
  faCheck = faCheck; faPencilRuler = faPencilRuler;

  public galleries$: Observable<Gallery[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  public lengthGalleries: number = null;

  constructor(
    private galleryService: GalleryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getGalleries();
  }

  private getGalleries() {
    this.galleries$ = this.galleryService.getGalleriesViaFunctions().pipe(
      tap(galleries => this.lengthGalleries = galleries !== null ? galleries.length : 0),
      takeUntil(this.unsubscribe$)
    );
  }

  public openConfirm(index: number, gallery: Gallery): void {
    const m = `Vous allez supprimer la galerie : ${gallery.name}. Voulez-vous continuer ?`;
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '300px',
      data: {
        message: m,
        action: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(index);
      }
    });
  }

  private openSnackBar(m: string, v: boolean) {
    this.snackBar.openFromComponent(PopupComponent, {
      data: {message: m, valid: v},
      duration: 5000
    });
  }

  private onDelete(index: number) {
    this.galleryService.deleteGallery(index).then(
      () => this.openSnackBar('La galerie a été supprimée', true),
      (error) => {
        console.log(error);
        this.openSnackBar('Une erreur est survenue. Merci de patienter ou de contacter l\'administrateur', false);
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
