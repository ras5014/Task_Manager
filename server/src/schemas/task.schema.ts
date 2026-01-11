import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  isCompleted: z.boolean().default(false),
  createdAt: z.date(),
});

export const CreateTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
});

export const UpdateTaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  isCompleted: z.boolean().optional(),
});

export const DeleteTaskSchema = z.object({
  id: z.string().uuid(),
});

// This schema will later be reused by both server & client
