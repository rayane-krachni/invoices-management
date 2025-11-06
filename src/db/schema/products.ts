import {
  pgTable,
  uuid,
  varchar,
  text,
  numeric,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { z } from "zod";

// Define the products table
export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    code: varchar("code", { length: 50 }).notNull().unique(),
    name: varchar("name", { length: 150 }).notNull(),
    price: numeric("price").notNull(),
    tva: numeric("tva").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("product_code_idx").on(table.code),
  ]
);

// Zod schema for validation
export const productSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(1).max(50),
  name: z.string().min(1).max(150),
  price: z.number(),
  tva: z.number(),
  description: z.string().nullable(),
  createdAt: z.date(),
});

// Type inference
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;