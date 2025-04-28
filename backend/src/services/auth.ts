import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const userRepo = () => AppDataSource.getRepository(User);

export class AuthService {
  static async signup(email: string, pwd: string) {
    const hash = await bcrypt.hash(pwd, 10);
    const user = userRepo().create({ email, passwordHash: hash });
    await userRepo().save(user);
    return jwt.sign({}, JWT_SECRET, { subject: user.id, expiresIn: "1h" });
  }

  static async login(email: string, pwd: string) {
    const user = await userRepo().findOneBy({ email });
    if (!user || !(await bcrypt.compare(pwd, user.passwordHash)))
      throw { status: 401, message: "Invalid credentials" };
    return jwt.sign({}, JWT_SECRET, { subject: user.id, expiresIn: "1h" });
  }
}
