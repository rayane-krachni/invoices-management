import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { z } from "zod";

// PostgreSQL table schema
export const clients = pgTable(
  "clients",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    fullName: varchar("full_name", { length: 150 }).notNull(),
    address: varchar("address", { length: 250 }).notNull(),
    willaya: varchar("willaya", { length: 100 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    activity: varchar("activity", { length: 150 }).default(""),
    art: varchar("art", { length: 50 }).default(""),
    nis: varchar("nis", { length: 50 }).default(""),
    nif: varchar("nif", { length: 50 }).default(""),
    rc: varchar("rc", { length: 50 }).default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    uniqueIndex("client_phone_idx").on(table.phone),
  ]
);

// Zod schema for validation
export const clientSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(1).max(150),
  address: z.string().min(1).max(250),
  willaya: z.string().min(1).max(100),
  phone: z.string().min(1).max(20),
  activity: z.string().nullable(),
  art: z.string().nullable(),
  nis: z.string().nullable(),
  nif: z.string().nullable(),
  rc: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// TypeScript type for the client
export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type ClientSchemaType = z.infer<typeof clientSchema>;