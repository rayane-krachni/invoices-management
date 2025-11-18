import { db } from "@/db";
import { clients } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm"; 
import { NewClient } from "@/db/schema";
import { generateRandomPhone } from "./fourniseur-fn";

type ClientCreateModel = Omit<NewClient, "id" | "createdAt" | "updatedAt">;
export const createClientServerFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: ClientCreateModel) => data)
  .handler(async ({ data }) => {
    // Map React state fields to DB columns
    const clientData: NewClient = {
      fullName: data.fullName,
      address: data.address,
      willaya: data.willaya,
      phone: generateRandomPhone(),
      activity: data.activity ?? "",
      art: data.art ?? "",
      nis: data.nis ?? "",
      nif: data.nif ?? "",
      rc: data.rc ?? "",
    };

    const [client] = await db
      .insert(clients)
      .values(clientData)
      .returning();


    return { success: true, client };
  });


export const loadClientsServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const clientsList = await db.select().from(clients);
  return clientsList;
});

export const updateClientServerFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: { id: string; formData: any }) => data)
  .handler(async ({ data }) => {
    const [client] = await db
      .update(clients)
      .set(data.formData)
      .where(eq(clients.id, data.id)) // ✅ Corrected here
      .returning();
    return { success: true, client };
  });

export const deleteClientServerFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(clients).where(eq(clients.id, data.id)); // ✅ Corrected here
    return { success: true };
  });
