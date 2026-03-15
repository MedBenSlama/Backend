import { Repository } from "typeorm";
import { CreateUser, IUser} from "../interfaces/user.interface";
import { User } from "../entites/user.entity";
import { AppDataSource } from "../config/data-source";

export class UserService{
private userRepository: Repository<User>;
constructor() {
    this.userRepository = AppDataSource.getRepository(User); 
}
    
async getAllUsersService(): Promise<User[]>{
        return this.userRepository.find();
    }

async getUserByIdService(id: number): Promise<User | undefined>{
        const user = await this.userRepository.findOneBy({ id });
        return user ?? undefined;
}
async createUserService(data: CreateUser): Promise<User> {
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
}

// PUT: update user
async updateUserService(id: number, data: Partial<CreateUser>): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return undefined;

    const updatedUser = this.userRepository.merge(user, data);
    return await this.userRepository.save(updatedUser);
}

// DELETE: remove user
async deleteUserService(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return (result.affected ?? 0) > 0;
}
}