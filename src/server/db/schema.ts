// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `portfolio_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);

export const projects = createTable("project", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  title: d.varchar({ length: 256 }),
  description: d.text(),
  tags: d.varchar({ length: 256 }).array(),
  image: d.varchar({ length: 256 }),
  demoUrl: d.varchar({ length: 256 }),
  repoUrl: d.varchar({ length: 256 }),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}));

export const contacts = createTable("contact", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  name: d.varchar({ length: 256 }),
  email: d.varchar({ length: 256 }),
  subject: d.varchar({ length: 256 }),
  message: d.varchar({ length: 256 }),
  emailSent: d.boolean().default(false),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}));

export const works = createTable("work", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  title: d.varchar({ length: 256 }),
  description: d.text(),
  company: d.varchar({ length: 256 }),
  period: d.varchar({ length: 256 }),

  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}));
