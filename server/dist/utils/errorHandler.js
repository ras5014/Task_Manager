"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrismaError = handlePrismaError;
const server_1 = require("@trpc/server");
const client_1 = require("../../prisma/generated/prisma/client");
function handlePrismaError(error, operation) {
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2025":
                throw new server_1.TRPCError({
                    code: "NOT_FOUND",
                    message: `Record not found for ${operation}`,
                });
            case "P2002":
                throw new server_1.TRPCError({
                    code: "CONFLICT",
                    message: `Unique constraint violation in ${operation}`,
                });
            default:
                throw new server_1.TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Database error during ${operation}`,
                    cause: error,
                });
        }
    }
    throw new server_1.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to ${operation}`,
        cause: error,
    });
}
