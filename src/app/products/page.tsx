import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Motion'
import { formatPrice } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Our Products',
  description: 'Explore our full range of pure, natural pulses, spices, and food products.',
}

const CATEGORIES = ['All', 'pulses', 'spices', 'premium', 'gift']

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const supabase = await createClient()

  let query = supabase.from('products').select('*').order('created_at', { ascending: false })
  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  const { data: products } = await query

  return (
    <>
      <PageHero
        tag="Our Products"
        title="Pure Food, Every Day"
        subtitle="From wholesome pulses to aromatic spices — discover food the way nature intended it."
      />

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <Reveal className="flex flex-wrap gap-3 mb-10 justify-center">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={cat === 'All' ? '/products' : `/products?category=${cat}`}
                className={`px-5 py-2 rounded-full font-inter text-sm font-medium border transition-all duration-200 capitalize ${
                  (cat === 'All' && !category) || category === cat
                    ? 'bg-green text-white border-green'
                    : 'bg-white text-charcoal border-gray-200 hover:border-green hover:text-green'
                }`}
              >
                {cat}
              </Link>
            ))}
          </Reveal>

          {products && products.length > 0 ? (
            <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <Link href={`/products/${product.slug}`} className="product-card group block h-full">
                    <div className="relative aspect-square bg-cream-dark overflow-hidden">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">🌿</div>
                      )}
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-gold text-green text-xs font-semibold font-inter px-3 py-1 rounded-full">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="font-inter text-xs font-medium text-green/60 uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-playfair text-lg font-semibold text-green mt-1 mb-1">{product.name}</h3>
                      <p className="font-inter text-xs text-charcoal/60 line-clamp-2 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-playfair text-base font-bold text-green">{formatPrice(product.price)}</span>
                          <span className="font-inter text-xs text-charcoal/45 ml-1">/{product.weight}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-green group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerReveal>
          ) : (
            <Reveal className="text-center py-20">
              <p className="font-inter text-lg text-charcoal/50">Products coming soon. Check back shortly!</p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
