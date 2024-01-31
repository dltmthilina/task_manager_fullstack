
export class UserModel {
    name:string |undefined;
    email: string | undefined;
    password: string | undefined;
    imageUrl: string | undefined;

    constructor(data: Partial<UserModel>) {
        Object.assign(this, data);
    }
}

export class UserFormModel extends UserModel{
    
    confirmPassword: string | undefined;
    constructor(data: Partial<UserFormModel>) {
        super(data);
        Object.assign(this, data);
    }
}