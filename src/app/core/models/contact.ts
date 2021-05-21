export class Contact {
    public transmitter: string;
    public category: string;
    public date: string;
    public content: string;
    public isRead: boolean;
    public key: string;

    constructor(
        transmitter: string = '',
        category: string = '',
        date: string = '',
        content: string = '',
        isRead: boolean = false, key: string = ''
    ) {
        this.transmitter = transmitter;
        this.category = category;
        this.date = date;
        this.content = content;
        this.isRead = isRead;
        this.key = key;
    }
}
