import dotenv from "dotenv-safe";
import { ProjectConfiguration } from "../types/ProjectConfiguration";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_DATABASE = process.env.DB_DATABASE || "";

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

const SERVICE_NAME = process.env.SERVICE_NAME || "Microservice";
const LOG_LEVEL = process.env.LOG_LEVEL || "info";

const SHARED_SECRETS = process.env.SHARED_SECRETS || "";

// this will contain global configs for the project
export const CONFIG: ProjectConfiguration = {
  DATABASE: {
    HOST: DB_HOST,
    USERNAME: DB_USERNAME,
    PASSWORD: DB_PASSWORD,
    NAME: DB_DATABASE
  },
  SERVER: {
    PORT: SERVER_PORT
  },
  SERVICE_NAME,
  LOG_LEVEL,
  SHARED_SECRETS
};
