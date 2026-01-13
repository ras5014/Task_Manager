import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext } from "./trpc/context.ts";
import { prisma } from "./db/prisma.ts";
import { appRouter } from "./trpc/routers/index.ts";
import { config } from "dotenv";

// Load from .env.local specifically
config({ path: ".env.local" });

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

// Database connection check before starting server
async function startServer() {
  try {
    await prisma.$connect();
    console.log("✓ Database connected successfully");

    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });
  } catch (error) {
    console.error("✗ Failed to connect to database:", error);
    process.exit(1);
  }
}

// Graceful shutdown
// process.on("SIGINT", async () => {
//   await prisma.$disconnect();
//   console.log("Database disconnected");
//   process.exit(0);
// });

startServer();

export type AppRouter = typeof appRouter;
