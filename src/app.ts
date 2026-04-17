import Express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import userRoutes from "./routes/user.routes.js";

const app = Express()

app.use(Express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(helmet())
app.use(cookieParser())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.get("/health",authMiddleware, (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});


export default app