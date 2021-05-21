/**
 * ```ts
 * class Image {
 *      full: string;
 *      thumbnail: string;
 *      pixelized: string;
 * }
 * ```
 */
export class Image {
    public full: string;
    public thumbnail: string;
    public pixelized: string;
    public key: string;

    constructor(full: string = '', thumbnail: string = '', pixelized: string = '', key: string = '') {
        this.full = full;
        this.thumbnail = thumbnail;
        this.pixelized = pixelized;
        this.key = key;
    }

    public getFormParams(): Array<{full: string, thumbnail: string, pixelized: string, type: string, required: boolean}> {
        return [
            {full: 'Nom', thumbnail: 'Nom', pixelized: 'pixel', type: 'input', required: true},
            {full: 'Chemin', thumbnail: 'Nom', pixelized: 'pixel', type: 'path', required: true}
        ];
    }
}
