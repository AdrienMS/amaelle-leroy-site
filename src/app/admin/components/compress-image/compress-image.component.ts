import { Component } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

import { Image, ImagesService } from '../../../core';

@Component({
  selector: 'app-compress-image',
  template: '',
})
export class CompressImageComponent {
  public imageLoading = 0;
  public selectedImages: Array<Image> = [];

  constructor(public imageCompress: NgxImageCompressService, public imagesService: ImagesService) { }

  private compressImage(image: string, orientation: number, callback: (value: Array<string>) => any) {
    console.log('compressImage');
    this.imageCompress
      .compressFile(image, orientation, 75, 10)
      .then(async result => {
        const fullImage = await fetch(image).then((e) => e.blob()).then((blob) => {
          const b: any = blob;
          return b as File;
        });
        const thumbnailImage = await fetch(result).then((e) => e.blob()).then((blob) => {
          const b: any = blob;
          return b as File;
        });
        this.imagesService.uploadNewFile(
          [{image: fullImage, type: 'full'}, {image: thumbnailImage, type: 'thumbnail'}]
        ).then(
          (urls: Array<string>) => {
            if (this.imageLoading > 0) {
              this.imageLoading -= 1;
            }
            callback(urls);
          },
          (error) => console.log(error)
        );
    });
  }

  private compress75(image, orientation) {
    return this.imageCompress.compressFile(image, orientation, 75, 10).then(result => result);
  }

  private compress99(image, orientation) {
    return this.imageCompress.compressFile(image, orientation, 99, 10).then(result => result);
  }

  private async uploadToStorage(image: string, orientation: number, callback: (value: Array<string>) => any) {
    console.log('uploadToStorage');
    try {
      const image75 = await this.compress75(image, orientation);
      const image99 = await this.compress99(image, orientation);

      const fullImage = await fetch(image).then((e) => e.blob()).then((blob) => {
        const b: any = blob;
        return b as File;
      });
      console.log(fullImage);
      const thumbnailImage = await fetch(image75).then((e) => e.blob()).then((blob) => {
        const b: any = blob;
        return b as File;
      });
      const pixelizedImage = await fetch(image99).then((e) => e.blob()).then((blob) => {
        const b: any = blob;
        return b as File;
      });
      console.log(thumbnailImage, pixelizedImage);

      this.imagesService.uploadNewFile(
        [{image: fullImage, type: 'full'}, {image: thumbnailImage, type: 'thumbnail'}, {image: pixelizedImage, type: 'pixelized'}]
      ).then(
        (urls: Array<string>) => {
          if (this.imageLoading > 0) {
            this.imageLoading -= 1;
          }
          callback(urls);
        },
        (error) => console.log(error)
      );
    }
    catch (error) {
      console.log(error);
    }
  }

  public uploadFile(files: FileList, callback: (value: Array<string>) => any) {
    console.log('uploadFiles', files);
    this.imageLoading = files.length;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i += 1) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        // this.compressImage(reader.result as string, -1, callback);
        this.uploadToStorage(reader.result as string, -1, callback);
      };
    }
  }

}
