import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { NgxImageCompressService } from 'ngx-image-compress';

import { faTimes, faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

import { Image, ImagesService, CompressImages } from '../../../core';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss']
})
export class SelectImageComponent implements OnInit, OnDestroy, AfterViewInit {
  faTimes = faTimes; faChevronCircleLeft = faChevronCircleLeft; faChevronCircleRight = faChevronCircleRight;
  public images$: Observable<Image[]>;
  public paginatorImages: Array<Image[]> = [];
  private unsubscribe$: Subject<void> = new Subject<void>();
  public imageLoading = 0;

  @Input() displayScreen = false;
  @Input() single = false;
  @Output() emitSelectedImages = new EventEmitter<Image[]>();
  @Output() closing = new EventEmitter<boolean>();

  public selectedImages: Array<Image> = [];
  public selectedIndexPaginator = 0;

  constructor(private imagesService: ImagesService, private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {
    this.getImages();
  }

  ngAfterViewInit(): void {
    window.addEventListener('imageUpload', (event) => {
      this.getUploadImage(event);
    });
  }

  private getImages() {
    this.images$ = this.imagesService.getNewImages().pipe(
      tap(images => {
        this.sizePaginator(images);
        // this.selectedImages.map(image => {
        //   if (image.key === '') {
        //     images.map(imageFirebase => {
        //       if (imageFirebase.full === image.full) {
        //         image.key = imageFirebase.key;
        //       }
        //     });
        //   }
        // });
        // console.log(this.selectedImages);
        return images;
      }),
      takeUntil(this.unsubscribe$)
    );
  }

  private sizePaginator(images: Image[]) {
    this.paginatorImages = [];
    const t = images.reverse();
    let indexInCell = 0;
    const tab: Array<Image> = [];
    images.forEach(image => {
      if (indexInCell === 40) {
        indexInCell = 0;
        this.paginatorImages.push([...tab]);
        tab.splice(0);
      }
      tab.push(image);
      indexInCell += 1;
    });
    this.paginatorImages.push([...tab]);
  }

  public toggleSelect(image: Image) {
    if (this.single) {
      this.selectedImages = [];
    }
    let indexToRemove: number = null;
    console.log(this.selectedImages, image);
    for (let i = 0; i < this.selectedImages.length; i += 1) {
      if (this.selectedImages[i].key === image.key) {
        indexToRemove = i;
      }
    }
    if (indexToRemove !== null) {
      this.selectedImages.splice(indexToRemove, 1);
    } else {
      this.selectedImages.push(image);
    }
  }

  public isExist(image: Image): boolean {
    if (this.selectedImages.filter(f => f.key === image.key).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  public getIndex(image: Image): number {
    return this.selectedImages.findIndex(f => f.key === image.key);
  }

  public valid() {
    console.log(this.selectedImages);
    if (this.imageLoading === 0) {
      this.emitSelectedImages.emit(this.selectedImages);
      this.cleanAndClose();
    }
  }

  public cleanAndClose() {
    this.selectedImages = [];
    this.selectedIndexPaginator = 0;
    this.closing.emit(true);
  }

  public previous() {
    if (this.selectedIndexPaginator > 0) {
      this.selectedIndexPaginator -= 1;
    }
  }

  public next() {
    if (this.selectedIndexPaginator < this.paginatorImages.length - 1) {
      this.selectedIndexPaginator += 1;
    }
  }

  public uploadImages(files: FileList) {
    this.imageLoading = files.length;
    const compress: CompressImages = new CompressImages(this.imageCompress, this.imagesService);
    compress.uploadFile(files);
  }

  public getUploadImage(event) {
    this.imageLoading -= 1;
    console.log(event);
    this.selectedImages.push(event.detail);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
