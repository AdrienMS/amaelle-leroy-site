import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Image, ImagesService } from '../../core';

/**
 * @Pipe
 *
 * @description Pipe to get a single image from Firebase.
 * It will call the database via ImagesServices
 */
@Pipe({
  name: 'singleImage'
})
export class SingleImagePipe implements PipeTransform, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private imagesService: ImagesService) {}

  transform(value: string): Observable<Image> {
    return this.imagesService.getSingleImage(value).pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
