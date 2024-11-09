import express from "express";
import { 
  getAllPosts, 
  getAllPostsByMe, 
  getPostById, 
  createPost, 
  updatePostById, 
  deletePostById,
  commentByPostId,
  getCommentsByPostId
 } from "../controllers/post.controllers.js";
import auth from "../middleware/auth.js";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })
import cloudinaryImage from "../middleware/cloudinary.js";

const router = express.Router();

// GET all posts - Private ✅ add auth
router.get("/all", getAllPosts)

// GET all post by me - Private ✅
router.get("/me", auth, getAllPostsByMe)

// GET post by id - Private ✅
router.get("/:postId", getPostById)

// POST create post - Private ✅
router.post("/", auth, upload.single('postImage'), cloudinaryImage, createPost)

// PUT update post by id - Private 🚧
router.put("/:postId", updatePostById)

// DELETE delete post by id - Private 🚧
router.delete("/:postId", deletePostById)

// GET comments by postId  ✅
router.get("/comment/:postId", getCommentsByPostId)

// POST comment post - Private ✅
router.post("/comment", auth, commentByPostId)

// POST like post - Private 🚧
// router.post("/", auth, likePostById)

export default router;