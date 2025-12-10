import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { email, z } from 'zod'
import { ca } from 'zod/v4/locales'

// PostgreSQL table schema
export const fournisseurs = pgTable('fournisseurs', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: varchar('full_name', { length: 150 }).notNull(),
  address: varchar('address', { length: 250 }).notNull(),
  willaya: varchar('willaya', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  activity: varchar('activity', { length: 150 }).default(''),
  art: varchar('art', { length: 50 }).default(''),
  nis: varchar('nis', { length: 50 }).default(''),
  nif: varchar('nif', { length: 50 }).default(''),
  rc: varchar('rc', { length: 50 }).default(''),
  email: varchar('email', { length: 50 }).default(''),
  capital: varchar('capital', { length: 50 }).default(''),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// Zod schema for validation
export const fournisseurSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(1).max(150),
  address: z.string().min(1).max(250),
  willaya: z.string().min(1).max(100),
  phone: z.string().min(1).max(20),
  email: z.string().nullable(),
  capital: z.string().nullable(),
  activity: z.string().nullable(),
  art: z.string().nullable(),
  nis: z.string().nullable(),
  nif: z.string().nullable(),
  rc: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// TypeScript type for the fournisseur
export type Fournisseur = typeof fournisseurs.$inferSelect
export type NewFournisseur = typeof fournisseurs.$inferInsert
