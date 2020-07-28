export class Location {
    // id: number;
    // locgroup: string;
    // location: string;
    // locationType: string;
    // name: string;
    // jobtitle: string;
    // firstName: string;
    // lastName: string;
    // address: string;
    // zipcode: number;
    // city: string;
    // country: string;
    // phoneNumber: string;
    // mobileNumber: string;
    // mail: string;


    location_id : string;
    address_type : string;
    location_group_id : string;
    location_group_name : string;
    location_type_id : string;
    location_type_name : string;
    business_name : string;
    job_title : string;
    first_name : string;
    last_name : string;
    open_address : string;
    zip : string;
    city : string;
    country : string;
    telephone : string;
    mobile : string;
    email : string;
    company_id : string;
    contact_sub_group_id : string;
    contact_type_id : string;
    is_active: boolean;
    location_code : string;
    website : string;

    created_by : string;
    created_on : string;
    updated_by : string;
    updated_on : string;
    

    constructor(l) {
        // this.id = l.id;
        // this.locgroup = l.locgroup;
        // this.location = l.location;
        // this.locationType = l.locationType;
        // this.name = l.name;
        // this.jobtitle = l.jobtitle;
        // this.firstName = l.firstName;
        // this.lastName = l.lastName;
        // this.address = l.address;
        // this.zipcode = l.zipcode;
        // this.city = l.city;
        // this.country = l.country;
        // this.phoneNumber = l.phoneNumber;
        // this.mobileNumber = l.mobileNumber;
        // this.mail = l.mail;

        this.location_id = l.location_id;
        this.address_type = l.address_type;
        this.business_name = l.business_name;
        this.city = l.city;
        this.company_id = l.company_id;
        this.contact_sub_group_id = l.contact_sub_group_id;
        this.contact_type_id = l.contact_type_id;
        this.country = l.country;
        this.email = l.email;
        this.first_name = l.first_name;
        this.last_name = l.last_name;
        this.is_active = l.is_active;
        this.job_title = l.job_title;
        this.location_code = l.location_code;
        this.location_group_id = l.location_group_id;
        this.location_group_name = l.location_group_name;
        this.location_type_id = l.location_type_id;
        this.location_type_name = l.location_type_name;
        this.mobile = l.mobile;
        this.open_address = l.open_address;
        this.telephone = l.telephone;
        this.website = l.website;
        this.zip = l.zip;
        this.created_by = l.created_by;
        this.created_on = l.created_on;
        this.updated_by = l.updated_by;
        this.updated_on = l.updated_on;
    }
}