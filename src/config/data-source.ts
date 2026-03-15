import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm"
import { User } from "../entites/user.entity"    

const requireEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};

const dbHost = process.env.DB_HOST ?? "localhost";
const dbPort = Number(process.env.DB_PORT ?? 5432);
const dbUser = requireEnv("DB_USER");
const dbPassword = requireEnv("DB_PASSWORD");
const dbName = requireEnv("DB_NAME");

export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbHost,
    port: dbPort,
    username: dbUser,
    password: dbPassword,
    database: dbName,
    synchronize: true,
    logging: false,
    entities: [User],   
    migrations: [],
})