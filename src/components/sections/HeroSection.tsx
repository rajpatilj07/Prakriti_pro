'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Star, Shield, Truck } from 'lucide-react'

const badges = [
  { icon: Star, label: 'Premium Quality' },
  { icon: Leaf, label: '100% Natural' },
  { icon: Shield, label: 'Quality Assured' },
  { icon: Truck, label: 'Pan-India Delivery' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-hero flex items-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sage/10 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-gold/8 blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-sage/5 blur-2xl" />
        {/* Leaf pattern overlay */}
        <div className="absolute inset-0 leaf-pattern opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 mb-6"
            >
              <Leaf className="w-3.5 h-3.5 text-sage" />
              <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-sage">
                Pure. Natural. Trusted.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              From Nature's{' '}
              <span className="text-gradient-gold">Heart</span>{' '}
              to Your Table
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-inter text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-xl"
            >
              We bring you the finest pulses, spices, and natural food products — sourced with care, crafted with integrity, delivered with pride.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link href="/products" className="btn-primary">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="btn-outline-white">
                Our Story
              </Link>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              {badges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-sage/20 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-sage" />
                  </div>
                  <span className="font-inter text-xs text-white/65">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="w-full aspect-square max-w-md mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="w-4/5 aspect-square rounded-full bg-white/8 border border-white/10 flex items-center justify-center">
                  <div className="w-3/4 aspect-square rounded-full bg-white/10 border border-sage/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
                        <Leaf className="w-10 h-10 text-sage" />
                      </div>
                      <p className="font-playfair text-2xl font-bold text-white mb-1">Prakriti</p>
                      <p className="font-inter text-xs tracking-widest text-gold uppercase">Pure Foods</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats */}
              {[
                { label: 'Products', value: 'Coming Soon', top: '15%', left: '-8%' },
                { label: 'Cities', value: 'Pan India', top: '15%', right: '-8%' },
                { label: 'Quality', value: 'Assured', bottom: '20%', left: '-6%' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
                  className="absolute glass-card rounded-2xl px-4 py-3 text-center"
                  style={{ top: stat.top, bottom: stat.bottom, left: stat.left, right: stat.right }}
                >
                  <p className="font-playfair text-lg font-bold text-white">{stat.value}</p>
                  <p className="font-inter text-xs text-white/60">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </div>
        <span className="font-inter text-[10px] text-white/40 tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
