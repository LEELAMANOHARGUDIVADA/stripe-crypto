import express, { Request, Response, Application } from "express"
import cors from "cors"
import userRoutes from "./routes/UserRoutes"
import paymentRoutes from "./routes/PaymentRoutes"

const app:Application = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use('/api/user', userRoutes);
app.use('/api/v1', paymentRoutes);

app.get('/', (req:Request, res:Response) => {
    res.send("STRIPE-CRYPTO BACKEND!");
});

export default app;