import { c as createServerRpc, a as createServerFn } from '../virtual/entry.mjs';
import { d as db, p as products } from './invoices-DHv8h55N.mjs';
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

const createProductServerFn_createServerFn_handler = createServerRpc("4fa3baa45d7869be16c69f8d40246854d09d44738e699baa3286f584afc1ed5c", (opts, signal) => {
  return createProductServerFn.__executeServer(opts, signal);
});
const createProductServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createProductServerFn_createServerFn_handler, async ({
  data
}) => {
  const [product] = await db.insert(products).values(data).returning();
  return {
    success: true,
    product
  };
});
const loadProductsServerFn_createServerFn_handler = createServerRpc("903184262bb2f823944dd56806106f91be7d7f32591bdcd1c5a6fb35ec2b0905", (opts, signal) => {
  return loadProductsServerFn.__executeServer(opts, signal);
});
const loadProductsServerFn = createServerFn({
  method: "GET"
}).handler(loadProductsServerFn_createServerFn_handler, async () => {
  const list = await db.select().from(products);
  return list;
});
const updateProductServerFn_createServerFn_handler = createServerRpc("a3cfa06170e89eb25c05a6127a10c81fa8e4a04311b2df77c5b3c3929afe462c", (opts, signal) => {
  return updateProductServerFn.__executeServer(opts, signal);
});
const updateProductServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateProductServerFn_createServerFn_handler, async ({
  data
}) => {
  const [product] = await db.update(products).set(data.formData).where(eq(products.id, data.id)).returning();
  return {
    success: true,
    product
  };
});
const deleteProductServerFn_createServerFn_handler = createServerRpc("c1b5b7df71fce89fb3da837cb3c58e3542831ac803ff32a9cacdbcc3e60afa63", (opts, signal) => {
  return deleteProductServerFn.__executeServer(opts, signal);
});
const deleteProductServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(deleteProductServerFn_createServerFn_handler, async ({
  data
}) => {
  await db.delete(products).where(eq(products.id, data.id));
  return {
    success: true
  };
});

export { createProductServerFn_createServerFn_handler, deleteProductServerFn_createServerFn_handler, loadProductsServerFn_createServerFn_handler, updateProductServerFn_createServerFn_handler };
//# sourceMappingURL=product-fn-D_wDd2pU.mjs.map
