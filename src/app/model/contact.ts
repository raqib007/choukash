export class Contact {
    id: number;
    contactType: string;
    subContactType: string;
    bname: string;
    jobTitle: string;
    fname: string;
    lname: string;
    ltype: string;
    locationName: string;
    address: string;
    city: string;
    zipCode: number;
    country: string;
    phone: string;
    mobile: string;
    email: string;
    description: string;

    constructor(contact) {
        this.id = contact.id;
        this.contactType = contact.contactType;
        this.subContactType = contact.subContactType;
        this.bname = contact.bname;
        this.jobTitle = contact.jobTitle;
        this.fname = contact.fname;
        this.lname = contact.lname;
        this.ltype = contact.ltype;
        this.locationName = contact.locationName;
        this.address = contact.address;
        this.city = contact.city;
        this.zipCode = contact.zipCode;
        this.country = contact.country;
        this.phone = contact.phone;
        this.mobile = contact.mobile;
        this.email = contact.email;
        this.description = contact.description;
    }
}