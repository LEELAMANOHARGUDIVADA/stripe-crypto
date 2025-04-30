import { Request, Response } from "express";
import { GeneratePaymentRequest } from "../types/types";
import User from "../models/UserSchema";
import Payment from "../models/PaymentSchema";
import cryptoConverter from "../utils/cryptoConverter";

const GeneratePayment = async(req:GeneratePaymentRequest,res:Response):Promise<any | void> => {
    try {
        const { amount, currency } = req.body;

        if(!amount || !currency || !req.user){
            throw new Error("All Fields Are Required!");
        }
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        const newPayment = new Payment({
            amount,
            currency,
            user: req.user.id
        });
        await newPayment.save();

        res.status(201).json({ success: true, message: "New Payment Order Created", newPayment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const CryptoConverter = async(req:Request,res:Response) => {
    const response = await cryptoConverter(`ethereum`);
    res.status(200).json({ response });
}

export { GeneratePayment, CryptoConverter };