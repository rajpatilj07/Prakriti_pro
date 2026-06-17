import { Leaf, FlaskConical, Truck, Heart } from 'lucide-react'
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Motion'

const pillars = [
  {
    icon: Leaf,
    title: 'Naturally Sourced',
    desc: 'We work directly with farmers who share our commitment to growing food the natural way — no shortcuts, no compromises.',
    color: 'bg-sage/15 text-green',
  },
  {
    icon: FlaskConical,
    title: 'Quality Tested',
    desc: 'Every batch goes through rigorous quality checks before it leaves our facility, ensuring what reaches you is pure and premium.',
    color: 'bg-gold/15 text-gold',
  },
  {
    icon: Truck,
    title: 'Delivered Fresh',
    desc: 'From our carefully controlled storage to your doorstep — we maintain freshness every step of the way.',
    color: 'bg-green/10 text-green',
  },
  {
    icon: Heart,
    title: 'Made with Care',
    desc: 'Every product embodies our core promise: food that is good for your family, good for farmers, and good for the planet.',
    color: 'bg-sage/15 text-green',
  },
]

export default function WhyUsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <span className="section-tag">Why Choose Us</span>
          <h2 className="section-title mb-4">Our Promise to You</h2>
          <p className="section-subtitle mx-auto">
            We believe great food begins with honesty — honest sourcing, honest labelling, honest prices.
          </p>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <StaggerItem key={p.title}>
              <div className="group p-7 rounded-3xl border border-green/8 hover:border-green/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-cream/50">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${p.color}`}>
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-green mb-3">{p.title}</h3>
                <p className="font-inter text-sm text-charcoal/65 leading-relaxed">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
