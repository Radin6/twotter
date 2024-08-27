import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getUserByEmail = async (email) => {
  const [user] = await pool.query('SELECT * FROM users WHERE email=?;', [email])
  return user;
}

const signJWT = (user_id, email) => {

  const token = jwt.sign({
    userId: user_id,
    email: email
  },process.env.JWT_SECRET)
  return token;
}

export const getUsersAll = async (req, res) => {
  res.send("all users here")
}

export const signupUser = async (req, res) => {
  const { 
    password, 
    email, 
    profileImg = `https://ui-avatars.com/api/?background=random&name=${email}`
  } = req.body
  

  try {
    // Check if user exists 
    const myUser = await getUserByEmail(email);

    if (myUser.length) {
      return res.status(409).send({ message: "User already exists" })
    }

    // If user and params exists create a new user
    if (email && password) {
      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 10);

      const [result] = await pool.query(`
          INSERT INTO users (email, password, profile_img) VALUES (?, ?, ?)
        `, [email, hashedPassword, profileImg]);

      const token = signJWT(result.user_id, email)

      return res.status(201).send({
        userId: result.insertId,
        email: email,
        token: token,
        profileImg: profileImg,
      });

    }
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: "Error trying to signup" })
  }

  return res.status(400).send({ message: "There is no email or password" })
}

export const loginUser = async (req, res) => {
  const { password, email } = req.body

  try {
    const user = await getUserByEmail(email)

    if (!user.length) return res.status(404).send({ message: "User does not exists" })
    if (password && email) {
      const [user] = await getUserByEmail(email)
      const validPassword = bcrypt.compareSync(password, user.password)

      if (!validPassword) return res.status(401).send({message: "Wrong email or password"})

      const token = signJWT(user.user_id, user.email)
      res.status(200).send({
        userId: user.user_id,
        email: user.email,
        profileImg: user.profile_img,
        token: token
      })
    }
  } catch (error) {
    return res.status(400).send({ message: "Error trying to login" })
  }

}

export const patchUserbyId = async (req, res) => {
  res.send("patchUserbyId here")
}

export const getUserById = async (req, res) => {
  try {
    if (req.params?.id) {
      const [rows] = await pool.query("SELECT id, email FROM users WHERE id=?", [req.params.id]);
      if (!rows.length) return res.status(404).send({ "message": "User not found" });
      return res.status(200).send(rows[0]);
    }
    return res.status(404).send({ message: "User does not exists" })
  } catch (error) {
    return res.status(400).send({ message: "Error trying to fetch user by id" })
  }

} 