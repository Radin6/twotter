import express from "express";
import { 
  getAllPosts, 
  getAllPostsByMe, 
  getPostById, 
  createPost, 
  updatePostById, 
  deletePostById,
  commentByPostId,
  getCommentsByPostId,
  getUsersPosts,
  likePostById
 } from "../controllers/post.controllers.js";
import auth from "../middleware/auth.js";
import authOptional from "../middleware/authOptional.js";
import { uploadImages } from "../middleware/multer.js";

const router = express.Router();

// GET all posts - Public ✅
router.get("/all", authOptional, getAllPosts)

// GET user - Public ✅
router.get("/usersposts", getUsersPosts)

// GET all post by me - Private ✅
router.get("/me", auth, getAllPostsByMe)

// GET post by id - Private ✅
router.get("/:postId", getPostById)

// POST create post - Private ✅
router.post("/", auth, uploadImages.single("postImage"), createPost)

// PUT update post by id - Private 🚧
router.put("/:postId", updatePostById)

// DELETE delete post by id - Private 🚧
router.delete("/:postId", deletePostById)

// GET comments by postId  ✅
router.get("/comment/:postId", getCommentsByPostId)

// POST comment post - Private ✅
router.post("/comment", auth, commentByPostId)

// POST like post - Private 🚧
router.post("/like", auth, likePostById)

export default router;