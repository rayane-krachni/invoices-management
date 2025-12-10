import { c as createSsrRpc } from './createSsrRpc-B7i2AQJQ.mjs';
import { d as db, f as fournisseurs } from './invoices-BVDPhziD.mjs';
import { eq } from 'drizzle-orm';
import { a as createServerFn } from '../virtual/entry.mjs';

function generateRandomPhone() {
  const prefixes = ["05", "06", "07"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(1e7 + Math.random() * 9e7);
  return prefix + number;
}
const createFournisseurServerFn_createServerFn_handler = createSsrRpc("ac3f1acd0bb73b05133b8943d146f8edcb51aa8193090b6c22b4d1d74390c189");
const createFournisseurServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createFournisseurServerFn_createServerFn_handler, async ({
  data
}) => {
  const fournisseurData = {
    fullName: data.fullName,
    address: data.address,
    willaya: data.willaya,
    phone: data.phone ?? "",
    email: data.email ?? "",
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
const loadFournisseursServerFn_createServerFn_handler = createSsrRpc("9913a573b000baac238de573271f8cb3554a1fd2fd4083c14881f35340480f8f");
const loadFournisseursServerFn = createServerFn({
  method: "GET"
}).handler(loadFournisseursServerFn_createServerFn_handler, async () => {
  const list = await db.select().from(fournisseurs);
  return list;
});
const updateFournisseurServerFn_createServerFn_handler = createSsrRpc("5012dd3a73b4d9e7c3e4525215f37d44bd38cf98bf88bf52d9b8ee2408cc6741");
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
const deleteFournisseurServerFn_createServerFn_handler = createSsrRpc("1ac217453690f3c0c0b98c5210009b34614311fc72506f8d645194f41098ceee");
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

export { createFournisseurServerFn as c, deleteFournisseurServerFn as d, generateRandomPhone as g, loadFournisseursServerFn as l, updateFournisseurServerFn as u };
//# sourceMappingURL=fourniseur-fn-CyOwbw2O.mjs.map
