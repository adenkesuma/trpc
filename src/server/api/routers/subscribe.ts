import { router, publicProcedure } from "../trpc.ts"
import { z } from "zod"

const subscribeRouter = router({
  sub: publicProcedure
    .input(
      z.object({
        text: z.string().min(5, { message: "text must be 5 or more characters" })
      })  
    )
    .query(({ input }) => {
      return {
        pleaseSub: `please do subcribe to: ${input?.text}`
      }
    })
})
