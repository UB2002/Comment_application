import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { getNotifications, markRead } from "../controllers/notifications";

const r = Router();
r.use(requireAuth);
r.get("/", getNotifications);
r.patch("/:id/read", markRead);
export default r;
