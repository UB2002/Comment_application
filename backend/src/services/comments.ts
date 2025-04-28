import { AppDataSource } from "../data-source";
import { Comment } from "../entities/Comment";
import { pub } from "../redis";
import { IsNull } from "typeorm";

const commentRepo = () => AppDataSource.getRepository(Comment);
const TTL_MINUTES = 15;

export class CommentsService {
  static async create(data: {
    userId: string;
    postId: string;
    parentId?: string;
    content: string;
  }) {
    const comment = commentRepo().create(data);
    await commentRepo().save(comment);
    if (data.parentId) {
      const parent = await commentRepo().findOneBy({ id: data.parentId });
      if (parent) {
        await pub.publish(
          "reply_created",
          JSON.stringify({ toUserId: parent.userId, commentId: comment.id })
        );
      }
    }
    return comment;
  }

  static async list(postId: string) {
    const all = await commentRepo().find({
      where: { postId, deletedAt: IsNull() },
      order: { createdAt: "ASC" },
    });
    const map = new Map(all.map((c) => [c.id, { ...c, replies: [] as any[] }]));
    const roots: any[] = [];
    for (const c of map.values()) {
      if (c.parentId && map.has(c.parentId)) {
        map.get(c.parentId)!.replies.push(c);
      } else {
        roots.push(c);
      }
    }
    return roots;
  }

  static async edit(id: string, userId: string, content: string) {
    const c = await commentRepo().findOneBy({ id });
    if (!c || c.userId !== userId) throw { status: 403, message: "Forbidden" };
    if (Date.now() - c.createdAt.getTime() > TTL_MINUTES * 60000)
      throw { status: 400, message: "Edit window expired" };
    c.content = content;
    c.editedAt = new Date();
    return commentRepo().save(c);
  }

  static async softDelete(id: string, userId: string) {
    const c = await commentRepo().findOneBy({ id });
    if (!c || c.userId !== userId) throw { status: 403, message: "Forbidden" };
    if (Date.now() - c.createdAt.getTime() > TTL_MINUTES * 60000)
      throw { status: 400, message: "Delete window expired" };
    c.deletedAt = new Date();
    await commentRepo().save(c);
  }

  static async restore(id: string, userId: string) {
    const c = await commentRepo().findOneBy({ id });
    if (!c || c.userId !== userId || !c.deletedAt)
      throw { status: 403, message: "Cannot restore" };
    if (Date.now() - c.deletedAt.getTime() > TTL_MINUTES * 60000)
      throw { status: 400, message: "Restore window expired" };
    c.deletedAt = null;
    await commentRepo().save(c);
  }
}
