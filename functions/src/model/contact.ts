export class Contact {
    public transmitter: string;
    public category: string;
    public date: string;
    public content: string;
    public isRead: boolean;

    constructor(transmitter: string = '', category: string = '', date: string = '', content: string = '', isRead: boolean = false) {
        this.transmitter = transmitter;
        this.category = category;
        this.date = date;
        this.content = content;
        this.isRead = isRead;
    }
}