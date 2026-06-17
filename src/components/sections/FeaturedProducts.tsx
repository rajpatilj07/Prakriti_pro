import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Motion'
import { formatPrice } from '@/lib/utils'

export default async function FeaturedProducts() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(6)

  if (!products?.length) {
    return null
  }

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <span className="section-tag">Our Products</span>
          <h2 className="section-title mb-4">Nature's Finest Selection</h2>
          <p className="section-subtitle mx-auto">
            Every product tells a story of care — from source to shelf.
          </p>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <Link href={`/products/${product.slug}`} className="product-card group block">
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
                    <span className="absolute top-4 left-4 bg-gold text-green text-xs font-semibold font-inter px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <span className="font-inter text-xs font-medium text-green/60 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-playfair text-xl font-semibold text-green mt-1 mb-2">{product.name}</h3>
                  <p className="font-inter text-sm text-charcoal/65 line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-playfair text-lg font-bold text-green">{formatPrice(product.price)}</span>
                      <span className="font-inter text-xs text-charcoal/50 ml-1">/ {product.weight}</span>
                    </div>
                    <span className="text-xs font-inter text-green group-hover:gap-2 flex items-center gap-1 transition-all">
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <Reveal className="text-center">
          <Link href="/products" className="btn-outline-green">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
