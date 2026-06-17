import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Reveal } from '@/components/ui/Motion'
import ContactForm from '@/components/sections/ContactForm'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Prakriti Foods team — we are here to help.',
}

const contactInfo = [
  { icon: Phone, label: 'Call Us', value: '+91 00000 00000', sub: 'Mon–Sat, 10am–6pm', href: 'tel:+910000000000' },
  { icon: Mail, label: 'Email Us', value: 'hello@prakritifoods.in', sub: 'We reply within 24 hours', href: 'mailto:hello@prakritifoods.in' },
  { icon: MapPin, label: 'Office', value: 'Address will be updated', sub: 'India', href: '#' },
  { icon: Clock, label: 'Business Hours', value: 'Mon – Sat', sub: '10:00 AM – 6:00 PM', href: undefined },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="Get In Touch"
        title="We'd Love to Hear From You"
        subtitle="Whether it's a product query, a partnership idea, or just a hello — we are here."
      />

      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-5">
              {contactInfo.map(({ icon: Icon, label, value, sub, href }) => (
                <Reveal key={label}>
                  <div className="flex gap-4 p-5 bg-white rounded-2xl border border-green/10 hover:border-green/20 transition-all">
                    <div className="w-11 h-11 rounded-xl bg-green/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-green" />
                    </div>
                    <div>
                      <p className="font-inter text-xs font-semibold text-green/70 uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="font-inter text-sm font-medium text-charcoal hover:text-green transition-colors">{value}</a>
                      ) : (
                        <p className="font-inter text-sm font-medium text-charcoal">{value}</p>
                      )}
                      <p className="font-inter text-xs text-charcoal/50 mt-0.5">{sub}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Right: Form */}
            <Reveal className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-green/10 shadow-sm p-8 md:p-10">
                <h2 className="font-playfair text-2xl font-bold text-green mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
