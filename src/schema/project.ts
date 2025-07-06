import z from "zod";

const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Project title is required")
    .max(100, "Title must be less than 100 characters"),
  image: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
  demoUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  repoUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  tags: z
    .array(z.string())
    .min(1, "At least one tag is required")
    .max(10, "Maximum 10 tags allowed"),
});

const editProjectSchema = projectSchema.extend({
  id: z.number(),
});

export type Project = z.infer<typeof projectSchema>;
export type EditProject = z.infer<typeof editProjectSchema>;

export { projectSchema, editProjectSchema };
