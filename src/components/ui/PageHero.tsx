import { Reveal } from '@/components/ui/Motion'

interface PageHeroProps {
  tag?: string
  title: string
  subtitle?: string
  dark?: boolean
}

export default function PageHero({ tag, title, subtitle, dark = false }: PageHeroProps) {
  return (
    <section className={`pt-32 pb-16 ${dark ? 'bg-hero' : 'bg-white border-b border-green/10'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          {tag && (
            <span className={`section-tag ${dark ? 'text-sage' : ''}`}>{tag}</span>
          )}
          <h1 className={`font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 ${dark ? 'text-white' : 'text-green'}`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`font-inter text-lg leading-relaxed max-w-2xl mx-auto ${dark ? 'text-white/70' : 'text-charcoal/65'}`}>
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
