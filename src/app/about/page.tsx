import type { Metadata } from 'next'
import { Leaf, Heart, Target, Eye } from 'lucide-react'
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Motion'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Prakriti Foods — our story, mission, and commitment to pure, natural food.',
}

const values = [
  {
    icon: Leaf,
    title: 'Purity First',
    desc: 'No preservatives. No artificial additives. No shortcuts. What we sell is exactly what nature grew.',
  },
  {
    icon: Heart,
    title: 'Farmer Respect',
    desc: 'We build long-term relationships with farmers, ensuring fair prices and sustainable practices.',
  },
  {
    icon: Target,
    title: 'Consistent Quality',
    desc: 'Every product is tested to meet our internal quality benchmarks before it earns the Prakriti label.',
  },
  {
    icon: Eye,
    title: 'Full Transparency',
    desc: 'We believe you have the right to know what is in your food and where it comes from.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="Our Story"
        title="Born from a Belief in Pure Food"
        subtitle="Prakriti Foods was founded on one simple conviction: that every Indian family deserves access to food that is genuinely pure, natural, and honestly sourced."
      />

      {/* Story section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-hero flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4">
                      <Leaf className="w-12 h-12 text-sage" />
                    </div>
                    <p className="font-playfair text-3xl font-bold text-white">Prakriti</p>
                    <p className="font-inter text-sm tracking-widest text-gold uppercase mt-1">Pure Foods</p>
                  </div>
                </div>
                {/* Decorative */}
                <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl bg-gold/15 -z-10" />
                <div className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl bg-sage/15 -z-10" />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <span className="section-tag">Who We Are</span>
              <h2 className="section-title mb-5">A Brand Built on Integrity</h2>
              <div className="space-y-4 font-inter text-charcoal/70 leading-relaxed text-base">
                <p>
                  Prakriti Foods brings together a team passionate about clean eating and honest sourcing. We started with a simple question: why is it so hard to find food that is truly pure?
                </p>
                <p>
                  That question led us to build a supply chain that connects farms directly to families — cutting out unnecessary middlemen and ensuring freshness, quality, and transparency at every step.
                </p>
                <p>
                  Today, we are building more than a food brand. We are building trust — one product, one family, one community at a time.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                label: 'Our Mission',
                text: 'To make pure, natural food accessible to every Indian household — by creating a transparent, farmer-friendly supply chain that delivers quality without compromise.',
              },
              {
                icon: Eye,
                label: 'Our Vision',
                text: "To be India's most trusted natural food brand — a household name synonymous with purity, integrity, and a deep respect for nature and farmers.",
              },
            ].map(({ icon: Icon, label, text }) => (
              <Reveal key={label}>
                <div className="p-8 rounded-3xl bg-white border border-green/10 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-green/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-green" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-green mb-3">{label}</h3>
                  <p className="font-inter text-charcoal/70 leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <span className="section-tag">What We Stand For</span>
            <h2 className="section-title">Our Core Values</h2>
          </Reveal>
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="p-6 rounded-3xl border border-green/8 hover:border-green/20 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-sage/20 flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-green" />
                  </div>
                  <h3 className="font-playfair text-lg font-semibold text-green mb-2">{v.title}</h3>
                  <p className="font-inter text-sm text-charcoal/65 leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  )
}
