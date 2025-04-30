import { Router } from "express";
import { CryptoConverter, GeneratePayment } from "../controllers/PaymentController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post('/generate-payment',authMiddleware, GeneratePayment);
router.get('/crypto-converter', CryptoConverter);

export default router;