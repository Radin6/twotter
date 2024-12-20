import express from "express";
import userRoutes from "../src/routes/user.routes.js";
import postRoutes from "../src/routes/post.routes.js";
import 'dotenv/config';
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());

// Parse incoming JSON requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Twotter!");
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
