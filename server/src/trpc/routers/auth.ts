import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../middlewares.ts";
import { prisma } from "../../db/prisma.ts";
import { signToken } from "../../utils/authHelpers.ts";
import { handlePrismaError } from "../../utils/errorHandler.ts";
import { t } from "../trpc.ts";
import bcrypt from "bcrypt";
import {
  LoginSchema,
  RegisterApiSchema,
} from "../../../../shared/schemas/auth.schema.ts";

export const authRouter = t.router({
  register: publicProcedure
    .input(RegisterApiSchema)
    .mutation(async ({ input }) => {
      try {
        const { fullName, email, password } = input;
        const hash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
          data: {
            fullName: fullName,
            email: email,
            password: hash,
          },
        });

        const token = signToken(user.id);

        return { token };
      } catch (error) {
        handlePrismaError(error, "register");
      }
    }),

  login: publicProcedure.input(LoginSchema).mutation(async ({ input }) => {
    try {
      const { email, password } = input;

      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        throw new TRPCError({ message: "User not found", code: "NOT_FOUND" });
      }

      const ok = await bcrypt.compare(password, user.password);

      if (!ok) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const token = signToken(user.id);

      return { token };
    } catch (error) {
      handlePrismaError(error, "login");
    }
  }),
});
