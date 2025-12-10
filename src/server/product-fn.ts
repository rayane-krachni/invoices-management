import { db } from '@/db'
import { products } from '@/db/schema'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

// Create product
export const createProductServerFn = createServerFn({
  method: 'POST',
})
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    const [product] = await db.insert(products).values(data).returning()
    return { success: true, product }
  })

// Load all products
export const loadProductsServerFn = createServerFn({
  method: 'GET',
}).handler(async () => {
  const list = await db.select().from(products)
  return list
})

// Update product
export const updateProductServerFn = createServerFn({
  method: 'POST',
})
  .inputValidator((data: { id: string; formData: any }) => data)
  .handler(async ({ data }) => {
    const [product] = await db
      .update(products)
      .set(data.formData)
      .where(eq(products.id, data.id))
      .returning()
    return { success: true, product }
  })

// Delete product
export const deleteProductServerFn = createServerFn({
  method: 'POST',
})
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(products).where(eq(products.id, data.id))
    return { success: true }
  })
