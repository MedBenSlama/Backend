import {Request, Response} from "express";
import {UserService} from "../../services/user.service";
import { User } from "../../interfaces/user.interface";
import {  validatorUserSchema } from "./user.Schema";


const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response) =>{
    const users: User[] = await userService.getAllUsersService();
    return res.json(users);
}

export const getUser = async (req: Request, res: Response) =>{ 
    const id: number = parseInt(req.params.id as string);
    const validationResult = validatorUserSchema.safeParse({ id });
    if (Number.isNaN(id) || validationResult.success === false) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    const user:User | undefined = await userService.getUserByIdService(id); 
    return user ? res.json(user) : res.status(404).json({message: "User not found"});
}

export const createUser = async (req: Request, res: Response) => { 
    const { name, email, age } = req.body;
    
    const validationResult = validatorUserSchema.safeParse(req.body);
    if (validationResult.success === false) {
        return res.status(400).json({ message: validationResult.error.issues[0].message });
    }
    const newUser = await userService.createUserService({ name, email, age });
    return res.status(201).json({message: "User created successfully", user: newUser});
}

// PUT: update user
export const updateUser = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id as string);
    if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    const validationResult = validatorUserSchema.safeParse(req.body);
    if (validationResult.success === false) {
        return res.status(400).json({ message: validationResult.error.issues[0].message });
    }
    const updatedUser = await userService.updateUserService(id, req.body);
    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User updated successfully", user: updatedUser });
};

// DELETE: remove user
export const deleteUser = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id as string);
    const validationResult = validatorUserSchema.safeParse({ id });
    if (Number.isNaN(id) || validationResult.success === false) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    const deleted = await userService.deleteUserService(id);
    if (!deleted) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully" });
};