import express from "express";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import 'dotenv/config';
import cors from "cors";
import helmet from "helmet";

const app = express();

// Enable CORS and security headers
app.use(cors());
app.use(helmet());

// Force trailing slashes on URLs
app.use((req, res, next) => {
  if (!req.url.endsWith('/')) {
    return res.redirect(301, req.url + '/');
  }
  next();
});

// Rewrite old path to new path
app.use('/old-path', (req, res) => {
  res.redirect(301, '/new-path'); // Permanent redirect
});

// Set global headers
app.use((req, res, next) => {
  res.set('X-Custom-Header', 'SomeValue');
  next();
});

// Parse incoming JSON requests
app.use(express.json());

// Basic routes
app.get("/", (req, res) => {
  res.send("Hello world!");
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
