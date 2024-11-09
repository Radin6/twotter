import { createPool } from "mysql2/promise";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config.js";

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE,
})

export async function initializeDB() {
  try {
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${DB_DATABASE}`)
    await pool.query(`USE ${DB_DATABASE}`)
    // Create a users table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          user_id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          profile_img VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `)
    // Create a posts table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS posts (
          post_id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          content TEXT NOT NULL,
          post_likes INT NOT NULL DEFAULT 0,
          post_comments INT NOT NULL DEFAULT 0,
          post_image VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
        );
      `)
    // Create a comments table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS comments (
          comment_id INT AUTO_INCREMENT PRIMARY KEY,
          post_id INT NOT NULL,
          user_id INT NOT NULL,
          comment_content TEXT NOT NULL,
          comment_likes INT NOT NULL DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE
        );
      `)
      
    // Likes table
    // await pool.query(`
    //     CREATE TABLE IF NOT EXISTS likes (
    //       like_id INT AUTO_INCREMENT PRIMARY KEY,
    //       user_id INT NOT NULL,
    //       post_id INT,
    //       comment_id INT,
    //       liked BOOLEAN NOT NULL DEFAULT FALSE,
    //       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //       FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    //       FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    //       FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE ON UPDATE CASCADE
    //     );
    //   `)
    console.log(`DB initialized: ${DB_DATABASE}`)
  } catch (error) {
    console.log("error initializing: ", error)
  }
}