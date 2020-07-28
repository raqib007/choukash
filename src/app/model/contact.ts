export class Contact {
    contact_id: string;
    address_type: string;
    contact_type_id: string;
    contact_type_name: string;
    contact_sub_group_id: string;
    contact_sub_group_name: string;
    first_name: string;
    last_name: string;
    business_name: string;
    job_title: string;
    location_type_id: string;
    location_type_name: string;
    location_group_id: string;
    location_group_name: string;
    open_address: string;
    zip: string;
    city: string;
    country: string;
    mobile: string;
    telephone: string;
    email: string;
    website: string;
    is_active : boolean;
    company_id: string;
    note: string;

    constructor(contact) {
        this.contact_id = contact.contact_id;
        this.address_type = contact.address_type;
        this.contact_type_id = contact.contact_type_id;
        this.contact_type_name = contact.contact_type_name;
        this.contact_sub_group_id = contact.contact_sub_group_id;
        this.contact_sub_group_name = contact.contact_sub_group_name;
        this.first_name = contact.first_name;
        this.last_name = contact.last_name;
        this.business_name = contact.business_name;
        this.job_title = contact.job_title;
        this.location_type_id = contact.location_type_id;
        this.location_type_name = contact.location_type_name;
        this.location_group_id = (contact.location_group_id)? undefined : '';
        this.location_group_name = (contact.location_group_name) ? undefined : '';
        this.open_address = contact.open_address;
        this.zip = contact.zip;
        this.city = contact.city;
        this.country = contact.country;
        this.mobile = contact.mobile;
        this.telephone = contact.telephone;
        this.email = contact.email;
        this.website = contact.website;
        this.is_active = contact.is_active;
        this.company_id = contact.company_id;
        this.note = contact.note;
    }
}