import { Request, Response } from "express";
import User, { IUser } from "../models/UserSchema";
import { AuthMiddlewareRequest, GenerateAPIKeyRequest, LoginRequest, RegisterRequest, VerifyOtpRequest } from "../types/types";
import bcrypt from "bcryptjs"
import generateToken from "../utils/jwt";
import { sendVerificationOtp } from "../nodemailer/email";
import generateKey from "../utils/generateApiKey";

const Register = async (req: Request<{}, {}, RegisterRequest>, res: Response): Promise<string | any> => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            throw new Error("All Fields Are Required!");
        }

        const exisitingUser = await User.findOne({ email });

        if (exisitingUser) {
            return res.status(400).json({ success: false, message: "User Already Exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const otp = Math.floor(100000 + Math.random() * 900000);

        const user = new User({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            verificationCode: otp
        });
        await user.save();

        sendVerificationOtp({ email: user.email, otp: otp });

        res.status(201).json({ success: true, message: "Registration Successful"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const VerifyOtp = async (req: Request<{}, {}, VerifyOtpRequest>, res: Response): Promise<string | any> => {
    try {
        const { otp, email } = req.body;
        if (!otp || !email) throw new Error('All Fields Are Required');

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: 'User Not Found' });

        if (otp != user.verificationCode) return res.status(400).json({ success: false, message: "Invalid OTP" });

        user.isVerified = true;
        user.save();
        return res.status(200).json({ success: true, message: 'Otp Verification Successful', token: generateToken(user._id) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const Login = async (req: Request<{}, {}, LoginRequest>, res: Response): Promise<string | any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("All Fields Are Required!");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) return res.status(400).json({ success: false, message: 'Invalid Password' });

        res.status(200).json({ success: true, message: "Login Successful", token: generateToken(user._id) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const GenerateAPIKey = async(req:GenerateAPIKeyRequest,res:Response):Promise<string | any> => {
    try {
        const { id } = req.user;

        const apiKey = generateKey();

        const user = await User.findByIdAndUpdate(id, {
            apiKey: apiKey
        });

        if(!user){
            return res.status(404).json({ success: false, message: "User Not Found!" });
        }

        res.status(201).json({ success: true, message: "API KEY Generated!", APIKEY: apiKey });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export { Register, Login, VerifyOtp, GenerateAPIKey };