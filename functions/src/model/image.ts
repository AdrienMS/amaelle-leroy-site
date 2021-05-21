export class Image {
    public full: string;
    public thumbnail: string;
    public pixelized: string;

    constructor(full: string = '', thumbnail: string = '', pixelized: string = '') {
        this.full = full;
        this.thumbnail = thumbnail;
        this.pixelized = pixelized;
    }
}