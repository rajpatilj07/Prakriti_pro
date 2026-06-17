import type { Metadata } from 'next'
import { TrendingUp, Package, Users, BadgeCheck } from 'lucide-react'
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Motion'
import DistributorForm from '@/components/sections/DistributorForm'

export const metadata: Metadata = {
  title: 'Become a Distributor',
  description: 'Partner with Prakriti Foods and bring pure, natural products to your community.',
}

const benefits = [
  { icon: TrendingUp, title: 'Strong Margins', desc: 'Competitive trade margins with transparent pricing policies.' },
  { icon: Package, title: 'Marketing Support', desc: 'Display materials, digital assets, and on-ground support provided.' },
  { icon: Users, title: 'Exclusive Territory', desc: 'Dedicated zones to protect your business investment.' },
  { icon: BadgeCheck, title: 'Brand Backing', desc: 'Sell a brand built on quality — easy to recommend, easy to sell.' },
]

const steps = [
  { num: '01', label: 'Fill the Form', desc: 'Submit your basic details and business interest.' },
  { num: '02', label: 'We Connect', desc: 'Our team reaches out within 48 business hours.' },
  { num: '03', label: 'Discussion', desc: 'Understand the terms, territory, and margins together.' },
  { num: '04', label: 'Get Started', desc: 'Finalise the agreement and receive your first stock.' },
]

export default function DistributorPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-dist-gradient relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-block font-inter text-xs font-semibold tracking-[0.2em] uppercase text-sage mb-4">Partner With Us</span>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">Become a Prakriti Distributor</h1>
            <p className="font-inter text-lg text-white/70 max-w-2xl mx-auto">
              Join our growing network and be part of India's clean food movement. Build a profitable business with a brand your customers will trust.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <span className="section-tag">Why Partner With Us</span>
            <h2 className="section-title">What You Get</h2>
          </Reveal>
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="p-6 rounded-3xl border border-green/10 hover:border-green/25 hover:shadow-md transition-all text-center">
                  <div className="w-12 h-12 rounded-2xl bg-green/10 flex items-center justify-center mx-auto mb-4">
                    <b.icon className="w-5 h-5 text-green" />
                  </div>
                  <h3 className="font-playfair text-lg font-semibold text-green mb-2">{b.title}</h3>
                  <p className="font-inter text-sm text-charcoal/60">{b.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <span className="section-tag">Simple Process</span>
            <h2 className="section-title">How It Works</h2>
          </Reveal>
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <StaggerItem key={s.num}>
                <div className="text-center p-6">
                  <div className="font-playfair text-4xl font-bold text-green/15 mb-3">{s.num}</div>
                  <h3 className="font-playfair text-lg font-semibold text-green mb-2">{s.label}</h3>
                  <p className="font-inter text-sm text-charcoal/60">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <span className="section-tag">Apply Now</span>
            <h2 className="section-title">Start Your Application</h2>
            <p className="section-subtitle mx-auto mt-3">Fill in the form below and our partnerships team will get back to you shortly.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-white rounded-3xl border border-green/10 shadow-sm p-8 md:p-10">
              <DistributorForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
