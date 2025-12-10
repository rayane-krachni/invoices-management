import { c as createServerRpc, a as createServerFn } from '../virtual/entry.mjs';
import { d as db, c as clients } from './invoices-DHv8h55N.mjs';
import { eq } from 'drizzle-orm';
import { g as generateRandomPhone } from './fourniseur-fn-X4MWgdCf.mjs';
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
import './createSsrRpc-B7i2AQJQ.mjs';

const createClientServerFn_createServerFn_handler = createServerRpc("03960d6fd89b35fe9547af9de06a203cd25e2b4ca3e6a687ee664efca51f147c", (opts, signal) => {
  return createClientServerFn.__executeServer(opts, signal);
});
const createClientServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createClientServerFn_createServerFn_handler, async ({
  data
}) => {
  const clientData = {
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
  const [client] = await db.insert(clients).values(clientData).returning();
  return {
    success: true,
    client
  };
});
const loadClientsServerFn_createServerFn_handler = createServerRpc("3350d09b92c1792aeccfa21992cd3061ac1250e4d15f30fbab96fbc07394db42", (opts, signal) => {
  return loadClientsServerFn.__executeServer(opts, signal);
});
const loadClientsServerFn = createServerFn({
  method: "GET"
}).handler(loadClientsServerFn_createServerFn_handler, async () => {
  const clientsList = await db.select().from(clients);
  return clientsList;
});
const updateClientServerFn_createServerFn_handler = createServerRpc("50e4b59fe268685ff6bd59fa4f0d6f6733bbd8f9ff291ac95d940ac816161a00", (opts, signal) => {
  return updateClientServerFn.__executeServer(opts, signal);
});
const updateClientServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateClientServerFn_createServerFn_handler, async ({
  data
}) => {
  const [client] = await db.update(clients).set(data.formData).where(eq(clients.id, data.id)).returning();
  return {
    success: true,
    client
  };
});
const deleteClientServerFn_createServerFn_handler = createServerRpc("ab3996f6727fdd28ce1c2ddafefde0ed34b6ed2cbc7ee630d619ffc303805ea2", (opts, signal) => {
  return deleteClientServerFn.__executeServer(opts, signal);
});
const deleteClientServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(deleteClientServerFn_createServerFn_handler, async ({
  data
}) => {
  await db.delete(clients).where(eq(clients.id, data.id));
  return {
    success: true
  };
});

export { createClientServerFn_createServerFn_handler, deleteClientServerFn_createServerFn_handler, loadClientsServerFn_createServerFn_handler, updateClientServerFn_createServerFn_handler };
//# sourceMappingURL=client-fn-F4WIbYoT.mjs.map
