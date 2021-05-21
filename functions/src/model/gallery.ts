import { Image } from '../model/image';

export const CATEGORIES: Array<string> = [
    'Portrait',
    'Naissance',
    'Mariage',
    'Famille',
    'Couple',
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
        photos: Array<Image> = [],
        highlighted: Image = new Image(),
        url: string = '',
        category: number = 0,
        photosID: Array<string> = [],
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
        photos: Array<Image> = [],
        highlighted: Image = new Image(),
        url: string = '',
        isPublish = false,
        draft: DraftGallery = new DraftGallery(),
        category: number = 0,
        photosID: Array<string> = [],
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
}
