export class ContactGroup {
    contact_sub_group_id : string ;
    contact_sub_group_name : string ;
    contact_type_id : string ;
    contact_type_name : string ;
    is_active : boolean;
    description : string ;
    properties : string ;
    // created_by : string ;
    // created_on : string ;
    // updated_by : string ;
    // updated_on : string ;

    constructor(contact) {
        this.contact_sub_group_id = contact.contact_sub_group_id;
        this.contact_sub_group_name = contact.contact_sub_group_name;
        this.contact_type_id = contact.contact_type_id;
        this.contact_type_name = contact.contact_type_name;
        this.is_active = contact.is_active;
        this.description = contact.description;
        this.properties = contact.properties;
    }
}