import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Gallery, GalleryService } from '../../core';

@Pipe({
  name: 'singleGallery'
})
export class SingleGalleryPipe implements PipeTransform, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private galleryService: GalleryService) {}

  transform(id: number): Observable<Gallery> {
    return this.galleryService.getSingleGallery(id).pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
