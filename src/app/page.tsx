import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import WhyUsSection from '@/components/sections/WhyUsSection'
import PremiumBanner from '@/components/sections/PremiumBanner'
import BlogPreview from '@/components/sections/BlogPreview'
import DistributorCTA from '@/components/sections/DistributorCTA'

export const metadata: Metadata = {
  title: 'Prakriti Foods — Pure. Natural. Trusted.',
  description: 'Farm-fresh pulses, spices, and natural food products. Sourced directly, delivered purely.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <FeaturedProducts />
      <PremiumBanner />
      <BlogPreview />
      <DistributorCTA />
    </>
  )
}
