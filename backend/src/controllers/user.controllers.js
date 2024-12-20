import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadImages } from "../utils/cloudinary.js"
import fs from "fs-extra";

const getUserByEmail = async (email) => {
  const [user] = await pool.query('SELECT * FROM users WHERE email=?;', [email])
  return user;
}

const getUserByUsername = async (username) => {
  const [user] = await pool.query('SELECT * FROM users WHERE username=?;', [username])
  return user;
}

const signJWT = (user_id, email) => {

  const token = jwt.sign({
    userId: user_id,
    email: email
  }, process.env.JWT_SECRET)
  return token;
}

export const getUsersAll = async (req, res) => {
  res.send("all users here")
}

export const signupUser = async (req, res) => {
  const {
    password,
    email,
    username,
    profileImg = `https://ui-avatars.com/api/?background=random&name=${email}`
  } = req.body


  try {
    // Check if user exists 
    const myUser = await getUserByEmail(email);

    if (myUser.length) {
      return res.status(409).send({ message: "User already exists" })
    }

    // Check if username exists 
    const myUserName = await getUserByUsername(username);

    if (myUserName.length) {
      return res.status(409).send({ message: "Username already exists" })
    }

    // If user and params exists create a new user
    if (email && password) {
      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 10);

      const [result] = await pool.query(`
          INSERT INTO users (email, password, username, profile_img) VALUES (?, ?, ?, ?)
        `, [email, hashedPassword, username, profileImg]);

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

      if (!validPassword) return res.status(401).send({ message: "Wrong email or password" })

      const token = signJWT(user.user_id, user.email)
      res.status(200).send({
        userId: user.user_id,
        email: user.email,
        username: user.username,
        profileImg: user.profile_img,
        token: token
      })
    }
  } catch (error) {
    return res.status(400).send({ message: "Error trying to login" })
  }

}

export const patchUserMe = async (req, res) => {
  const { username } = req.body;
  const { file } = req;

  console.log("FILE:",file)

  let profileImage = null;

  try {
    // If a file was uploaded, upload it to Cloudinary
    if (file) {
      const result = await uploadImages(file.path);  // Upload image from the temp file path

      // Store image details for database insertion
      profileImage = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      // Remove the temporary file after upload
      await fs.unlink(file.path);
    }
  } catch(error) {
    console.log(error)
    res.status(400).send({ message: "Error trying to create a post" })
  }

  // TODO: change postImage in cloudinary/multer to profileImage
  if (!profileImage?.secure_url && !username) {
    console.log("Not data provided to update user")
    return res.status(400).send({ message: "Not data provided to update user" })
  }

  let fields = []
  let values = []

  if (profileImage?.secure_url !== null && profileImage?.secure_url !== undefined) {
    fields.push("profile_img=?")
    values.push(profileImage?.secure_url)
    console.log("there is an image")
  }

  if (username !== null && username !== undefined) {
    // TODO: Check username does not exists
    fields.push("username=?")
    values.push(username)
    console.log("there is an username")
  }

  values.push(req.user.userId)

  try {
    console.log("Sending query: ",`UPDATE users SET ${fields.join(", ")} WHERE user_id=?`)
    const response = await pool.query(`UPDATE users SET ${fields.join(", ")} WHERE user_id=?`, values)
    res.status(201).send({
      profileImageId: response[0].insertId,
      profileImage: profileImage?.secure_url,
      username: username
    })
  } catch (error) {
    console.log("patchUserMe error: ", error)
    return res.status(400).send({ message: "Error trying to patch user" })
  }

}

export const getUserById = async (req, res) => {
  try {
    if (req.params?.id) {
      const [rows] = await pool.query("SELECT id, email, username FROM users WHERE id=?", [req.params.id]);
      if (!rows.length) return res.status(404).send({ "message": "User not found" });
      return res.status(200).send(rows[0]);
    }
    return res.status(404).send({ message: "User does not exists" })
  } catch (error) {
    return res.status(400).send({ message: "Error trying to fetch user by id" })
  }

} 