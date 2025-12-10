import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
  integer,
  uniqueIndex,
  boolean,
} from 'drizzle-orm/pg-core'
import { z } from 'zod'

/* =========================
   Invoices Table
========================= */
export const invoices = pgTable(
  'invoices',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    clientId: uuid('client_id').notNull(),
    fournisseurId: uuid('fournisseur_id').notNull(),
    invoiceNumber: varchar('invoice_number', { length: 50 }).notNull(),
    invoiceType: varchar('invoice_type', { length: 50 }).notNull(), // facture type
    creation: varchar('creation', { length: 50 }).default('0'),
    delivery: varchar('delivery', { length: 50 }).default('0'),
    paymentMode: varchar('payment_mode', { length: 50 }).default('Cash'), // Cash by default
    totalHT: numeric('total_ht').notNull().default('0'),
    totalTVA: numeric('total_tva').notNull().default('0'),
    totalTTC: numeric('total_ttc').notNull().default('0'),
    discountAmount: numeric('discount_amount').default('0'),
    chauffeurName: varchar('chauffeur_name', { length: 150 }).default(''),
    chauffeurPhone: varchar('chauffeur_phone', { length: 20 }).default(''),
    transportLicense: varchar('transport_license', { length: 50 }).default(''),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
    useSalePrice: boolean('use_sale_price').notNull().default(false),
  },
  (table) => [uniqueIndex('invoice_number_idx').on(table.invoiceNumber)],
)

/* =========================
   Invoice Items Table
========================= */
export const invoiceItems = pgTable('invoice_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  invoiceId: uuid('invoice_id').notNull(),
  productId: uuid('product_id').notNull(),
  quantity: integer('quantity').notNull().default(1),
  unitPrice: numeric('unit_price').notNull(),
  salePrice: numeric('sale_price').notNull().default('0'),
  taxRate: numeric('tax_rate').default('0'),
})

/* =========================
   Zod Schemas
========================= */
export const invoiceSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid(),
  fournisseurId: z.string().uuid(),
  invoiceNumber: z.string(),
  invoiceType: z.enum([
    'Facture Proforma',
    'Bon de Transfert',
    'Bon de Livraison',
    'Facture',
  ]),
  paymentMode: z.enum(['virement', 'Cheque', 'espèces', 'a_term', 'a_term_3']),
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
  updatedAt: z.date(),
  useSalePrice: z.boolean(),
})

export const invoiceItemSchema = z.object({
  id: z.string().uuid(),
  invoiceId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number(),
  unitPrice: z.number(),
  taxRate: z.number(),
})

/* =========================
   TypeScript Types
========================= */
export type Invoice = typeof invoices.$inferSelect
export type NewInvoice = typeof invoices.$inferInsert

export type InvoiceItem = typeof invoiceItems.$inferSelect
export type NewInvoiceItem = typeof invoiceItems.$inferInsert
