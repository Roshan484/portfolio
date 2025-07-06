import { editWorkSchema, workSchema } from "@/schema/work";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { works } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const workRouter = createTRPCRouter({
  create: publicProcedure.input(workSchema).mutation(async ({ ctx, input }) => {
    try {
      const newWork = await ctx.db
        .insert(works)
        .values({
          title: input.title,
          description: input.description,
          company: input.company,
          period: input.period,
        })
        .returning();

      return {
        success: true,
        data: newWork[0],
        message: "Work created successfully",
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Create Work Error:", error.message);
      } else {
        console.error("Unknown error occurred during work creation.");
      }

      return {
        success: false,
        message: "Failed to create work",
      };
    }
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const allWorks = await ctx.db.select().from(works);
      return allWorks;
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      throw new Error("Failed to fetch projects");
    }
  }),

  delete: publicProcedure
    .input(editWorkSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const deletedWork = await ctx.db
          .delete(works)
          .where(eq(works.id, input.id))
          .returning();
        return deletedWork[0];
      } catch (error) {
        console.error("Failed to delete work:", error);
        throw new Error("Failed to delete work");
      }
    }),

  update: publicProcedure
    .input(editWorkSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedWork = await ctx.db
          .update(works)
          .set({
            title: input.title,
            description: input.description,
            company: input.company,
            period: input.period,
          })
          .where(eq(works.id, input.id))
          .returning();
        return updatedWork[0];
      } catch (error) {
        console.error("Failed to update work:", error);
        throw new Error("Failed to update work");
      }
    }),
});
