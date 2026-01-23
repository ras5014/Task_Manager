import { t } from "../trpc.ts";
import { prisma } from "../../db/prisma.ts";
import {
  CreateTaskSchema,
  DeleteTaskSchema,
  UpdateTaskSchema,
} from "../../schemas/task.schema.ts";
import { handlePrismaError } from "../../utils/errorHandler.ts";
import { protectedProcedure } from "../middlewares.ts";

export const tasksRouter = t.router({
  getTasks: protectedProcedure.query(async ({ ctx }) => {
    try {
      return prisma.task.findMany({
        where: { userId: ctx.userId, isCompleted: false },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      handlePrismaError(error, "getTasks");
    }
  }),

  createTask: protectedProcedure
    .input(CreateTaskSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return prisma.task.create({
          data: {
            ...input,
            userId: ctx.userId!,
          },
        });
      } catch (error) {
        handlePrismaError(error, "createTask");
      }
    }),

  updateTask: protectedProcedure
    .input(UpdateTaskSchema)
    .mutation(async ({ input }) => {
      try {
        const { id, ...data } = input;
        return prisma.task.update({
          where: { id },
          data,
        });
      } catch (error) {
        handlePrismaError(error, "updateTask");
      }
    }),

  deleteTask: protectedProcedure
    .input(DeleteTaskSchema)
    .mutation(async ({ input }) => {
      try {
        return prisma.task.delete({
          where: { id: input.id },
        });
      } catch (error) {
        handlePrismaError(error, "deleteTask");
      }
    }),
});
