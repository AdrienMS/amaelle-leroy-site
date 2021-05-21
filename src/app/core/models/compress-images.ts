import { NgxImageCompressService } from 'ngx-image-compress';

import { Image } from '../models/image';
import { ImagesService } from '../services';

export class CompressImages {
    constructor(
        private imageCompress: NgxImageCompressService,
        private imagesService: ImagesService,
        private parent: any = null
    ) {}

    private compressImage(image: string, orientation: number): Promise<Image> {
        return new Promise<Image>(
            (resolve, reject) => {
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
                            resolve(new Image(urls[0], urls[1]));
                        },
                        (error) => reject(error)
                    );
                });
            }
        );
    }

    private compress50(image, orientation) {
        return this.imageCompress.compressFile(image, orientation, 50, 30).then(result => result);
    }

    private compress99(image, orientation) {
        return this.imageCompress.compressFile(image, orientation, 1, 10).then(result => result);
    }

    private compressFull(image, orientation, ratio) {
        return this.imageCompress.compressFile(image, orientation, ratio, 70).then(result => result);
    }

    private async convertToFile(image) {
        return await fetch(image).then((e) => e.blob()).then((blob) => {
            const b: any = blob;
            return b as File;
        });
    }

    private uploadToStorage(image: string, orientation: number) {
        return new Promise<Image>(
            async (resolve, reject) => {
                try {
                    const image50 = await this.compress50(image, orientation);
                    const image99 = await this.compress99(image, orientation);

                    const fullImage = await this.convertToFile(image);
                    const thumbnailImage = await this.convertToFile(image50);
                    const pixelizedImage = await this.convertToFile(image99);

                    this.imagesService.uploadNewFile(
                        [{image: fullImage, type: 'full'}, {image: thumbnailImage, type: 'thumbnail'}, {image: pixelizedImage, type: 'pixelized'}]
                    ).then(
                        (urls: Array<string>) => {
                            resolve(new Image(urls[0], urls[1], urls[2], urls[3]));
                        },
                        (error) => reject(error)
                    );
                }
                catch (error) {
                    console.log(error);
                }
            }
        );
    }

    public uploadFile(files: FileList): Promise<Image[]> {
        return new Promise<Image[]>(
            (resolve, reject) => {
                const v: Array<Image> = [];
                let e = null;
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < files.length; i += 1) {
                    const reader = new FileReader();
                    reader.readAsDataURL(files[i]);
                    reader.onload = async () => {
                        let toUpload = reader.result as string;
                        const full = await this.convertToFile(reader.result as string);
                        if (full.size > 1000000) {
                            toUpload = await this.compressFull(toUpload, -1, (1000000 * 100) / full.size);
                        }
                        this.uploadToStorage(toUpload, -1).then(
                            (value) => {
                                v.push(value);
                                window.dispatchEvent(new CustomEvent('imageUpload', {detail : value}));
                            },
                            (error) => e = error
                        );
                    };
                }
                if (e !== null) {
                    reject(e);
                } else {
                    resolve(v);
                }
            }
        );
    }
}
