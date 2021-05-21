import { Image } from './image';

export class Category {
    public name: string;
    public photo: Image;

    constructor(name: string = '', photo: Image = null) {
        this.name = name;
        this.photo = photo;
    }
}
