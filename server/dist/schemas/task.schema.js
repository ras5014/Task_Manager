"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskSchema = exports.UpdateTaskSchema = exports.CreateTaskSchema = exports.TaskSchema = void 0;
const zod_1 = require("zod");
exports.TaskSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1).max(255),
    description: zod_1.z.string().optional(),
    isCompleted: zod_1.z.boolean().default(false),
    createdAt: zod_1.z.date(),
});
exports.CreateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(255),
    description: zod_1.z.string().optional(),
});
exports.UpdateTaskSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1).max(255).optional(),
    description: zod_1.z.string().optional(),
    isCompleted: zod_1.z.boolean().optional(),
});
exports.DeleteTaskSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
// This schema will later be reused by both server & client
