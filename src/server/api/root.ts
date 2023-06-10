import { notesRouter } from "@/server/api/routers/mynotes.ts"
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  mynotes: notesRouter,
});

export type AppRouter = typeof appRouter;
