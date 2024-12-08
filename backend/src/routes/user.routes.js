import express from "express";
import { userMock } from "../mocks/userMock.js";
import { signupUser, loginUser, getUserById, getUsersAll, patchUserMe } from "../controllers/user.controllers.js";
import auth from "../middleware/auth.js";

const router = express.Router()

// POST signup /api/users/signup - Public ✅
router.post("/signup", signupUser)

// POST login /api/users/login - Public ✅
router.post("/login", loginUser)

// PATCH user by id - Private ✅
router.patch("/", auth, patchUserMe)

// NOW NOT IMPLEMENTED ////////////////

// GET user - Private 🚧
router.get("/all", auth, getUsersAll)

// GET user by id - Private 🚧
router.get("/:id", auth, getUserById)



export default router;