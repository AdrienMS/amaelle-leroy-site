import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';

import { GalleryService, Gallery } from '../../../core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {
  public portfolio$: Observable<Gallery>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.getPortfolio();
  }

  private getPortfolio() {
    this.portfolio$ = this.galleryService.getSingleGalleryViaFunctions(null, true).pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
