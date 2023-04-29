import { z } from "zod";
import { db } from "../../../db/connection";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { cities } from "../../../db/schema";
export const entryRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return await db.insert(cities).values({
        name: input.name,
      });
    }),
  get: publicProcedure.query(async () => {
    return await db.select().from(cities);
  }),
});
