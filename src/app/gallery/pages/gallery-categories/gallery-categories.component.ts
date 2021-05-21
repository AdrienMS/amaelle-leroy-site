import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';

import { Gallery, GalleryService, Category, CategoriesService } from '../../../core';

@Component({
  selector: 'app-gallery-categories',
  templateUrl: './gallery-categories.component.html',
  styleUrls: ['./gallery-categories.component.scss']
})
export class GalleryCategoriesPageComponent implements OnInit, OnDestroy {
  private title = 'Amaëlle Leroy - Photographe - ';
  public galleries$: Observable<Gallery[]>;
  public categories$: Observable<Category[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();
  public categoryName: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private galleryService: GalleryService,
    private categoriesService: CategoriesService,
    private titleService: Title,
    private metaService: Meta
  ) {
    router.events.subscribe(() => this.init());
  }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.categoryName = this.route.snapshot.params.category;
    this.titleService.setTitle(this.title + this.categoryName);
    this.metaService.addTags([
      {
        name: 'description',
        content: 'Amaëlle Leroy - Photographe : venez découvrir mes photos de différentes séances de ' + this.categoryName
      },
    ]);
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
      map(galleries => {
        const toReturn: Array<Gallery> = [];
        if (galleries !== null) {
          galleries.forEach((gallery) => {
            if (categories[gallery.category].name === this.categoryName) {
              toReturn.push(gallery);
            }
          });
        }
        return toReturn;
      }),
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
