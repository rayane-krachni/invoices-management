import { db } from "@/db";
import { invoices, invoiceItems, clients, fournisseurs, products, NewInvoice, NewInvoiceItem } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

// Create invoice with items
export const createInvoiceServerFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: any) => data) // you can replace with zod later
  .handler(async ({ data }) => {
    const { items, ...invoiceData } = data;

    // Ensure optional fields have defaults
    const invoiceInsert: NewInvoice = {
      ...invoiceData,
      paymentMode: invoiceData.paymentMode ?? "Cash",
      discountAmount: invoiceData.discountAmount ?? 0,
      chauffeurName: invoiceData.chauffeurName ?? "",
      chauffeurPhone: invoiceData.chauffeurPhone ?? "",
      transportLicense: invoiceData.transportLicense ?? "",
      totalHT: invoiceData.totalHT,
      totalTVA: invoiceData.totalTVA,
      totalTTC: invoiceData.totalTTC,
    };

    // Insert invoice
    const [invoice] = await db.insert(invoices).values(invoiceInsert).returning();

    // Insert invoice items
    const itemsInsert: NewInvoiceItem[] = items.map((item: any) => ({
      invoiceId: invoice.id,
      productId: item.productId,
      quantity: item.quantity ?? 1,
      unitPrice: item.unitPrice,
      taxRate: item.taxRate ?? 0,
    }));

    const insertedItems = await db.insert(invoiceItems).values(itemsInsert).returning();

    return { success: true, invoice, items: insertedItems };
  });

// Load all invoices with details
export const loadInvoicesServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const list = await db
    .select({
      invoice: invoices,
      client: clients,
      fournisseur: fournisseurs,
    })
    .from(invoices)
    .leftJoin(clients, eq(clients.id, invoices.clientId))
    .leftJoin(fournisseurs, eq(fournisseurs.id, invoices.fournisseurId));

  // Fetch items for each invoice
  const result = await Promise.all(
    list.map(async (inv) => {
      const items = await db
        .select({
          item: invoiceItems,
          product: products,
        })
        .from(invoiceItems)
        .leftJoin(products, eq(products.id, invoiceItems.productId))
        .where(eq(invoiceItems.invoiceId, inv.invoice.id));
      return { ...inv, items };
    })
  );

  return result;
});

// Update invoice (basic)
export const updateInvoiceServerFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: { id: string; formData: any }) => data)
  .handler(async ({ data }) => {
    const [invoice] = await db
      .update(invoices)
      .set(data.formData)
      .where(eq(invoices.id, data.id))
      .returning();
    return { success: true, invoice };
  });

// Delete invoice
export const deleteInvoiceServerFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    // Delete related items first
    await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, data.id));

    // Delete invoice
    await db.delete(invoices).where(eq(invoices.id, data.id));

    return { success: true };
  });
