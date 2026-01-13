import { t } from "../trpc.ts";
import { tasksRouter } from "./tasks.ts";

export const appRouter = t.router({
  tasks: tasksRouter,
});
