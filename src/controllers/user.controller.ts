import {Request, Response} from "express";
import {UserService} from "../services/user.service";
import { User } from "../interfaces/user.interface";


const userService = new UserService();

export const getAllUsers = (req: Request, res: Response) =>{
    const users: User[] = userService.getAllUsersService();
    return res.json(users);
}

export const getUser = (req: Request, res: Response) =>{ 
    const id: number = parseInt(req.params.id as string);
    if (Number.isNaN(id)) 
         return res.status(400).json({message: "Invalid user ID"});

    const user:User | undefined = userService.getUserByIdService(id); 
    return user ? res.json(user) : res.status(404).json({message: "User not found"});
}

export const createUser = (req: Request, res: Response) => { 
    const { name, email, age } = req.body;
    
    if (!name || !email || !age) {
        return res.status(400).json({ message: "Name, email, and age are required" });
    }
    const newUser = userService.createUserService({ name, email, age });
    return res.status(201).json({message: "User created successfully", user: newUser});
}