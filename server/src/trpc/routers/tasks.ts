import { t } from "../trpc";
import { prisma } from "../../db/prisma";
import {
  CreateTaskSchema,
  DeleteTaskSchema,
  UpdateTaskSchema,
} from "../../schemas/task.schema";

export const tasksRouter = t.router({
  getTasks: t.procedure.query(async () => {
    return prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  createTask: t.procedure
    .input(CreateTaskSchema)
    .mutation(async ({ input }) => {
      return prisma.task.create({
        data: input,
      });
    }),

  updateTask: t.procedure
    .input(UpdateTaskSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.task.update({
        where: { id },
        data,
      });
    }),

  deleteTask: t.procedure
    .input(DeleteTaskSchema)
    .mutation(async ({ input }) => {
      return prisma.task.delete({
        where: { id: input.id },
      });
    }),
});
