export class Pricing {
    public name: string;
    public price: string;
    public items: Array<string>;
    public textOnGalleries: string;
    public galleriesID: Array<number>;

    constructor(
        name: string = '',
        price: string = '',
        items: Array<string> = [],
        textOnGalleries: string = '',
        galleriesID: Array<number> = []
    ) {
        this.name = name;
        this.price = price;
        this.items = items;
        this.textOnGalleries = textOnGalleries;
        this.galleriesID = galleriesID;
    }
}
