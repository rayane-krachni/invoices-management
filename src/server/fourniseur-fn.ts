import { db } from '@/db'
import { fournisseurs, NewClient, NewFournisseur } from '@/db/schema'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

type FournisseurCreateModel = Omit<
  NewFournisseur,
  'id' | 'createdAt' | 'updatedAt'
>
export function generateRandomPhone() {
  // Generates a 10-digit random phone number starting with 05 or 06 or 07
  const prefixes = ['05', '06', '07']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const number = Math.floor(10000000 + Math.random() * 90000000) // 8 digits
  return prefix + number // Example: 0654821395
}

export const createFournisseurServerFn = createServerFn({
  method: 'POST',
})
  .inputValidator((data: FournisseurCreateModel) => data)
  .handler(async ({ data }) => {
    // Map React state fields to DB columns
    const fournisseurData: NewFournisseur = {
      fullName: data.fullName,
      address: data.address,
      willaya: data.willaya,
      phone: data.phone ?? '',
      email: data.email ?? '',
      activity: data.activity ?? '',
      art: data.art ?? '',
      nis: data.nis ?? '',
      nif: data.nif ?? '',
      rc: data.rc ?? '',
    }

    const [fournisseur] = await db
      .insert(fournisseurs)
      .values(fournisseurData)
      .returning()

    return { success: true, fournisseur }
  })
// Load all fournisseurs
export const loadFournisseursServerFn = createServerFn({
  method: 'GET',
}).handler(async () => {
  const list = await db.select().from(fournisseurs)
  return list
})

// Update fournisseur
export const updateFournisseurServerFn = createServerFn({
  method: 'POST',
})
  .inputValidator((data: { id: string; formData: any }) => data)
  .handler(async ({ data }) => {
    const [fournisseur] = await db
      .update(fournisseurs)
      .set(data.formData)
      .where(eq(fournisseurs.id, data.id))
      .returning()
    return { success: true, fournisseur }
  })

// Delete fournisseur
export const deleteFournisseurServerFn = createServerFn({
  method: 'POST',
})
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(fournisseurs).where(eq(fournisseurs.id, data.id))
    return { success: true }
  })
