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
    middle_name:string;
    note:string;
    otp:string;
    password:string;
    passwordConfirm:string;
    updated_by:string;
    updated_on:string;
    user_group:string;
    user_id:string;
    user_name:string;
    
    constructor(user?) {
        if(user){
            this.id = user.id;
            this.fname = user.fname;
            this.lname = user.lname;
            this.uname = user.uname;
            this.description = user.description;
            this.ltype = user.ltype;
            this.lgroup = user.lgroup;
            this.mobile = user.mobile;
            this.email = user.email;
            this.uid = user.uid;
            this.password = user.password;
            this.ugroupid = user.ugroupid;
        }else{
            this.id = -1;
            this.company_id = '';
            this.created_by = '';
            this.created_on = '';
            this.due_date_lock_profile = '';
            this.email = '';
            this.emailVerificationStatus = false;
            this.emailVerificationToken = '';
            this.first_name = '';
            this.is_active = false;
            this.last_name = '';
            this.location_id = '';
            this.location_type_id = '';
            this.location_type_name = '';
            this.middle_name = '';
            this.note = '';
            this.otp = '';
            this.password = '';
            this.updated_by = '';
            this.updated_on = '';
            this.user_group = '';
            this.user_id = '';
            this.user_name = '';
        }
    }
    
}