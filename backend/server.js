import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import itemRoute from "./routes/itemRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import vendorRoute from "./routes/venderRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { cloudinaryConfig } from "./utils/cloudinaryConfig.js";
import path from "path";
import { fileURLToPath } from "url";
import { initMockData } from "./mockDatabase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const App = express();

App.use(express.json());
App.use(cookieParser());

dotenv.config({ path: path.join(__dirname, ".env") });
const port = 3000;

// MongoDB Connection with better error handling
if (process.env.mongo_uri) {
  mongoose
    .connect(process.env.mongo_uri)
    .then(() => {
      console.log("✅ MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("❌ MongoDB connection failed:", error.message);
      console.log("⚠️  Server will continue without database connection");
      console.log("💡 Using in-memory mock database instead");
      initMockData();
    });
} else {
  console.log("⚠️  No MongoDB URI found in .env file");
  console.log("💡 Using in-memory mock database instead");
  initMockData();
}

App.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
  console.log(`📱 Frontend: http://localhost:5173`);
  console.log(`🔧 Backend: http://localhost:${port}`);
});

const allowedOrigins = [
  "https://rent-a-ride-two.vercel.app",
  "http://localhost:5173",
]; // Add allowed origins here

App.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true, // Enables the Access-Control-Allow-Credentials header
  })
);

App.use("*", cloudinaryConfig);

// App.get('/*', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')));

App.use("/api/user", userRoute);
App.use("/api/items", itemRoute);
App.use("/api/auth", authRoute);
App.use("/api/admin", adminRoute);
App.use("/api/vendor", vendorRoute);

App.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    succes: false,
    message,
    statusCode,
  });
});
