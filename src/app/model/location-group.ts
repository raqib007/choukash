export class LocationGroup {
    location_group_id:string;
    location_group_name:string;
    location_type_id:string;
    location_type_name:string;
    description:string;
    short_name:string;
    is_active:boolean;
    created_on:string;
    created_by:string;
    updated_on:string;
    updated_by:string;
    users:string;

    constructor(l) {
        this.location_group_id = l.location_group_id;
        this.location_group_name = l.location_group_name;
        this.location_type_id = l.location_type_id;
        this.location_type_name = l.location_type_name;
        this.description = l.description;
        this.is_active = l.is_active;
        this.short_name = l.short_name;
        // this.created_on = l.created_on;
        // this.created_by = l.created_by;
        // this.updated_on = l.updated_on;
        // this.updated_by = l.updated_by;
        this.users = l.users;
    }
}