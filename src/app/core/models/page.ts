export class Page {
    public name: string;
    public url: string;
    public components: Array<number>;
    public isPublish: boolean;
    public hasSubPages: Array<number>;
    public isSubPage: number;

    constructor(
        name: string = '',
        url: string = null,
        components: Array<number> = null,
        isPublish: boolean = false,
        hasSubPages: Array<number> = null,
        isSubPage: number = null
        ) {
        this.name = name;
        this.url = url;
        this.components = components;
        this.isPublish = isPublish;
        this.hasSubPages = hasSubPages;
        this.isSubPage = isSubPage;
    }
}
