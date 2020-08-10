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
    is_owner: boolean;
    image: string;

    constructor(contact? : any) {
        this.contact_id = contact && contact.contact_id || '';
        this.address_type = contact && contact.address_type || '';
        this.contact_type_id = contact && contact.contact_type_id || '';
        this.contact_type_name = contact && contact.contact_type_name || '';
        this.contact_sub_group_id = contact && contact.contact_sub_group_id || '';
        this.contact_sub_group_name = contact && contact.contact_sub_group_name || '';
        this.first_name = contact && contact.first_name || '';
        this.last_name = contact && contact.last_name || '';
        this.business_name = contact && contact.business_name || '';
        this.job_title = contact && contact.job_title || '';
        this.location_type_id = contact && contact.location_type_id || '';
        this.location_type_name = contact && contact.location_type_name || '';
        this.location_group_id = contact && contact.location_group_id || '';
        this.location_group_name = contact && contact.location_group_name || '';
        this.open_address = contact && contact.open_address || '';
        this.zip = contact && contact.zip || '';
        this.city = contact && contact.city || '';
        this.country = contact && contact.country || '';
        this.mobile = contact && contact.mobile || '';
        this.telephone = contact && contact.telephone || '';
        this.email = contact && contact.email || '';
        this.website = contact && contact.website || '';
        this.is_active = contact && contact.is_active || true;
        this.company_id = contact && contact.company_id || '';
        this.note = contact && contact.note || '';
        this.is_owner = contact && contact.is_owner || false;
        this.image = contact && contact.image || false;
    }
}