import mongoose, { ObjectId } from "mongoose";

export interface IPayment extends Document {
    amount: number,
    currency: string,
    user: ObjectId,
    createdAt: Date,
    updatedAt: Date
}

const paymentSchema = new mongoose.Schema<IPayment>({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;