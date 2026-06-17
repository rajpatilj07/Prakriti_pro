import Link from 'next/link'
import { ArrowRight, Crown } from 'lucide-react'
import { Reveal } from '@/components/ui/Motion'

export default function PremiumBanner() {
  return (
    <section className="py-16 bg-premium-gradient overflow-hidden relative">
      <div className="absolute inset-0 leaf-pattern opacity-20" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/8 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Reveal className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-gold" />
              </div>
              <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                Premium Collection
              </span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3">
              Elevate Your Culinary Experience
            </h2>
            <p className="font-inter text-white/70 text-base leading-relaxed max-w-lg">
              Our premium range is crafted for those who seek the extraordinary — rare varietals, artisanal processes, and an uncompromising commitment to purity.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="flex-shrink-0">
            <Link href="/premium-range" className="btn-primary text-base px-8 py-4">
              Explore Premium Range <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
