import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" }) // Explicitly set as uuid type
  postId!: string;

  @ManyToOne(() => User, (u) => u.comments)
  user!: User;

  @Column({ type: "uuid" }) // Explicitly set as uuid type
  userId!: string;

  @ManyToOne(() => Comment, (c) => c.replies, { nullable: true })
  parent!: Comment | null;

  @Column({ type: "uuid", nullable: true }) // Explicitly set as uuid type
  parentId!: string | null;

  @Column({ type: "text" }) // Explicitly set as text type
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  editedAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt!: Date | null;

  @OneToMany(() => Comment, (c) => c.parent)
  replies!: Comment[];
}
