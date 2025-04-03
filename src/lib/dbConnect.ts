import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    // console.log("🚀 Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering for immediate error feedback
      // dbName: 'school-management', // Optional: Explicitly set DB name if not in URI
    };

    // console.log("🐌 Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        // console.log("✅ MongoDB Connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        // Clear the promise cache on error so subsequent calls can retry
        cached.promise = null;
        throw err; // Re-throw error after logging
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Clear promise cache on error
    throw e; // Re-throw error
  }

  return cached.conn;
}

export const clientPromise = mongoose.connection.getClient(); // Export the underlying MongoClient Promise

export default dbConnect; // Export the function to ensure connection before operations
