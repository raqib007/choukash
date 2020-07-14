export class Location {
    id: number;
    locgroup: string;
    location: string;
    locationType: string;
    name: string;
    jobtitle: string;
    firstName: string;
    lastName: string;
    address: string;
    zipcode: number;
    city: string;
    country: string;
    phoneNumber: string;
    mobileNumber: string;
    mail: string;

    constructor(Location) {
        this.id = Location.id;
        this.locgroup = Location.locgroup;
        this.location = Location.location;
        this.locationType = Location.locationType;
        this.name = Location.name;
        this.jobtitle = Location.jobtitle;
        this.firstName = Location.firstName;
        this.lastName = Location.lastName;
        this.address = Location.address;
        this.zipcode = Location.zipcode;
        this.city = Location.city;
        this.country = Location.country;
        this.phoneNumber = Location.phoneNumber;
        this.mobileNumber = Location.mobileNumber;
        this.mail = Location.mail;
    }
}