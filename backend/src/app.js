import express from "express";
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import 'dotenv/config';
import cors from "cors";

const app = express();

app.use(cors());

app.options('*', cors());

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello world!")
})

app.get("/ping", async (req, res) => {
  res.send("pong")
})

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.use((req, res) => {
  res.status(404).json({message: "Endpoint not found"})
})

export default app;