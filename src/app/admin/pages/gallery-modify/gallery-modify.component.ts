import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil, map } from 'rxjs/operators';

import { faPlus, faTrashAlt, faMinus } from '@fortawesome/free-solid-svg-icons';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Gallery, DraftGallery, GalleryService, Image, Category, CategoriesService } from '../../../core';
import { PopupComponent } from '../../../shared';

@Component({
  selector: 'app-gallery-modify',
  templateUrl: './gallery-modify.component.html',
  styleUrls: ['./gallery-modify.component.scss']
})
export class GalleryModifyPageComponent implements OnInit, OnDestroy {
  faPlus = faPlus; faTrashAlt = faTrashAlt; faMinus = faMinus;

  public path: number = null;
  public isPortfolio = false;

  public categories$: Observable<Category[]>;
  public gallery$: Observable<Gallery>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  public draft: DraftGallery = null;

  public showSelectedImage = false;
  private indexToPush: number;

  private overedElements: Array<HTMLElement> = [];
  private toTransfer: number = null;

  public single = false;

  public activeButtons = false;

  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService,
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getUrl();
    if (this.isPortfolio) { this.getPortfolio(); }
    else { this.getCategories(); this.getGallery(); }
  }

  private getUrl() {
    const params = this.route.snapshot.params;
    if (params.id === undefined) {
      this.path = null;
    } else {
      this.path = params.id;
    }

    if (this.path === null) {
      if (this.route.snapshot.url[0].path.includes('portfolio')) {
        this.isPortfolio = true;
      }
    }
  }

  private getCategories() {
    this.categories$ = this.categoriesService.getCategories().pipe(takeUntil(this.unsubscribe$));
  }

  private getGallery() {
    if (this.path !== null) {
      this.gallery$ = this.galleryService.getSingleGalleryViaFunctions(this.path).pipe(
        map(gallery => {
          if (gallery === null) {
            gallery = new Gallery('', [], null, '', false, null, null, [], '');
          }
          return gallery;
        }),
        tap(gallery => {
          if (gallery.draft === null || gallery.draft === undefined) {
            gallery.draft = new DraftGallery(
                                  gallery.name,
                                  gallery.photos,
                                  gallery.highlighted,
                                  gallery.url,
                                  gallery.category,
                                  gallery.photosID,
                                  gallery.highlightedId
            );
          }
          if (gallery.draft.category === gallery.category
            && gallery.draft.highlightedId === gallery.highlightedId
            && gallery.draft.name === gallery.name
            && gallery.draft.photosID === gallery.photosID) {
              this.activeButtons = false;
          } else {
            this.activeButtons = true;
          }
          this.draft = gallery.draft;
          return gallery;
        }),
        takeUntil(this.unsubscribe$)
      );
    }
  }

  private getPortfolio() {
    this.gallery$ = this.galleryService.getSingleGalleryViaFunctions(null, true).pipe(
      map(gallery => {
        if (gallery === null) {
          gallery = new Gallery('', [], null, '', false, null, null, [], '');
        }
        return gallery;
      }),
      tap(gallery => {
        if (gallery.draft === null || gallery.draft === undefined) {
          gallery.draft = new DraftGallery(
            gallery.name,
            gallery.photos,
            gallery.highlighted,
            gallery.url,
            gallery.category,
            gallery.photosID,
            gallery.highlightedId
          );
        }
        if (gallery.draft.category === gallery.category
          && gallery.draft.highlightedId === gallery.highlightedId
          && gallery.draft.name === gallery.name
          && gallery.draft.photosID === gallery.photosID) {
            this.activeButtons = false;
        } else {
          this.activeButtons = true;
        }
        console.log(gallery);
        this.draft = gallery.draft;
        return gallery;
      }),
      takeUntil(this.unsubscribe$)
    );
  }

  public addImage(index: number) {
    this.single = false;
    this.showSelectedImage = true;
    this.indexToPush = index;
  }

  public selectSingleImage() {
    this.single = true;
    this.showSelectedImage = true;
  }

  public getNewImages(images: Array<Image>) {
    this.activeButtons = true;
    if (this.single) {
      this.draft.highlighted = images[0];
      this.draft.highlightedId = images[0].key;
      this.openSnackBar('L\'image mise en avant à été changé avec succès', true);
    } else {
      images.forEach(i => {
        if (this.indexToPush !== -1) {
          this.draft.photos.splice(this.indexToPush, 0, i);
          this.draft.photosID.splice(this.indexToPush, 0, i.key);
          this.indexToPush += 1;
        } else {
          if (this.draft.photos !== null) {
            this.draft.photosID.push(i.key);
            this.draft.photos.push(i);
          } else {
            this.draft.photosID = [i.key];
            this.draft.photos = [i];
          }
        }
      });
      this.openSnackBar('Images ajoutées avec succès', true);
    }
  }

  public toggleDisplayScreen() {
    this.showSelectedImage = false;
    this.single = false;
  }

  public deleteImage(index: number) {
    this.draft.photos.splice(index, 1);
    this.draft.photosID.splice(index, 1);
    this.activeButtons = true;
  }

  @HostListener('document:dragstart', ['$event'])
  handleDragStart($event) {
    $event.path[2].style.opacity = '0.4';
    $event.dataTransfer.effectAllowed = 'move';
    // tslint:disable-next-line: radix
    this.toTransfer = parseInt($event.target.id);
  }

  @HostListener('document:dragend', ['$event'])
  handleDragEnd($event) {
    $event.path[2].style.opacity = '1';
    this.overedElements.forEach(element => {
      element.classList.remove('over');
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < element.children.length; i += 1) {
        if (element.children[i].className.includes('example-custom-placeholder')) {
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < element.children[i].children.length; j += 1) {
            const c = element.children[i].children[j];
            if (c.className.includes('photo')) {
              c.classList.remove('over');
            }
          }
        }
      }
    });
    this.overedElements = [];
  }

  @HostListener('document:dragover', ['$event'])
  handleDragOver($event) {
    $event.preventDefault();
    return false;
  }

  @HostListener('document:dragenter', ['$event'])
  handleDragEnter($event) {
    $event.path[0].classList.add('over');
    this.overedElements.push($event.path[2]);
  }

  @HostListener('document:dragleave', ['$event'])
  handleDragLeave($event) {
    $event.path[0].classList.remove('over');
    const indexToRemove = this.overedElements.findIndex(f => f === $event.path[2]);
    this.overedElements.splice(indexToRemove, 1);
  }

  @HostListener('document:drop', ['$event'])
  handleDrop($event) {
    if ($event.target.className.includes('photo')) {
      this.transfertPhotos($event.target.id);
    }
  }

  private transfertPhotos(goal: number) {
    const t = this.draft.photos[this.toTransfer];
    const ti = this.draft.photosID[this.toTransfer];
    this.draft.photos.splice(this.toTransfer, 1);
    this.draft.photos.splice(goal, 0, t);
    this.draft.photosID.splice(this.toTransfer, 1);
    this.draft.photosID.splice(goal, 0, ti);
    this.activeButtons = true;
  }

  public saveDraft(gallery: Gallery) {
    gallery.draft = this.draft;
    if (this.isPortfolio) {
      this.galleryService.savePortfolio(gallery).then(
        () => this.openSnackBar('Brouillon sauvegardé avec succès', true),
        (error) => {
          console.log(error);
          this.openSnackBar('Une erreur est survenue. Merci de patienter ou de contacter l\'administrateur', false);
        }
      );
    } else {
      this.galleryService.saveGallery(gallery, this.path).then(
        () => this.openSnackBar('Brouillon sauvegardé avec succès', true),
        (error) => {
          console.log(error);
          this.openSnackBar('Une erreur est survenue. Merci de patienter ou de contacter l\'administrateur', false);
        }
      );
    }
  }

  public publishDraft(gallery: Gallery) {
    gallery.name = this.draft.name;
    gallery.highlighted = this.draft.highlighted;
    gallery.highlightedId = this.draft.highlightedId;
    gallery.photos = this.draft.photos;
    gallery.photosID = this.draft.photosID;
    gallery.category = this.draft.category;
    gallery.url = gallery.name.replace(/[ \/'",.–]/g, '-').toLowerCase().replace(/[-]{2,}/g, '-');
    gallery.draft = null;
    gallery.isPublish = true;
    if (this.isPortfolio) {
      this.galleryService.savePortfolio(gallery).then(
        () => { this.openSnackBar('Portfolio publié avec succès', true); this.activeButtons = false; },
        (error) => {
          console.log(error);
          this.openSnackBar('Une erreur est survenue. Merci de patienter ou de contacter l\'administrateur', false);
        }
      );
    } else {
      this.galleryService.saveGallery(gallery, this.path).then(
        () => { this.openSnackBar('Galerie publiée avec succès', true); this.activeButtons = false; },
        (error) => {
          console.log(error);
          this.openSnackBar('Une erreur est survenue. Merci de patienter ou de contacter l\'administrateur', false);
        }
      );
    }
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
