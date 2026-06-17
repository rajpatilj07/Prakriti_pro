'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Leaf } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Premium Range', href: '/premium-range' },
  { label: 'Blog', href: '/blog' },
  { label: 'Distributor', href: '/become-a-distributor' },
  { label: 'Contact', href: '/contact-us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-green/10'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center transition-all',
              scrolled || !isHome ? 'bg-green' : 'bg-white/20'
            )}>
              <Leaf className={cn('w-4 h-4', scrolled || !isHome ? 'text-sage' : 'text-white')} />
            </div>
            <div>
              <span className={cn(
                'font-playfair text-xl font-bold block leading-none transition-colors',
                scrolled || !isHome ? 'text-green' : 'text-white'
              )}>
                Prakriti
              </span>
              <span className={cn(
                'font-inter text-[10px] tracking-[0.25em] uppercase transition-colors',
                scrolled || !isHome ? 'text-gold' : 'text-sage'
              )}>
                Pure Foods
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3.5 py-2 rounded-lg font-inter text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? scrolled || !isHome
                      ? 'text-green bg-green/8'
                      : 'text-sage'
                    : scrolled || !isHome
                    ? 'text-charcoal/70 hover:text-green hover:bg-green/5'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/become-a-distributor" className="btn-primary text-sm px-5 py-2.5">
              Become a Partner
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              scrolled || !isHome ? 'text-green hover:bg-green/10' : 'text-white hover:bg-white/10'
            )}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-green/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded-xl font-inter text-sm font-medium transition-all',
                    pathname === link.href
                      ? 'bg-green text-white'
                      : 'text-charcoal hover:bg-green/8 hover:text-green'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/become-a-distributor"
                onClick={() => setOpen(false)}
                className="btn-primary w-full justify-center mt-3 text-sm"
              >
                Become a Partner
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
