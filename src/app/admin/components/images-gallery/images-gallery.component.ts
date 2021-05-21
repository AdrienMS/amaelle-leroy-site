import { Component, OnInit, Input, ChangeDetectionStrategy  } from '@angular/core';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Image, ImagesService } from '../../../core';
import { ActionPopupComponent, PopupComponent } from '../../../shared';

@Component({
  selector: 'app-images-gallery',
  templateUrl: './images-gallery.component.html',
  styleUrls: ['./images-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesGalleryComponent implements OnInit {
  faMinus = faMinus;
  @Input() images: Array<Image> = null;
  @Input() onLoading = 0;

  constructor(
    private imagesService: ImagesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public addImage(image: Image) {
    this.onLoading -= 1;
    console.log('images gallerie', this.onLoading);
    const toDisplay = this.images.reverse();
    toDisplay.push(image);
    this.images = toDisplay;
  }

  public addLoadingimage(numberImage: number) {
    this.onLoading = numberImage;
    console.log(this.onLoading);
  }

  private deleteImage(image: Image) {
    this.imagesService.deleteViaFunction(image).then(
      () => this.openSnackBar('L\'image a bien été supprimée.', true),
      (error) => {
        console.log(error);
        this.openSnackBar('Une erreur est survenue. Merci de patienter ou de contacter l\'administrateur', false);
      }
    );
  }

  public openConfirm(image: Image): void {
    const m = `Vous allez supprimer une image, si elle est utilisé dans une gallerie, elle sera supprimée. Voulez-vous continuer ?`;
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '400px',
      data: {
        message: m,
        action: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteImage(image);
      }
    });
  }

  private openSnackBar(m: string, v: boolean) {
    this.snackBar.openFromComponent(PopupComponent, {
      data: {message: m, valid: v},
      duration: 5000
    });
  }

}
