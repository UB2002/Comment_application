import { AppDataSource } from "../data-source";
import { Notification } from "../entities/Notification";

const notifRepo = () => AppDataSource.getRepository(Notification);

export async function handleReplyCreated(payload: {
  toUserId: string;
  commentId: string;
}) {
  const n = notifRepo().create({
    userId: payload.toUserId,
    commentId: payload.commentId,
  });
  await notifRepo().save(n);
}

export class NotificationsService {
  static async list(userId: string) {
    return notifRepo().find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  static async markRead(id: string, userId: string) {
    await notifRepo().update({ id, userId }, { isRead: true });
  }
}
