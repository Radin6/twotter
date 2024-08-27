import { pool } from "../db.js";
import { postSchema } from "../validation/ticketValidation.js";

export const getAllPosts = async (req, res) => {
  try {
    const [posts] = await pool.query(`SELECT posts.post_id,
    posts.user_id,
    posts.content,
    posts.post_image,
    posts.post_likes,
    posts.created_at AS post_created_at,
    users.email,
    users.profile_img FROM posts INNER JOIN users ON users.user_id = posts.user_id;`)
    res.status(200).send(posts)
  } catch(error) {
    console.log("Error getting all posts: ", error)
    res.status(400).send({message: "Error trying to get all posts"})
  }
}

export const getAllPostsByMe = async (req, res) => {
  const {user_id} = req.user
  try {
    const [posts] = await pool.query("SELECT * FROM posts WHERE user_id=?;", [user_id])
    console.log(posts)
    return res.status(200).send(posts)
  } catch(error) {
    console.log("Error getting all posts: ", error)
    return res.status(400).send({message: "Error trying to get all posts"})
  }
}

export const getPostById = async (req, res) => {
  const { postId } = req.params

  try {
    const [post] = await pool.query("SELECT * FROM posts WHERE post_id=?;", [postId])
    return res.status(200).send(post[0])
  } catch(error) {
    console.log("Error getPostById: ", error)
    return res.status(400).send({message: "Error trying to get post by id"})
  }
}

export const createPost = async (req, res) => {
  // Validate Schema
  try {
    postSchema.parse(req.body)
  } catch(error) {
    return res.status(400).send({message: error.issues.map(element => element.message)})
  }

  const { content, postImage } = req.body
  const { user_id } = req.user

  try {
    const [post] = await pool.query("INSERT INTO posts (user_id, content, post_image, post_likes) VALUES (?,?,?,?)",
      [user_id, content, postImage, 0]
    )
    res.status(200).send({
      userId: user_id,
      postId: post.insertId,
      content: content,
      postImage: postImage
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({message: "Error trying to create a post"})
  }
}

export const updatePostById = async (req, res) => { }

export const deletePostById = async (req, res) => { }