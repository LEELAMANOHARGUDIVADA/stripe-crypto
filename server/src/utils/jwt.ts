import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, "../keys/private.key"), "utf8");
const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_AUDIENCE = process.env.JWT_AUDIENCE;

const generateToken = (id:Object) => {
    if(!PRIVATE_KEY){
        throw new Error("PRIVATE_KEY is undefined or null");
    }
    return jwt.sign({ id }, PRIVATE_KEY, {
        expiresIn: '24h',
        algorithm: 'RS256',
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE
    });
}

export default generateToken;