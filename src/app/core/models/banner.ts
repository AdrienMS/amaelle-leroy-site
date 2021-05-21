class Background {
    public blur: boolean;
    public image: boolean;
    public color: string;
}

class OptionsBanner {
    public width: string;
    public height: string;
    public size: string;
    public background: Background;
    public delay: number;
    public overlay: Overlay;
    public shadow: boolean;
}

class Overlay {
    public border: boolean;
    public borderSize: number;
    public color: string;
}

export class Banner {
    public options: OptionsBanner;
    public photos: Array<string>;

    constructor(options: OptionsBanner = null, photos: Array<string> = null) {
        this.options = options;
        this.photos = photos;
    }
}
