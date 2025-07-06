import { editProjectSchema, projectSchema } from "@/schema/project";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { projects } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
  create: publicProcedure
    .input(projectSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const newProject = await ctx.db
          .insert(projects)
          .values({
            title: input.title,
            description: input.description,
            tags: input.tags,
            image: input.image,
            demoUrl: input.demoUrl,
            repoUrl: input.repoUrl,
          })
          .returning();

        return {
          success: true,
          data: newProject[0],
          message: "Project created successfully",
        };
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Create Project Error:", error.message);
        } else {
          console.error("Unknown error occurred during project creation.");
        }

        return {
          success: false,
          message: "Failed to create project.",
          error: "Failed to create project.",
        };
      }
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const allProjects = await ctx.db.select().from(projects);
      return allProjects;
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      throw new Error("Failed to fetch projects");
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const project = await ctx.db
          .select()
          .from(projects)
          .where(eq(projects.id, input.id))
          .limit(1);

        if (!project.length) {
          throw new Error("Project not found");
        }

        return project[0];
      } catch (error) {
        console.error("Failed to fetch project:", error);
        throw new Error("Failed to fetch project");
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const deletedProject = await ctx.db
          .delete(projects)
          .where(eq(projects.id, input.id))
          .returning();
        return deletedProject[0];
      } catch (error) {
        console.error("Failed to delete project:", error);
        throw new Error("Failed to delete project");
      }
    }),

  update: publicProcedure
    .input(editProjectSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedProject = await ctx.db
          .update(projects)
          .set({
            title: input.title,
            description: input.description,
            tags: input.tags,
            image: input.image,
            demoUrl: input.demoUrl,
            repoUrl: input.repoUrl,
          })
          .where(eq(projects.id, input.id))
          .returning();
        return updatedProject[0];
      } catch (error) {
        console.error("Failed to update project:", error);
        throw new Error("Failed to update project");
      }
    }),
});
