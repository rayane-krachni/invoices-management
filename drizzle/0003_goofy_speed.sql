DROP INDEX IF EXISTS "fournisseur_phone_idx";
ALTER TABLE "fournisseurs" ADD COLUMN IF NOT EXISTS "email" varchar(50) DEFAULT '';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "sale_price" numeric DEFAULT 0 NOT NULL;
