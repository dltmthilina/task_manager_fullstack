
export class UserModel {
    email: string | undefined;
    password: string | undefined;

    constructor(data: Partial<UserModel>) {
        Object.assign(this, data);
    }
}