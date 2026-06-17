import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Motion'
import { formatDate } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Recipes, farming stories, health tips, and insights from the world of natural food.',
}

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <>
      <PageHero
        tag="From Our Kitchen"
        title="Stories, Recipes & Insights"
        subtitle="Dive into the world of natural food — recipes, farming tales, health tips, and more."
      />

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts && posts.length > 0 ? (
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="blog-card group block h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden bg-green/10">
                      {post.image_url ? (
                        <Image src={post.image_url} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">📰</div>
                      )}
                      {post.tag && (
                        <span className="absolute top-3 left-3 bg-green text-sage text-xs font-semibold font-inter px-3 py-1 rounded-full">{post.tag}</span>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-charcoal/45 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="font-inter text-xs">{formatDate(post.created_at)}</span>
                        {post.read_time && (
                          <>
                            <Clock className="w-3.5 h-3.5" />
                            <span className="font-inter text-xs">{post.read_time}</span>
                          </>
                        )}
                      </div>
                      <h2 className="font-playfair text-xl font-semibold text-green mb-2 line-clamp-2 group-hover:text-green-light transition-colors flex-1">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="font-inter text-sm text-charcoal/60 line-clamp-3 mt-auto pt-2">{post.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerReveal>
          ) : (
            <Reveal className="text-center py-20">
              <p className="font-inter text-lg text-charcoal/50">Articles coming soon. Check back shortly!</p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
