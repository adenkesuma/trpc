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
    .mutation(async ({ctx, input}) => {
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
    }
  ),
  detailNode: publicProcedure
    .input(
      z.object({
        id: z.string() 
      })   
    )
    .query(async ({ctx, input}) => {
      const { id } = input
      try {
        return await ctx.prisma.notes.findUnique({
          where: {
            id,
          }
        })
      } catch(err) {
        console.log(`Note detail not found ${err}`)
      }
    }
  ),
  updateNote: publicProcedure
    .input(
      z.object({
        title: z.string().min(5, { message: "must be 5 or more" }).max(200, { message: "maximal 200 of the character"}).trim(),
        description: z.string(),
        id: z.string()
      })
    )
    .mutation(async ({ctx, input}) => {
      const { id } = input
      try {
        return await ctx.prisma.notes.update({
          where: {
            id,
          },
          data: {
            title: input.title,
            description: input.description
          }
        })
      } catch(err) {
        console.log(`Note cannot be updated ${err}`)
      }
    }
  ),
  deleteNote: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ctx, input}) => {
      const { id } = input
      try {
        return await ctx.prisma.notes.delete({
          where: {
            id,
          }
        })
      } catch(err) {
        console.log(`note cannot be deleted ${err}`)
      }
    }
  ),
  allNotes: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma?.notes?.findMany({
        select: {
          title: true,
          id: true
        },
        orderBy: {
          createdAt: "desc"
        }
      })
    } catch(err) {
      console.log(`cannot fetch your notes ${err}`)
    }
  })
})
