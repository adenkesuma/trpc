import { subscribeRouter } from "@/server/api/routers/subscribe";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  subscribe: subscribeRouter,
});

export type AppRouter = typeof appRouter;
