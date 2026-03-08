
export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}


export interface CreateUser extends Omit <User,"id"> {}
    
    


