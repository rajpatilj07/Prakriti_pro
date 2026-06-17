'use server'

import { createClient } from '@/lib/supabase/server'
import { distributorSchema, contactSchema, productSchema, blogSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

// ── Distributor Lead ───────────────────────────────────────────
export async function submitDistributorLead(formData: unknown) {
  const parsed = distributorSchema.safeParse(formData)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('distributor_leads').insert(parsed.data)
  if (error) return { success: false, error: 'Submission failed. Please try again.' }

  return { success: true }
}

// ── Contact Message ────────────────────────────────────────────
export async function submitContactMessage(formData: unknown) {
  const parsed = contactSchema.safeParse(formData)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('contact_messages').insert(parsed.data)
  if (error) return { success: false, error: 'Message failed to send. Please try again.' }

  return { success: true }
}

// ── Product CRUD ───────────────────────────────────────────────
export async function createProduct(formData: unknown) {
  const parsed = productSchema.safeParse(formData)
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message }

  const supabase = await createClient()
  const { error } = await supabase.from('products').insert(parsed.data)
  if (error) return { success: false, error: error.message }

  revalidatePath('/products')
  revalidatePath('/admin/products')
  return { success: true }
}

export async function updateProduct(id: string, formData: unknown) {
  const parsed = productSchema.safeParse(formData)
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message }

  const supabase = await createClient()
  const { error } = await supabase.from('products').update(parsed.data).eq('id', id)
  if (error) return { success: false, error: error.message }

  revalidatePath('/products')
  revalidatePath('/admin/products')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return { success: false, error: error.message }

  revalidatePath('/products')
  revalidatePath('/admin/products')
  return { success: true }
}

// ── Blog CRUD ──────────────────────────────────────────────────
export async function createBlogPost(formData: unknown) {
  const parsed = blogSchema.safeParse(formData)
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message }

  const supabase = await createClient()
  const { error } = await supabase.from('blog_posts').insert(parsed.data)
  if (error) return { success: false, error: error.message }

  revalidatePath('/blog')
  revalidatePath('/admin/blogs')
  return { success: true }
}

export async function updateBlogPost(id: string, formData: unknown) {
  const parsed = blogSchema.safeParse(formData)
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message }

  const supabase = await createClient()
  const { error } = await supabase.from('blog_posts').update(parsed.data).eq('id', id)
  if (error) return { success: false, error: error.message }

  revalidatePath('/blog')
  revalidatePath('/admin/blogs')
  return { success: true }
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) return { success: false, error: error.message }

  revalidatePath('/blog')
  revalidatePath('/admin/blogs')
  return { success: true }
}
