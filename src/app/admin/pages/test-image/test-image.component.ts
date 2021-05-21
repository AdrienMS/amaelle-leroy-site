import { Component, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

import { Image, ImagesService } from '../../../core';

@Component({
  selector: 'app-test-image',
  templateUrl: './test-image.component.html',
  styleUrls: ['./test-image.component.scss']
})
export class TestImageComponent implements OnInit {
  imgResultBeforeCompress: string;

  imgResultAfterCompress: string;

  constructor(private imagesService: ImagesService, private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress
        .compressFile(image, orientation, 75, 10)
        .then(async result => {
          console.log(result.hasOwnProperty('target'));
          console.warn(
            'Size in bytes is now:',
            this.imageCompress.byteCount(result)
          );
          const fullImage = await fetch(image).then((e) => e.blob()).then((blob) => {
            const b: any = blob;
            console.log(b);
            return b as File;
          });
          const thumbnailImage = await fetch(result).then((e) => e.blob()).then((blob) => {
            const b: any = blob;
            console.log(b);
            return b as File;
          });
          this.imagesService.uploadNewFile([{image: fullImage, type: 'full'}, {image: thumbnailImage, type: 'thumbnail'}]).then(
            (urls: Array<string>) => {
              this.imgResultBeforeCompress = urls[0];
              this.imgResultAfterCompress = urls[1];
            },
            (error) => console.log(error)
          );
        });
    });
  }

}
