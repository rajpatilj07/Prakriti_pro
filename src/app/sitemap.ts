import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prakritifoods.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const [{ data: products }, { data: posts }] = await Promise.all([
    supabase.from('products').select('slug, created_at'),
    supabase.from('blog_posts').select('slug, created_at').eq('published', true),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/premium-range`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/become-a-distributor`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact-us`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]

  const productPages: MetadataRoute.Sitemap = (products ?? []).map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...productPages, ...blogPages]
}
