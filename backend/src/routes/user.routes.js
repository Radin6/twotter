import express from "express";
import { userMock } from "../mocks/userMock.js";
import { signupUser, loginUser, getUserById, getUsersAll, patchUserbyId } from "../controllers/user.controllers.js";
import auth from "../middleware/auth.js";

const router = express.Router()

// POST signup /api/users/signup - Public ✅
router.post("/signup", signupUser)

// POST login /api/users/login - Public ✅
router.post("/login", loginUser)

// NOW NOT IMPLEMENTED ////////////////

// GET user - Private 🚧
router.get("/all", auth, getUsersAll)

// GET user by id - Private 🚧
router.get("/:id", auth, getUserById)

// PATCH user by id - Private 🚧
router.patch("/:id", auth, patchUserbyId)

export default router;