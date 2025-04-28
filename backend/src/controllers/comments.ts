import { Request, Response } from "express";
import { CommentsService } from "../services/comments";
import { AuthRequest } from "../middleware/auth"; // Import the AuthRequest type
import {v4 as uuidv4} from 'uuid';

// Change Request to AuthRequest in all controller functions
export const createComment = async (req: AuthRequest, res: Response) => {
  const postID = uuidv4();
  const c = await CommentsService.create({
  
    userId: req.userId!,
    postId: postID,
    parentId: req.body.parentId,
    content: req.body.content,
  });
  res.json(c);
};

export const getComments = async (req: Request, res: Response) => {
  const list = await CommentsService.list(req.params.postId);
  res.json(list);
};

export const editComment = async (req: AuthRequest, res: Response) => {
  const c = await CommentsService.edit(
    req.params.id,
    req.userId!,
    req.body.content
  );
  res.json(c);
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  await CommentsService.softDelete(req.params.id, req.userId!);
  res.json({ success: true });
};

export const restoreComment = async (req: AuthRequest, res: Response) => {
  await CommentsService.restore(req.params.id, req.userId!);
  res.json({ success: true });
};
