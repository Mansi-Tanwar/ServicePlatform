import dotenv from "dotenv";
// Load environment variables
dotenv.config();

console.log("MongoDB URI: ", process.env.MONGO_URI);
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./config/db.js";
import serviceRouter from "./routes/serviceRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";



// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
(async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    console.log("Connecting to MongoDB:", MONGO_URI);
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
})();

// API Endpoints
app.use("/api/service", serviceRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("🚀 API is Working for Google Solution Challenge!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});