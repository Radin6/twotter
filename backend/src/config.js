import 'dotenv/config';

export const DB_HOST = process.env.DB_HOST || "192.168.1.205";
export const DB_USER = process.env.DB_USER || "wslroot";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_DATABASE = process.env.DB_DATABASE || "twotter_test"