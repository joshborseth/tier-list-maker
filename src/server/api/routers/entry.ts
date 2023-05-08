import { z } from "zod";
import { db } from "../../../db/connection";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { entry } from "../../../db/schema";
import { eq } from "drizzle-orm";
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
  //TODO: make this a protected procedure
  //TODO: delete from the bucket aswell
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.delete(entry).where(eq(entry.id, input.id));
    }),
});
