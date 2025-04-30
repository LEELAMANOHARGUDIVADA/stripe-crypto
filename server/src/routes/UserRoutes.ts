import { Router } from "express";
import { GenerateAPIKey, Login, Register, VerifyOtp } from "../controllers/UserController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/verifyOtp", VerifyOtp);
router.post("/generateApiKey", authMiddleware, GenerateAPIKey);

export default router;