import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Leaf, Package, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PageTransition } from '@/components/ui/Motion'
import { formatPrice } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('products').select('name, description').eq('slug', slug).single()

  if (!data) return { title: 'Product Not Found' }

  return {
    title: data.name,
    description: data.description,
    openGraph: { title: data.name, description: data.description },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: product } = await supabase.from('products').select('*').eq('slug', slug).single()

  if (!product) notFound()

  return (
    <PageTransition>
      <div className="pt-24 pb-20 bg-cream min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-inter text-charcoal/60 hover:text-green transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative aspect-square bg-cream-dark rounded-3xl overflow-hidden">
              {product.image_url ? (
                <Image src={product.image_url} alt={product.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">🌿</div>
              )}
              {product.badge && (
                <span className="absolute top-4 left-4 bg-gold text-green text-sm font-semibold font-inter px-4 py-1.5 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <span className="font-inter text-xs font-medium text-green/60 uppercase tracking-wider mb-2 capitalize">
                {product.category}
              </span>
              <h1 className="font-playfair text-4xl font-bold text-green mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-playfair text-3xl font-bold text-green">{formatPrice(product.price)}</span>
                <span className="font-inter text-sm text-charcoal/50">per {product.weight}</span>
              </div>

              <p className="font-inter text-base text-charcoal/70 leading-relaxed mb-8">{product.description}</p>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: Leaf, label: '100% Natural' },
                  { icon: Package, label: 'Hygienically Packed' },
                  { icon: Shield, label: 'Quality Assured' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center p-3 rounded-2xl bg-white border border-green/10">
                    <Icon className="w-5 h-5 text-green mx-auto mb-1.5" />
                    <span className="font-inter text-xs text-charcoal/60">{label}</span>
                  </div>
                ))}
              </div>

              {/* Order CTA — placeholder for Razorpay */}
              <div className="p-5 rounded-2xl bg-green/5 border border-green/15">
                <p className="font-inter text-sm text-charcoal/70 mb-3">
                  Online ordering coming soon. To order, please contact us directly.
                </p>
                <Link href="/contact-us" className="btn-primary w-full justify-center">
                  Enquire to Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
