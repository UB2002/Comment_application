import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Notification } from "./Notification";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Comment, (c) => c.user)
  comments!: Comment[];

  @OneToMany(() => Notification, (n) => n.user)
  notifications!: Notification[];
}
