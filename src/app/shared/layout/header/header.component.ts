import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';

import { faInfoCircle, faWallet, faCamera, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faImages, faEnvelope} from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

import { PagesService, Page, GalleryService, Gallery, Category, CategoriesService } from '../../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  faInfoCircle = faInfoCircle; faImages = faImages; faEnvelope = faEnvelope;
  faFacebookF = faFacebookF; faInstagram = faInstagram; faWallet = faWallet;
  faCamera = faCamera; faSortUp = faSortUp;

  public pages$: Observable<Page[]>;
  public galleries$: Observable<Gallery[]>;
  public galleryCategories$: Observable<Category[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  public isToggle = false;
  public openSubItems = false;

  constructor(
    private pagesService: PagesService,
    private galleryService: GalleryService,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getPages();
    this.getGalleries();
  }

  private getPages() {
    this.pages$ = this.pagesService.getPages().pipe(takeUntil(this.unsubscribe$));
  }

  private getGalleries() {
    this.galleries$ = this.galleryService.getGalleries().pipe(takeUntil(this.unsubscribe$));
  }

  private getCategories() {
    this.galleryCategories$ = this.categoriesService.getCategories().pipe(takeUntil(this.unsubscribe$));
  }

  public toggleMenu() {
    this.isToggle = !this.isToggle;
  }

  public toggleOpenSubItems() {
    this.openSubItems = !this.openSubItems;
  }

  public closeMenu() {
    this.isToggle = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
