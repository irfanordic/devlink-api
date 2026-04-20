import Express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";

const app = Express()

app.use(Express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(helmet())
app.use(cookieParser())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', jobRoutes)

app.get("/health",authMiddleware, (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});


export default app