import { c as createServerRpc, a as createServerFn } from '../virtual/entry.mjs';
import { d as db, f as fournisseurs } from './invoices-DHv8h55N.mjs';
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

function generateRandomPhone() {
  const prefixes = ["05", "06", "07"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(1e7 + Math.random() * 9e7);
  return prefix + number;
}
const createFournisseurServerFn_createServerFn_handler = createServerRpc("ac3f1acd0bb73b05133b8943d146f8edcb51aa8193090b6c22b4d1d74390c189", (opts, signal) => {
  return createFournisseurServerFn.__executeServer(opts, signal);
});
const createFournisseurServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createFournisseurServerFn_createServerFn_handler, async ({
  data
}) => {
  const fournisseurData = {
    fullName: data.fullName,
    address: data.address,
    willaya: data.willaya,
    phone: generateRandomPhone(),
    activity: data.activity ?? "",
    art: data.art ?? "",
    nis: data.nis ?? "",
    nif: data.nif ?? "",
    rc: data.rc ?? ""
  };
  const [fournisseur] = await db.insert(fournisseurs).values(fournisseurData).returning();
  return {
    success: true,
    fournisseur
  };
});
const loadFournisseursServerFn_createServerFn_handler = createServerRpc("9913a573b000baac238de573271f8cb3554a1fd2fd4083c14881f35340480f8f", (opts, signal) => {
  return loadFournisseursServerFn.__executeServer(opts, signal);
});
const loadFournisseursServerFn = createServerFn({
  method: "GET"
}).handler(loadFournisseursServerFn_createServerFn_handler, async () => {
  const list = await db.select().from(fournisseurs);
  return list;
});
const updateFournisseurServerFn_createServerFn_handler = createServerRpc("5012dd3a73b4d9e7c3e4525215f37d44bd38cf98bf88bf52d9b8ee2408cc6741", (opts, signal) => {
  return updateFournisseurServerFn.__executeServer(opts, signal);
});
const updateFournisseurServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateFournisseurServerFn_createServerFn_handler, async ({
  data
}) => {
  const [fournisseur] = await db.update(fournisseurs).set(data.formData).where(eq(fournisseurs.id, data.id)).returning();
  return {
    success: true,
    fournisseur
  };
});
const deleteFournisseurServerFn_createServerFn_handler = createServerRpc("1ac217453690f3c0c0b98c5210009b34614311fc72506f8d645194f41098ceee", (opts, signal) => {
  return deleteFournisseurServerFn.__executeServer(opts, signal);
});
const deleteFournisseurServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(deleteFournisseurServerFn_createServerFn_handler, async ({
  data
}) => {
  await db.delete(fournisseurs).where(eq(fournisseurs.id, data.id));
  return {
    success: true
  };
});

export { createFournisseurServerFn_createServerFn_handler, deleteFournisseurServerFn_createServerFn_handler, loadFournisseursServerFn_createServerFn_handler, updateFournisseurServerFn_createServerFn_handler };
//# sourceMappingURL=fourniseur-fn-BlFhIH7g.mjs.map
