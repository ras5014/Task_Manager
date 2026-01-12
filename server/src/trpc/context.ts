import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { verifyToken } from "../utils/authHelpers.ts";

export type Context = {
  userId?: string;
};

export function createContext({ req }: CreateExpressContextOptions) {
  const auth = req.headers.authorization;

  if (!auth) return {};

  const token = auth.replace("Bearer ", "");

  try {
    const payload = verifyToken(token);
    if (typeof payload === "string" || !payload.userId) {
      return {};
    }
    return { userId: payload.userId };
  } catch (error) {
    return {};
  }
}
