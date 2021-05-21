import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// const thumbnail = require('image-thumbnail');
import { ImagesService } from '../../core';

@Pipe({
  name: 'thumbnailImage'
})
export class ThumbnailImagePipe implements PipeTransform, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private imagesService: ImagesService) {}

  transform(path: string): Observable<string> {
    // return this.imagesService.compressImage(path).pipe(takeUntil(this.unsubscribe$));
    return null;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
