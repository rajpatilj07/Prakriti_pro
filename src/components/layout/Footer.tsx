import Link from 'next/link'
import { Leaf, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Products', href: '/products' },
  { label: 'Premium Range', href: '/premium-range' },
  { label: 'Blog & Recipes', href: '/blog' },
  { label: 'Become a Distributor', href: '/become-a-distributor' },
  { label: 'Contact Us', href: '/contact-us' },
]

export default function Footer() {
  return (
    <footer className="bg-green text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-sage" />
              </div>
              <div>
                <span className="font-playfair text-2xl font-bold text-white block leading-none">Prakriti</span>
                <span className="font-inter text-[10px] tracking-[0.25em] uppercase text-sage">Pure Foods</span>
              </div>
            </div>
            <p className="font-inter text-sm text-white/65 leading-relaxed mb-6">
              Bringing nature's finest flavours to your table. Pure, natural, and sourced with integrity.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-5 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-white/65 hover:text-gold transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sage/60 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-5 text-white">Our Products</h3>
            <ul className="space-y-3">
              {['Pulses & Dals', 'Whole Spices', 'Ground Spices', 'Flour & Grains', 'Premium Range', 'Gift Hampers'].map((cat) => (
                <li key={cat}>
                  <Link
                    href="/products"
                    className="font-inter text-sm text-white/65 hover:text-gold transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sage/60 flex-shrink-0" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-5 text-white">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="font-inter text-sm text-white/65">
                  Address will be updated soon
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+910000000000" className="font-inter text-sm text-white/65 hover:text-gold transition-colors">
                  +91 00000 00000
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:hello@prakritifoods.in" className="font-inter text-sm text-white/65 hover:text-gold transition-colors">
                  hello@prakritifoods.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-white/45">
            © {new Date().getFullYear()} Prakriti Foods. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="font-inter text-xs text-white/45 hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-white/25">·</span>
            <Link href="/terms" className="font-inter text-xs text-white/45 hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
