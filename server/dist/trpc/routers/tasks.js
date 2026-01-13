"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const trpc_1 = require("../trpc");
const prisma_1 = require("../../db/prisma");
const task_schema_1 = require("../../schemas/task.schema");
const errorHandler_1 = require("../../utils/errorHandler");
const middlewares_1 = require("../middlewares");
exports.tasksRouter = trpc_1.t.router({
    getTasks: middlewares_1.protectedProcedure.query(async ({ ctx }) => {
        try {
            return prisma_1.prisma.task.findMany({
                where: { userId: ctx.userId },
                orderBy: { createdAt: "desc" },
            });
        }
        catch (error) {
            (0, errorHandler_1.handlePrismaError)(error, "getTasks");
        }
    }),
    createTask: middlewares_1.protectedProcedure
        .input(task_schema_1.CreateTaskSchema)
        .mutation(async ({ input, ctx }) => {
        try {
            return prisma_1.prisma.task.create({
                data: {
                    ...input,
                    userId: ctx.userId,
                },
            });
        }
        catch (error) {
            (0, errorHandler_1.handlePrismaError)(error, "createTask");
        }
    }),
    updateTask: middlewares_1.protectedProcedure
        .input(task_schema_1.UpdateTaskSchema)
        .mutation(async ({ input }) => {
        try {
            const { id, ...data } = input;
            return prisma_1.prisma.task.update({
                where: { id },
                data,
            });
        }
        catch (error) {
            (0, errorHandler_1.handlePrismaError)(error, "updateTask");
        }
    }),
    deleteTask: middlewares_1.protectedProcedure
        .input(task_schema_1.DeleteTaskSchema)
        .mutation(async ({ input }) => {
        try {
            return prisma_1.prisma.task.delete({
                where: { id: input.id },
            });
        }
        catch (error) {
            (0, errorHandler_1.handlePrismaError)(error, "deleteTask");
        }
    }),
});
