import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Comment } from "./entities/Comment";
import { Notification } from "./entities/Notification";
import { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [User, Comment, Notification],
  synchronize: true,
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
