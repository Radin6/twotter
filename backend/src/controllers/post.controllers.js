import { pool } from "../db.js";
import { uploadImages } from "../utils/cloudinary.js"
import { postSchema } from "../validation/ticketValidation.js";
import fs from "fs-extra";

export const getAllPosts = async (req, res) => {
  try {
    const [posts] = await pool.query(`SELECT posts.post_id,
    posts.user_id,
    posts.content,
    posts.post_image,
    posts.post_likes,
    posts.created_at AS post_created_at,
    users.email,
    users.username,
    users.profile_img FROM posts INNER JOIN users ON users.user_id = posts.user_id;`)
    res.status(200).send(posts)
  } catch (error) {
    console.log("Error getting all posts: ", error)
    res.status(400).send({ message: "Error trying to get all posts" })
  }
}

export const getAllPostsByMe = async (req, res) => {
  const { userId } = req.user
  try {
    const [posts] = await pool.query(`
      SELECT 
      posts.*,
      posts.created_at AS post_created_at, 
      users.profile_img, 
      users.username, 
      users.email 
      FROM posts JOIN users ON posts.user_id = users.user_id WHERE posts.user_id=?;`, [userId])

    return res.status(200).send(posts)
  } catch (error) {
    console.log("Error getting all posts: ", error)
    return res.status(400).send({ message: "Error trying to get all posts" })
  }
}

export const getPostById = async (req, res) => {
  const { postId } = req.params

  try {
    const [post] = await pool.query("SELECT * FROM posts WHERE post_id=?;", [postId])
    return res.status(200).send(post[0])
  } catch (error) {
    console.log("Error getPostById: ", error)
    return res.status(400).send({ message: "Error trying to get post by id" })
  }
}

export const createPost = async (req, res) => {

  const { content } = req.body;
  const { file } = req;

  if (!content) {
    return res.status(400).json({ error: "Content cannot be empty" });
  }

  // Validar si hay una imagen
  if (!file.path) {
    console.log("No image received");
  }

  // Validate Schema
  // try {
  //   postSchema.parse({content: content})
  // } catch(error) {
  //   res.status(400).json({error: "Content empty"})
  // }

  const { userId } = req.user

  try {
    let postImage = null;

    // If a file was uploaded, upload it to Cloudinary
    if (file) {
      const result = await uploadImages(file.path);  // Upload image from the temp file path

      // Store image details for database insertion
      postImage = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      // Remove the temporary file after upload
      await fs.unlink(file.path);
    }


    const [post] = await pool.query("INSERT INTO posts (user_id, content, post_image, post_likes) VALUES (?,?,?,?)",
      [userId, content, postImage ? postImage.secure_url : null, 0]
    )
    res.status(200).send({
      userId: userId,
      postId: post.insertId,
      content: content,
      postImage
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Error trying to create a post" })
  }
}

export const updatePostById = async (req, res) => { }

export const deletePostById = async (req, res) => { }

export const commentByPostId = async (req, res) => {
  const { userId } = req.user;
  const { postId, content } = req.body;
  console.log(`userID: ${userId} , postId: ${postId}, content ${content}`)

  try {
    const result = await pool.query("INSERT INTO comments (post_id, user_id, comment_content, comment_likes) VALUES (?,?,?,0)",
      [postId, userId, content]
    );
    res.status(201).send({
      commentId: result[0].insertId,
      createdAt: new Date(),
      postId: postId,
      content: content
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Error trying to make a comment" })
  }

}

export const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const [comments] = await pool.query("SELECT comments.*, users.email, users.username FROM comments JOIN users ON comments.user_id = users.user_id WHERE comments.post_id = ?;", [postId])
    return res.status(200).send(comments)
  } catch (error) {
    console.log("Error getCommentsByPostId: ", error)
    return res.status(400).send({ message: "Error trying to get post by id" })
  }

}


export const getUsersPosts = async (req, res) => {
  try {
    const [posts] = await pool.query(`
      SELECT users.username, COUNT(posts.post_id) AS total_posts FROM users LEFT JOIN posts ON users.user_id = posts.user_id GROUP BY users.username, users.email;
      `)
    res.status(200).send(posts)
  } catch (error) {
    console.log("Error getting the number of post by email: ", error)
    res.status(400).send({ message: "Error trying to get the number of post by email" })
  }
}

export const likePostById = async (req, res) => {
  const { userId } = req.user;
  const { postId } = req.body;

  try {
    // Check if the like already exists
    const [existingLike] = await pool.query(
      "SELECT COUNT(*) as count FROM likes WHERE user_id = ? AND post_id = ?;",
      [userId, postId]
    );

    const isLiked = existingLike[0].count > 0;

    if (isLiked) {
      // Toggle off: Remove the like if it already exists
      await pool.query("DELETE FROM likes WHERE user_id = ? AND post_id = ?", [
        userId,
        postId,
      ]);
      return res.status(200).send({ message: "Like removed" });
    }

    // Toggle on: Add a new like
    const [newLike] = await pool.query(
      "INSERT INTO likes (user_id, post_id, liked) VALUES (?, ?, ?);",
      [userId, postId, true]
    );

    res.status(201).send({
      likeId: newLike.insertId,
      message: "Post liked successfully",
    });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).send({ message: "Error trying to like a post" });
  }
};
