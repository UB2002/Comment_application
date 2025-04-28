import { Response } from "express";
import { NotificationsService } from "../services/notifications";
import { AuthRequest } from "../middleware/auth"; // Import the AuthRequest type

export const getNotifications = async (req: AuthRequest, res: Response) => {
  const list = await NotificationsService.list(req.userId!);
  res.json(list);
};

export const markRead = async (req: AuthRequest, res: Response) => {
  await NotificationsService.markRead(req.params.id, req.userId!);
  res.json({ success: true });
};
