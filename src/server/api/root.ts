import { subscribeRouter } from "@/server/api/routers/subscribe.ts";
import { notesRouter } from "@/server/api/routers/notes.ts"
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  subscribe: subscribeRouter,
  notes: notesRouter
});

export type AppRouter = typeof appRouter;
