import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthMiddlewareRequest } from "../types/types";
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, "../keys/public.key"), "utf8");
const EXPECTED_ISSUER = process.env.JWT_ISSUER;
const EXPECTED_AUDIENCE = process.env.JWT_AUDIENCE;

const authMiddleware = (req: AuthMiddlewareRequest, res: Response, next: NextFunction):any => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided. Authorization required." });
    }

    if (!PUBLIC_KEY) {
        throw new Error("Public Key is not defined!");
    }

    try {
        const verifyOptions: jwt.VerifyOptions = {
            algorithms: ["RS256"],
        };


        const decoded = jwt.verify(token, PUBLIC_KEY, verifyOptions) as JwtPayload;

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ message: "Token has expired." });
        }

        if (EXPECTED_ISSUER && decoded.iss !== EXPECTED_ISSUER) {
            return res.status(401).json({ message: "Invalid token issuer." });
        }

        if (EXPECTED_AUDIENCE && decoded.aud !== EXPECTED_AUDIENCE) {
            return res.status(401).json({ message: "Invalid token audience." });
        }

        req.user = decoded;
        next();
    } catch (error:any) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token.", error: error.message });
    }
};

export default authMiddleware;
