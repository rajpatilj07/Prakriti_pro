import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Crown, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Motion'
import { formatPrice } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Premium Range',
  description: 'Our exclusive premium collection — rare varietals, artisanal processes, uncompromising purity.',
}

export default async function PremiumRangePage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'premium')
    .order('created_at', { ascending: false })

  return (
    <>
      <section className="pt-32 pb-16 bg-premium-gradient relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-5">
              <Crown className="w-4 h-4 text-gold" />
              <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-gold">Exclusive Collection</span>
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              The Premium Range
            </h1>
            <p className="font-inter text-lg text-white/70 max-w-xl mx-auto">
              Crafted for those who seek the extraordinary — rare sourcing, artisanal care, and purity beyond compare.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products && products.length > 0 ? (
            <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <Link href={`/products/${product.slug}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gold/10">
                    <div className="relative aspect-square bg-premium-gradient overflow-hidden">
                      {product.image_url ? (
                        <Image src={product.image_url} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Crown className="w-16 h-16 text-gold/40" />
                        </div>
                      )}
                      {product.badge && (
                        <span className="absolute top-4 left-4 bg-gold text-green text-xs font-semibold font-inter px-3 py-1 rounded-full">{product.badge}</span>
                      )}
                    </div>
                    <div className="p-6 border-t border-gold/15">
                      <h3 className="font-playfair text-xl font-bold text-green mb-2">{product.name}</h3>
                      <p className="font-inter text-sm text-charcoal/60 line-clamp-2 mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-playfair text-xl font-bold text-green">{formatPrice(product.price)}</span>
                        <span className="flex items-center gap-1 text-sm font-inter text-gold group-hover:gap-2 transition-all">
                          Explore <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerReveal>
          ) : (
            <Reveal className="text-center py-24">
              <Crown className="w-12 h-12 text-gold/40 mx-auto mb-4" />
              <h2 className="font-playfair text-2xl font-semibold text-green mb-3">Coming Soon</h2>
              <p className="font-inter text-charcoal/60 mb-6">Our premium collection is being curated with great care. Stay tuned.</p>
              <Link href="/products" className="btn-outline-green">Browse All Products</Link>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
