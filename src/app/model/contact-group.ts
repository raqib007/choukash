export class ContactGroup {
    id: number;
    contactType: string;
    name: string;

    constructor(contact) {
        this.id = contact.id;
        this.contactType = contact.contactType;
        this.name = contact.name;
    }
}