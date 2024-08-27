import express from "express";
import { 
  getAllPosts, 
  getAllPostsByMe, 
  getPostById, 
  createPost, 
  updatePostById, 
  deletePostById } from "../controllers/post.controllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET all posts - Private ✅ add auth
router.get("/all", getAllPosts)

// GET all post by me - Private ✅
router.get("/me", auth, getAllPostsByMe)

// GET post by id - Private ✅
router.get("/:postId", getPostById)

// POST create post - Private ✅
router.post("/", auth, createPost)

// PUT update post by id - Private 🚧
router.put("/:postId", updatePostById)

// DELETE delete post by id - Private 🚧
router.delete("/:postId", deletePostById)

export default router;