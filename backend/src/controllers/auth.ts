import { Request, Response } from "express";
import { AuthService } from "../services/auth";

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await AuthService.signup(email, password);
  res.json({ token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await AuthService.login(email, password);
  res.json({ token });
};
