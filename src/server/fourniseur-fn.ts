import { db } from "@/db";
import { fournisseurs, NewClient, NewFournisseur } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

type FournisseurCreateModel = Omit<NewClient, "id" | "createdAt" | "updatedAt">;
// Create fournisseur
export const createFournisseurServerFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: FournisseurCreateModel) => data)
  .handler(async ({ data }) => {
    // Map React state fields to DB columns
    const fournisseurData: NewFournisseur = {
      fullName: data.fullName,
      address: data.address,
      willaya: data.willaya,
      phone: data.phone,
      activity: data.activity ?? "",
      art: data.art ?? "",
      nis: data.nis ?? "",
      nif: data.nif ?? "",
      rc: data.rc ?? "",
      // Do NOT include createdAt or updatedAt — defaultNow() handles them
    };

    const [fournisseur] = await db
      .insert(fournisseurs)
      .values(fournisseurData)
      .returning();


    return { success: true, fournisseur };
  });


// Load all fournisseurs
export const loadFournisseursServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const list = await db.select().from(fournisseurs);
  return list;
});

// Update fournisseur
export const updateFournisseurServerFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: { id: string; formData: any }) => data)
  .handler(async ({ data }) => {
    const [fournisseur] = await db
      .update(fournisseurs)
      .set(data.formData)
      .where(eq(fournisseurs.id, data.id))
      .returning();
    return { success: true, fournisseur };
  });

// Delete fournisseur
export const deleteFournisseurServerFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(fournisseurs).where(eq(fournisseurs.id, data.id));
    return { success: true };
  });
