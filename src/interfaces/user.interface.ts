
export interface IUser {
    id: number;
    name: string;
    email: string;
    age: number;
}

export type User = IUser;

export interface CreateUser extends Omit <IUser,"id"> {}
    
    


