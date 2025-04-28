import express from "express";
import cors from 'cors';
import { PORT } from "./config";
import authRoutes from "./routes/auth";
import commentsRoutes from "./routes/comment";
import notificationsRoutes from "./routes/notification";
import { errorHandler } from "./middleware/error";


const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
 credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use("/auth", authRoutes);
app.use("/comments", commentsRoutes);
app.use("/notifications", notificationsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
