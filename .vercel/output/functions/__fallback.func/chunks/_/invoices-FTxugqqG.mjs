import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { pgTable, timestamp, varchar, uuid, uniqueIndex, numeric, text, integer } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { createEnv } from '@t3-oss/env-core';
import dotenv from 'dotenv';

const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    code: varchar("code", { length: 50 }).notNull().unique(),
    name: varchar("name", { length: 150 }).notNull(),
    price: numeric("price").notNull(),
    tva: numeric("tva").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    uniqueIndex("product_code_idx").on(table.code)
  ]
);
const productSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(1).max(50),
  name: z.string().min(1).max(150),
  price: z.number(),
  tva: z.number(),
  description: z.string().nullable(),
  createdAt: z.date()
});
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  productSchema,
  products
}, Symbol.toStringTag, { value: "Module" }));
dotenv.config();
const serverEnv = createEnv({
  server: {
    // Node environment
    NODE_ENV: z.enum(["development", "test", "production"]).default("development").describe("Node environment"),
    // Database
    DATABASE_URL: z.url().describe("PostgreSQL database connection URL"),
    PGUSER: z.string().default("postgres").describe("PostgreSQL username"),
    PGPASSWORD: z.string().default("POSTGRES").describe("PostgreSQL password"),
    PGDATABASE: z.string().default("invoices_db").describe("Database name"),
    PGPORT: z.coerce.number().default(5432).describe("PostgreSQL port"),
    PGHOST: z.string().default("localhost").describe("PostgreSQL host")
  },
  // Runtime environment variables
  runtimeEnv: process.env,
  // Skip validation during build if env vars aren't set
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  // Treat empty strings as undefined
  emptyStringAsUndefined: true
});
const client = postgres(serverEnv.DATABASE_URL);
const db = drizzle({
  client,
  schema,
  casing: "snake_case"
});
const fournisseurs = pgTable(
  "fournisseurs",
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
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow()
  },
  (table) => [
    uniqueIndex("fournisseur_phone_idx").on(table.phone)
  ]
);
z.object({
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
  updatedAt: z.date()
});
const clients = pgTable(
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
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow()
  },
  (table) => [
    uniqueIndex("client_phone_idx").on(table.phone)
  ]
);
z.object({
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
  updatedAt: z.date()
});
const invoices = pgTable(
  "invoices",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clientId: uuid("client_id").notNull(),
    fournisseurId: uuid("fournisseur_id").notNull(),
    invoiceNumber: varchar("invoice_number", { length: 50 }).notNull(),
    invoiceType: varchar("invoice_type", { length: 50 }).notNull(),
    // facture type
    creation: varchar("creation", { length: 50 }).default("0"),
    delivery: varchar("delivery", { length: 50 }).default("0"),
    paymentMode: varchar("payment_mode", { length: 50 }).default("Cash"),
    // Cash by default
    totalHT: numeric("total_ht").notNull().default("0"),
    totalTVA: numeric("total_tva").notNull().default("0"),
    totalTTC: numeric("total_ttc").notNull().default("0"),
    discountAmount: numeric("discount_amount").default("0"),
    chauffeurName: varchar("chauffeur_name", { length: 150 }).default(""),
    chauffeurPhone: varchar("chauffeur_phone", { length: 20 }).default(""),
    transportLicense: varchar("transport_license", { length: 50 }).default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow()
  },
  (table) => [uniqueIndex("invoice_number_idx").on(table.invoiceNumber)]
);
const invoiceItems = pgTable(
  "invoice_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    invoiceId: uuid("invoice_id").notNull(),
    productId: uuid("product_id").notNull(),
    quantity: integer("quantity").notNull().default(1),
    unitPrice: numeric("unit_price").notNull(),
    taxRate: numeric("tax_rate").default("0")
  }
);
z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid(),
  fournisseurId: z.string().uuid(),
  invoiceNumber: z.string(),
  invoiceType: z.enum(["Facture Proforma", "Bon de Transfert", "Bon de Livraison", "Facture"]),
  paymentMode: z.enum(["virement", "Cheque", "esp\xE8ces", "a_term", "a_term_3"]),
  totalHT: z.number(),
  totalTVA: z.number(),
  totalTTC: z.number(),
  creation: z.string().nullable(),
  delivery: z.string().nullable(),
  discountAmount: z.number().nullable(),
  chauffeurName: z.string().nullable(),
  chauffeurPhone: z.string().nullable(),
  transportLicense: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
});
z.object({
  id: z.string().uuid(),
  invoiceId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number(),
  unitPrice: z.number(),
  taxRate: z.number()
});

export { invoiceItems as a, clients as c, db as d, fournisseurs as f, invoices as i, products as p };
//# sourceMappingURL=invoices-FTxugqqG.mjs.map
