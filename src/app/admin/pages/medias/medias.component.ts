import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { NgxImageCompressService } from 'ngx-image-compress';

import { ImagesService, Image, CompressImages } from '../../../core';
import { ImagesGalleryComponent } from '../../components';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.scss']
})
export class MediasPageComponent implements OnInit, OnDestroy, AfterViewInit {
  public images$: Observable<Image[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  public imageLoading = 0;
  private totalLoading = 0;

  public progress = -1;

  @ViewChild(ImagesGalleryComponent)
  private imageGalleryComponent: ImagesGalleryComponent;

  constructor(public imagesService: ImagesService, public imageCompress: NgxImageCompressService) {
  }

  ngOnInit(): void {
    this.getImages();
  }

  ngAfterViewInit(): void {
    window.addEventListener('imageUpload', () => {
      this.getUploadImage();
    });
  }

  private getImages() {
    this.images$ = this.imagesService.getNewImages().pipe(
      map(images => images.reverse()),
      takeUntil(this.unsubscribe$)
    );
  }

  public uploadImages(files: FileList) {
    this.imageLoading = files.length;
    this.totalLoading = files.length;
    this.imageGalleryComponent.addLoadingimage(3);
    const compress: CompressImages = new CompressImages(this.imageCompress, this.imagesService);
    compress.uploadFile(files);
  }

  public getUploadImage() {
    this.imageLoading -= 1;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
