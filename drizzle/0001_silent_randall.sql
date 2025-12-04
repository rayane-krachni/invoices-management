ALTER TABLE IF EXISTS "invoices"
    ADD COLUMN IF NOT EXISTS "creation" varchar(50) DEFAULT '0';

ALTER TABLE IF EXISTS "invoices"
    ADD COLUMN IF NOT EXISTS "delivery" varchar(50) DEFAULT '0';
