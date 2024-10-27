import 'dotenv/config';

export const DB_HOST = (process.env.NODE_ENV === "dev") ? process.env.DB_HOST_DEV : process.env.DB_HOST_PROD;
export const DB_USER = (process.env.NODE_ENV === "dev") ? process.env.DB_USER_DEV : process.env.DB_USER_PROD;
export const DB_PASSWORD = (process.env.NODE_ENV === "dev") ? process.env.DB_PASSWORD_DEV : process.env.DB_PASSWORD_PROD;
export const DB_PORT = (process.env.NODE_ENV === "dev") ? process.env.DB_PORT_DEV : process.env.DB_PORT_PROD;
export const DB_DATABASE = (process.env.NODE_ENV === "dev") ? process.env.DB_DATABASE_DEV : process.env.DB_DATABASE_PROD;