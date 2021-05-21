import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, PartialObserver, Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';

import { Gallery, GalleryService, Category, CategoriesService } from '../../../core';

@Component({
  selector: 'app-single-gallery',
  templateUrl: './single-gallery.component.html',
  styleUrls: ['./single-gallery.component.scss']
})
export class SingleGalleryComponent implements OnInit, OnDestroy {

  public galleries$: Observable<Gallery[]>;
  public categories$: Observable<Category[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();
  private name: string = null;
  private galleryCategory: string = null;

  public indexToDisplay: number = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private galleryService: GalleryService,
    private categoriesService: CategoriesService
  ) {
    router.events.subscribe(() => this.init());
  }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.name = this.route.snapshot.params.name;
    this.galleryCategory = this.route.snapshot.params.category;
    this.getCategories();
  }

  private getCategories() {
    this.categoriesService.getCategories().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (categories: Array<Category>) => {
        this.getGalleries(categories);
      }
    );
  }

  private getGalleries(categories: Array<Category>) {
    this.galleries$ = this.galleryService.getGalleriesViaFunctions().pipe(
      tap(galleries => {
        let toReturn = null;
        galleries.forEach((gallery, index) => {
          if (gallery.url === this.name && categories[gallery.category].name === this.galleryCategory) {
            toReturn = gallery;
            this.indexToDisplay = index;
          }
        });
        if (toReturn === null) {
          this.router.navigate(['/404.html']);
        }
      }),
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
