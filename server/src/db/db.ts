import mongoose from "mongoose";

const connectDB = (uri:string) => {
    mongoose.connect(uri).then(() =>
        console.log("MONGODB CONNECTED!")
    ).catch((err) => console.log("Error Connecting MongoDB", err));
}
export default connectDB;