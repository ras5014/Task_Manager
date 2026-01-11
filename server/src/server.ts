import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext } from "./trpc/context.ts";
import { appRouter } from "./trpc/routers";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
