"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicProcedure = exports.protectedProcedure = void 0;
const server_1 = require("@trpc/server");
const trpc_1 = require("./trpc");
const isAuthed = trpc_1.t.middleware(({ ctx, next }) => {
    if (!ctx.userId) {
        throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            userId: ctx.userId,
        },
    });
});
exports.protectedProcedure = trpc_1.t.procedure.use(isAuthed);
exports.publicProcedure = trpc_1.t.procedure;
