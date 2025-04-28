// filepath: c:\Users\udayb\OneDrive\Desktop\comment\src\types\express.d.ts
import "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export {};
