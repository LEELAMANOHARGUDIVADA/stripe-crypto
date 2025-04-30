import mongoose from "mongoose";

export interface IUser extends Document {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    verificationCode?: number,
    apiKey: string,
    isVerified: boolean,
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verificationCode: Number,
    isVerified: {
        type: Boolean,
        default: false
    },
    apiKey: {
        type: String,
        unique: true
    }
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);

export default User;