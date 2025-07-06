/* eslint-disable drizzle/enforce-delete-with-where */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { sendAutoReply, sendContactEmail } from "@/lib/email";
import { contacts } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  emailSent: z.boolean().default(false),
});

export const contactRouter = createTRPCRouter({
  submit: publicProcedure
    .input(ContactFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const insertedContacts = await ctx.db
          .insert(contacts)
          .values({
            name: input.name,
            email: input.email,
            subject: input.subject,
            message: input.message,
          })
          .returning();

        const contact = insertedContacts[0];

        if (!contact) {
          throw new Error("Failed to insert contact");
        }

        const emailResult = await sendContactEmail(input);

        const autoReply = await sendAutoReply(input);

        if (!autoReply.success) {
          throw new Error("Failed to send auto reply");
        }

        if (!emailResult.success) {
          await ctx.db
            .update(contacts)
            .set({ emailSent: false })
            .where(eq(contacts.id, contact.id));

          throw new Error("Failed to send email");
        }

        await ctx.db
          .update(contacts)
          .set({ emailSent: true })
          .where(eq(contacts.id, contact.id));

        return {
          success: true,
          message: "Contact form submitted successfully",
          data: contact,
        };
      } catch (error) {
        console.error("Contact form error:", error);
        throw new Error("Failed to submit contact form");
      }
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const allContacts = await ctx.db.select().from(contacts);
    return allContacts;
  }),

  getById: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const contact = await ctx.db
      .select()
      .from(contacts)
      .where(eq(contacts.id, input));

    return contact[0];
  }),

  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const deletedContact = await ctx.db
      .delete(contacts)
      .where(eq(contacts.id, input))
      .returning();
    return deletedContact[0];
  }),

  deleteAll: publicProcedure.mutation(async ({ ctx }) => {
    const deletedContacts = await ctx.db.delete(contacts).returning();
    return deletedContacts;
  }),
});
