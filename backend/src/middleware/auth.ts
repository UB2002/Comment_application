// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../config";

// export interface AuthRequest extends Request {
//   userId?: string;
// }

// export function requireAuth(
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "Unauthorized" });
//   try {
//     const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
//     req.userId = payload.sub;
//     next();
//   } catch {
//     res.status(401).json({ error: "Invalid token" });
//   }
// }

// filepath: c:\Users\udayb\OneDrive\Desktop\comment\src\middleware\auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export interface AuthRequest extends Request {
  userId?: string;
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
    req.userId = payload.sub; // Set userId here
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
