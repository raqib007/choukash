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
    

    constructor(l? : any) {
        this.location_id = l && l.location_id || '';
        this.address_type = l && l.address_type || '';
        this.business_name = l && l.business_name || '';
        this.city = l && l.city || '';
        this.company_id = l && l.company_id || '';
        this.contact_sub_group_id = l && l.contact_sub_group_id || '';
        this.contact_type_id = l && l.contact_type_id || '';
        this.country = l && l.country || '';
        this.email = l && l.email || '';
        this.first_name = l && l.first_name || '';
        this.last_name = l && l.last_name || '';
        this.is_active = l && l.is_active || '';
        this.job_title = l && l.job_title || '';
        this.location_code = l && l.location_code || '';
        this.location_group_id = l && l.location_group_id || '';
        this.location_group_name = l && l.location_group_name || '';
        this.location_type_id = l && l.location_type_id || '';
        this.location_type_name = l && l.location_type_name || '';
        this.mobile = l && l.mobile || '';
        this.open_address = l && l.open_address || '';
        this.telephone = l && l.telephone || '';
        this.website = l && l.website || '';
        this.zip = l && l.zip || '';
        this.created_by = l && l.created_by || '';
        this.created_on = l && l.created_on || '';
        this.updated_by = l && l.updated_by || '';
        this.updated_on = l && l.updated_on || '';
    }
}