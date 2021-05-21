import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { BaseComponent } from '../base/base.component';
import { Image, ImagesService } from '../../../../core';

@Component({
  selector: 'app-image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.sass']
})
export class ImageSelectionComponent extends BaseComponent implements OnInit, OnDestroy {
  faPlus = faPlus;

  public images$: Observable<Image[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();
  private images: Array<Image>;

  public isSelected: Array<boolean> = [];

  public showImageSelector = false;

  constructor(private imagesService: ImagesService) {
    super();
  }

  ngOnInit() {
    this.getImages();
  }

  private getImages() {
    // this.images$ = this.imagesService.getImages()
    //   .pipe(
    //     tap(images => {
    //       this.images = images;
    //       this.initSelectedArray();
    //     }),
    //     takeUntil(this.unsubscribe$)
    //   );
  }

  private initSelectedArray() {
    this.isSelected = [];
    for (let i = 0; i < this.images.length; i += 1) {
      this.isSelected.push(this.field.value === i ? true : false);
    }
  }

  public onShow() {
    this.showImageSelector = true;
  }

  public onAddImage(event) {}

  public onSelectImage(index: number) {
    for (let i = 0; i < this.isSelected.length; i += 1) {
      this.isSelected[i] = false;
      if (i === index) { this.isSelected[i] = true; }
    }
  }

  public onCancel() {
    this.reset();
  }

  public onValidate() {
    this.field.value = this.isSelected.findIndex(element => element === true);
    this.reset();
  }

  public reset() {
    this.showImageSelector = false;
    this.initSelectedArray();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
