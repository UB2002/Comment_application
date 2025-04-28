import dotenv from "dotenv";
dotenv.config();

export const {
  DB_HOST = "localhost",
  DB_PORT = "5432",
  DB_USER = "postgres",
  DB_PASS = "postgres",
  DB_NAME = "comments_app",
  REDIS_URL = "redis://localhost:6379",
  JWT_SECRET = "token_top_secret",
  PORT = "4000",
} = process.env;
