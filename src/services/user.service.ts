import { CreateUser, User } from "../interfaces/user.interface";

export class UserService{
    private users: User[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        age: 30
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        age: 25
    },
    {
        id: 3,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        age: 28
    }
];
    
getAllUsersService(): User[]{

        return this.users;
    }

 getUserByIdService(id: number): User | undefined{  
    console.log("hello");
    
        return this.users.find(user => user.id === id); 
}
createUserService(data: CreateUser): User {
    const newUser: User = {
        id: this.users.length + 1,
        ...data
    };
    this.users.push(newUser);
    console.log("Created User ",this.users);
    
    return newUser;
}
}