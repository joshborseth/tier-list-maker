import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const entryRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ imageUrl: z.string() }))
    .query(({ input }) => {
      return { url: `${input.imageUrl}` };
    }),
});
