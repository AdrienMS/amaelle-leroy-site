import { Image } from './image';

export class About {
    public description: string;
    public photo: Image;

    constructor(description: string = '', photo: Image = null) {
        this.description = description;
        this.photo = photo;
    }
}
