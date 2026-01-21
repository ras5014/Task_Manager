import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || null;

export function signToken(userId: string) {
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  return jwt.sign({ userId }, secret);
}

export function verifyToken(token: string) {
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  return jwt.verify(token, secret);
}
