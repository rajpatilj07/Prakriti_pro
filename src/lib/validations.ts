import { z } from 'zod'

export const distributorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  city: z.string().min(2, 'City is required'),
  business_type: z.string().min(1, 'Please select a business type'),
  investment_capacity: z.string().min(1, 'Please select investment capacity'),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  slug: z.string().min(2, 'Slug is required'),
  category: z.enum(['pulses', 'spices', 'premium', 'gift']),
  description: z.string().min(10, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  weight: z.string().min(1, 'Weight is required'),
  image_url: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
  badge: z.string().optional(),
})

export const blogSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  excerpt: z.string().min(10, 'Excerpt is required').max(200),
  content: z.string().min(50, 'Content is required'),
  image_url: z.string().url().optional().or(z.literal('')),
  tag: z.string().optional(),
  read_time: z.string().optional(),
  published: z.boolean().default(false),
})

export type DistributorInput = z.infer<typeof distributorSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type ProductInput = z.infer<typeof productSchema>
export type BlogInput = z.infer<typeof blogSchema>
