import { Router } from "express";
import {
  createComment,
  getComments,
  editComment,
  deleteComment,
  restoreComment,
} from "../controllers/comments";
import { requireAuth } from "../middleware/auth";

const r = Router();

r.use(requireAuth);
r.post("/", createComment);
r.get("/:postId", getComments);
r.patch("/:id", editComment);
r.delete("/:id", deleteComment);
r.post("/:id/restore", restoreComment);

export default r;
