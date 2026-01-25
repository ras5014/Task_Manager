import { z } from "zod";

const BaseSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const RegisterSchema = BaseSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const LoginSchema = BaseSchema.omit({ fullName: true });

export type RegisterFormInputs = z.infer<typeof RegisterSchema>;
export const RegisterApiSchema = BaseSchema;
export type LoginFormInputs = z.infer<typeof LoginSchema>;
