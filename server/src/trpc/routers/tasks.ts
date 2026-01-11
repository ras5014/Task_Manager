import { t } from "../trpc";
import { prisma } from "../../db/prisma";
import {
  CreateTaskSchema,
  DeleteTaskSchema,
  UpdateTaskSchema,
} from "../../schemas/task.schema";
import { handlePrismaError } from "../../utils/errorHandler";

export const tasksRouter = t.router({
  getTasks: t.procedure.query(async () => {
    try {
      return prisma.task.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      handlePrismaError(error, "getTasks");
    }
  }),

  createTask: t.procedure
    .input(CreateTaskSchema)
    .mutation(async ({ input }) => {
      try {
        return prisma.task.create({
          data: input,
        });
      } catch (error) {
        handlePrismaError(error, "createTask");
      }
    }),

  updateTask: t.procedure
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

  deleteTask: t.procedure
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
