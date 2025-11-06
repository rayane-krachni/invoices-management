CREATE TABLE "fournisseurs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(150) NOT NULL,
	"address" varchar(250) NOT NULL,
	"willaya" varchar(100) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"activity" varchar(150) DEFAULT '',
	"art" varchar(50) DEFAULT '',
	"nis" varchar(50) DEFAULT '',
	"nif" varchar(50) DEFAULT '',
	"rc" varchar(50) DEFAULT '',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(150) NOT NULL,
	"address" varchar(250) NOT NULL,
	"willaya" varchar(100) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"activity" varchar(150) DEFAULT '',
	"art" varchar(50) DEFAULT '',
	"nis" varchar(50) DEFAULT '',
	"nif" varchar(50) DEFAULT '',
	"rc" varchar(50) DEFAULT '',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "invoice_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoice_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit_price" numeric NOT NULL,
	"tax_rate" numeric DEFAULT '0'
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"fournisseur_id" uuid NOT NULL,
	"invoice_number" varchar(50) NOT NULL,
	"invoice_type" varchar(50) NOT NULL,
	"payment_mode" varchar(50) DEFAULT 'Cash',
	"total_ht" numeric DEFAULT '0' NOT NULL,
	"total_tva" numeric DEFAULT '0' NOT NULL,
	"total_ttc" numeric DEFAULT '0' NOT NULL,
	"discount_amount" numeric DEFAULT '0',
	"chauffeur_name" varchar(150) DEFAULT '',
	"chauffeur_phone" varchar(20) DEFAULT '',
	"transport_license" varchar(50) DEFAULT '',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(50) NOT NULL,
	"name" varchar(150) NOT NULL,
	"price" numeric NOT NULL,
	"tva" numeric NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "fournisseur_phone_idx" ON "fournisseurs" USING btree ("phone");--> statement-breakpoint
CREATE UNIQUE INDEX "client_phone_idx" ON "clients" USING btree ("phone");--> statement-breakpoint
CREATE UNIQUE INDEX "invoice_number_idx" ON "invoices" USING btree ("invoice_number");--> statement-breakpoint
CREATE UNIQUE INDEX "product_code_idx" ON "products" USING btree ("code");