"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const server_1 = require("@trpc/server");
const middlewares_1 = require("../middlewares");
const prisma_1 = require("../../db/prisma");
const auth_schema_1 = require("../../schemas/auth.schema");
const authHelpers_1 = require("../../utils/authHelpers");
const errorHandler_1 = require("../../utils/errorHandler");
const trpc_1 = require("../trpc");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.authRouter = trpc_1.t.router({
    register: middlewares_1.publicProcedure
        .input(auth_schema_1.RegisterSchema)
        .mutation(async ({ input }) => {
        try {
            const { email, password } = input;
            const hash = await bcrypt_1.default.hash(password, 10);
            const user = await prisma_1.prisma.user.create({
                data: {
                    email: email,
                    password: hash,
                },
            });
            const token = (0, authHelpers_1.signToken)(user.id);
            return { token };
        }
        catch (error) {
            (0, errorHandler_1.handlePrismaError)(error, "register");
        }
    }),
    login: middlewares_1.publicProcedure.input(auth_schema_1.LoginSchema).mutation(async ({ input }) => {
        try {
            const { email, password } = input;
            const user = await prisma_1.prisma.user.findUnique({
                where: { email: email },
            });
            if (!user) {
                throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
            }
            const ok = await bcrypt_1.default.compare(password, user.password);
            if (!ok) {
                throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
            }
            const token = (0, authHelpers_1.signToken)(user.id);
            return { token };
        }
        catch (error) {
            (0, errorHandler_1.handlePrismaError)(error, "login");
        }
    }),
});
