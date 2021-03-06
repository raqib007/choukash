export class User{
    id:number;
    fname:string;
    lname:string;
    uname:string;
    description:string;
    ltype:number;
    lgroup:number;
    mobile:string;
    // email:string;
    uid:string;
    // password:number;
    ugroupid:string;
    
    company_id:string;
    created_by:string;
    created_on:string;
    due_date_lock_profile:string;
    email:string;
    emailVerificationStatus: boolean;
    emailVerificationToken:string;
    first_name:string;
    is_active: boolean;
    last_name:string;
    location_id:string;
    location_type_id:string;
    location_type_name:string;
    location_group_id:string;
    location_group_name:string;
    middle_name:string;
    note:string;
    otp:string;
    password:string;
    passwordConfirm:string;
    updated_by:string;
    updated_on:string;
    user_group:any;
    user_id:string;
    user_name:string;
    
    constructor(user?) {
        if(user){
            this.first_name = user.first_name;
            this.last_name = user.last_name;
            this.user_name = user.user_name;
            this.note = user.note;
            this.location_type_id = user.location_type_id;
            this.location_group_id = user.location_group_id;
            this.location_type_name = user.location_type_name;
            this.location_group_name = user.location_group_name;
            this.mobile = user.mobile;
            this.email = user.email;
            this.user_id = user.user_id;
            this.password = user.password;
            this.user_group = user.user_group;
            this.is_active = user.is_active;
        }else{
            this.first_name = '';
            this.last_name = '';
            this.user_name = '';
            this.note = '';
            this.mobile = '';
            this.email = '';
            this.location_type_id = '';
            this.location_type_name = '';
            this.location_group_id = '';
            this.location_group_name = '';
            this.is_active = true;
            this.user_id = '';
            this.password = '';
            this.user_group = '';
            
            // this.id = -1;
            // this.company_id = '';
            // this.created_by = '';
            // this.created_on = '';
            // this.due_date_lock_profile = '';
            // this.emailVerificationStatus = false;
            // this.emailVerificationToken = '';
            // this.location_id = '';
            // this.middle_name = '';
            // this.otp = '';
            // this.updated_by = '';
            // this.updated_on = '';
        }
    }
    
}