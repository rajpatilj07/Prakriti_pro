import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, Package } from 'lucide-react'
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Motion'

const perks = [
  { icon: TrendingUp, label: 'Growing Brand', desc: 'Join a brand that is scaling rapidly across India.' },
  { icon: Package, label: 'Full Support', desc: 'Marketing materials, training, and on-ground support provided.' },
  { icon: Users, label: 'Exclusive Territory', desc: 'Get first-mover advantage in your city or region.' },
]

export default function DistributorCTA() {
  return (
    <section className="py-20 md:py-28 bg-dist-gradient overflow-hidden relative">
      <div className="absolute inset-0 leaf-pattern opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <span className="inline-block font-inter text-xs font-semibold tracking-[0.2em] uppercase text-sage mb-3">
            Partner With Us
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Become a Prakriti Distributor
          </h2>
          <p className="font-inter text-white/70 text-lg max-w-2xl mx-auto">
            Be part of India's clean food revolution. Partner with us to bring pure, natural products to your community.
          </p>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {perks.map(({ icon: Icon, label, desc }) => (
            <StaggerItem key={label}>
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-playfair text-lg font-semibold text-white mb-2">{label}</h3>
                <p className="font-inter text-sm text-white/65">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <Reveal className="text-center">
          <Link href="/become-a-distributor" className="btn-primary text-base px-9 py-4">
            Apply Now <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
