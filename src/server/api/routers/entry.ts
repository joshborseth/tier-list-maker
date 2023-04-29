import { z } from "zod";
import { db } from "../../../db/connection";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { entry } from "../../../db/schema";
export const entryRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        imageUrl: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.insert(entry).values(input);
    }),
  get: publicProcedure.query(async () => {
    return await db.select().from(entry);
  }),
});
