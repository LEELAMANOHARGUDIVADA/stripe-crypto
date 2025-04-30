import dotenv from "dotenv"
import app from "./app";
import connectDB from "./db/db";
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Invalid MONGODB_URI!");
}

app.listen(PORT, () => {
    connectDB(MONGODB_URI);
    console.log("SERVER RUNNING ON PORT", PORT);
});