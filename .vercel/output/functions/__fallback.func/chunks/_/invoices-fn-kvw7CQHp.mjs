import { c as createServerRpc, a as createServerFn } from '../virtual/entry.mjs';
import { d as db, i as invoices, a as invoiceItems, f as fournisseurs, c as clients, p as products } from './invoices-BVDPhziD.mjs';
import { eq } from 'drizzle-orm';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:async_hooks';
import 'react/jsx-runtime';
import '@tanstack/react-router/ssr/server';
import '@tanstack/react-router';
import 'drizzle-orm/postgres-js';
import 'postgres';
import 'drizzle-orm/pg-core';
import 'zod';
import '@t3-oss/env-core';
import 'dotenv';

const createInvoiceServerFn_createServerFn_handler = createServerRpc("314aafe3c67b13ba2756744c451fde4d04b64f9fab9da6d47eb411383be27f9e", (opts, signal) => {
  return createInvoiceServerFn.__executeServer(opts, signal);
});
const createInvoiceServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createInvoiceServerFn_createServerFn_handler, async ({
  data
}) => {
  const {
    items,
    ...invoiceData
  } = data;
  const invoiceInsert = {
    ...invoiceData,
    paymentMode: invoiceData.paymentMode ?? "Cash",
    discountAmount: invoiceData.discountAmount ?? 0,
    chauffeurName: invoiceData.chauffeurName ?? "",
    chauffeurPhone: invoiceData.chauffeurPhone ?? "",
    transportLicense: invoiceData.transportLicense ?? "",
    totalHT: invoiceData.totalHT,
    totalTVA: invoiceData.totalTVA,
    totalTTC: invoiceData.totalTTC
  };
  const [invoice] = await db.insert(invoices).values(invoiceInsert).returning();
  const itemsInsert = items.map((item) => ({
    invoiceId: invoice.id,
    productId: item.productId,
    quantity: item.quantity ?? 1,
    unitPrice: item.unitPrice,
    taxRate: item.taxRate ?? 0
  }));
  const insertedItems = await db.insert(invoiceItems).values(itemsInsert).returning();
  return {
    success: true,
    invoice,
    items: insertedItems
  };
});
const loadInvoicesServerFn_createServerFn_handler = createServerRpc("6ac854ca9a9ac93187741d9fdd48a679c392ca33ae469ad3375841518329fdc2", (opts, signal) => {
  return loadInvoicesServerFn.__executeServer(opts, signal);
});
const loadInvoicesServerFn = createServerFn({
  method: "GET"
}).handler(loadInvoicesServerFn_createServerFn_handler, async () => {
  const list = await db.select({
    invoice: invoices,
    client: clients,
    fournisseur: fournisseurs
  }).from(invoices).leftJoin(clients, eq(clients.id, invoices.clientId)).leftJoin(fournisseurs, eq(fournisseurs.id, invoices.fournisseurId));
  const result = await Promise.all(list.map(async (inv) => {
    const items = await db.select({
      item: invoiceItems,
      product: products
    }).from(invoiceItems).leftJoin(products, eq(products.id, invoiceItems.productId)).where(eq(invoiceItems.invoiceId, inv.invoice.id));
    return {
      ...inv,
      items
    };
  }));
  return result;
});
const updateInvoiceServerFn_createServerFn_handler = createServerRpc("403f7bbe169b49b8d629b3f78fb87a038591bb4d12113487728047b3273f0610", (opts, signal) => {
  return updateInvoiceServerFn.__executeServer(opts, signal);
});
const updateInvoiceServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateInvoiceServerFn_createServerFn_handler, async ({
  data
}) => {
  const {
    id,
    formData
  } = data;
  const {
    items,
    ...invoiceData
  } = formData;
  const [invoice] = await db.update(invoices).set(invoiceData).where(eq(invoices.id, id)).returning();
  if (items && items.length > 0) {
    await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, id));
    const insertedItems = await db.insert(invoiceItems).values(items.map((item) => ({
      invoiceId: id,
      productId: item.productId,
      quantity: item.quantity ?? 1,
      unitPrice: item.unitPrice.toString(),
      taxRate: item.taxRate?.toString() ?? "0"
    }))).returning();
    return {
      success: true,
      invoice,
      items: insertedItems
    };
  }
  return {
    success: true,
    invoice,
    items: []
  };
});
const deleteInvoiceServerFn_createServerFn_handler = createServerRpc("d56cb0c945c4889ec7422fe5a78b1e7b799f29a4f93345404554b61f7a9b907c", (opts, signal) => {
  return deleteInvoiceServerFn.__executeServer(opts, signal);
});
const deleteInvoiceServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(deleteInvoiceServerFn_createServerFn_handler, async ({
  data
}) => {
  await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, data.id));
  await db.delete(invoices).where(eq(invoices.id, data.id));
  return {
    success: true
  };
});

export { createInvoiceServerFn_createServerFn_handler, deleteInvoiceServerFn_createServerFn_handler, loadInvoicesServerFn_createServerFn_handler, updateInvoiceServerFn_createServerFn_handler };
//# sourceMappingURL=invoices-fn-kvw7CQHp.mjs.map
