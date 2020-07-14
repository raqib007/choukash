export class UserGroup {
    user_group_id:string;
    user_group_name:string;
    note:string;
    is_active: boolean;

    constructor(user) {
        this.user_group_id = user.user_group_id;
        this.user_group_name = user.user_group_name;
        this.note = user.note;
        this.is_active = user.is_active;
    }
}