import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface RegisterRequest {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface VerifyOtpRequest {
    otp: number,
    email: string
}

export interface GenerateAPIKeyRequest extends Request {
    user?: string | ObjectId | any;
}

export interface AuthMiddlewareRequest extends Request {
    user?: string | JwtPayload;
}

export interface AuthPayload extends JwtPayload {
    id: string;
}
export interface GeneratePaymentRequest extends Request {
    body: {
        amount: number;
        currency: string;
      };
      user?: AuthPayload;
}