export class UserGroup {
    user_group_id:string;
    user_group_name:string;
    description:string;

    constructor(user) {
        this.user_group_id = user.user_group_id;
        this.user_group_name = user.user_group_name;
        this.description = user.description;
    }
}