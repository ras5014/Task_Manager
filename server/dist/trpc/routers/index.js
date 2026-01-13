"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const tasks_1 = require("./tasks");
exports.appRouter = trpc_1.t.router({
    tasks: tasks_1.tasksRouter,
});
