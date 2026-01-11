import { TRPCError } from "@trpc/server";
import { Prisma } from "../../prisma/generated/prisma/client";

export function handlePrismaError(error: unknown, operation: string) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2025":
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Record not found for ${operation}`,
        });
      case "P2002":
        throw new TRPCError({
          code: "CONFLICT",
          message: `Unique constraint violation in ${operation}`,
        });
      default:
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Database error during ${operation}`,
          cause: error,
        });
    }
  }
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: `Failed to ${operation}`,
    cause: error,
  });
}
