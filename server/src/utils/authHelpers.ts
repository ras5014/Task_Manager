import jwt from "jsonwebtoken";

const secret = process.env.JWT_TOKEN || null;

export function signToken(userId: string) {
  if (!secret) {
    throw new Error("JWT_TOKEN environment variable is not set");
  }
  return jwt.sign({ userId }, secret);
}

export function verifyToken(token: string) {
  if (!secret) {
    throw new Error("JWT_TOKEN environment variable is not set");
  }
  return jwt.verify(token, secret);
}
