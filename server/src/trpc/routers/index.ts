import { t } from "../trpc.ts";
import { authRouter } from "./auth.ts";
import { tasksRouter } from "./tasks.ts";

export const appRouter = t.router({
  auth: authRouter,
  tasks: tasksRouter,
});
