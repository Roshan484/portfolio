import z from "zod";

export const workSchema = z.object({
  title: z
    .string()
    .min(1, "Work title is required")
    .max(100, "Title must be less than 100 characters"),
  company: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name must be less than 100 characters"),
  period: z
    .string()
    .min(1, "Period is required")
    .max(100, "Period must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
});

export const editWorkSchema = workSchema.extend({
  id: z.number(),
});
