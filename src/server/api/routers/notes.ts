import { z } from "zod"
import { router, publicProcedure } from "../trpc.ts"

export const notesRouter = router({
  newNote: publicProcedure
    .input(
      z.object({
        title: z.string().min(5, { message: "must be 5 or more character" }).max(200, { message: "maximal character is 200" }).trim(),
        description: z.string()
      }) 
    )
    .mutation(async ({ctx, input} => {
      try {
        return await ctx.prisma.notes.create({
          data: {
            title: input.title,
            description: input.description
          }
        })
      } catch(err) {
        console.log(`Notes cannot be created ${err}`)
      }
    })),
  allNotes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.notes.findMany({
      select: {
        title: true,
        id: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  })
}
