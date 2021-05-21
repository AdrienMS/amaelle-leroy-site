import { Image } from './image';

export const CATEGORIES: Array<string> = [
    'Couple',
    'Grossesse',
    'Naissance',
    'Mariage',
    'Famille'
];

export class DraftGallery {
    public name: string;
    public photos: Array<Image>;
    public highlighted: Image;
    public url: string;
    public category: number;
    public photosID: Array<string>;
    public highlightedId: string;

    constructor(
        name: string = '',
        photos: Array<Image> = null,
        highlighted: Image = null,
        url: string = '',
        category: number = null,
        photosID: Array<string> = null,
        highlightedId: string = ''
    ) {
        this.name = name;
        this.photos = photos;
        this.highlighted = highlighted;
        this.url = url;
        this.category = category;
        this.photosID = photosID;
        this.highlightedId = highlightedId;
    }
}

export class Gallery {
    public name: string;
    public photos: Array<Image>;
    public highlighted: Image;
    public url: string;
    public isPublish: boolean;
    public draft: DraftGallery;
    public category: number;
    public photosID: Array<string>;
    public highlightedId: string;

    constructor(
        name: string = '',
        photos: Array<Image> = null,
        highlighted: Image = null,
        url: string = '',
        isPublish = false,
        draft: DraftGallery = null,
        category: number = null,
        photosID: Array<string> = null,
        highlightedId: string = ''
    ) {
        this.name = name;
        this.photos = photos;
        this.highlighted = highlighted;
        this.url = url;
        this.isPublish = isPublish;
        this.draft = draft;
        this.category = category;
        this.photosID = photosID;
        this.highlightedId = highlightedId;
    }

    public getFormatToSave(): {
        name: string,
        url: string,
        isPublish: boolean,
        draft: DraftGallery,
        category: number,
        photosID: Array<string>,
        highlightedId: string
    } {
        return {
            name: this.name,
            url: this.url,
            isPublish: this.isPublish,
            draft: this.draft,
            category: this.category,
            photosID: this.photosID,
            highlightedId: this.highlightedId
        };
    }
}
