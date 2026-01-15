import { z } from "zod";

export const RegisterSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const LoginSchema = RegisterSchema.omit({ fullName: true });
