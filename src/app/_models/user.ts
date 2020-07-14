export class User {
    id: string;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    token?: string;
    expires: string;
}