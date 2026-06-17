import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Motion'
import { formatDate } from '@/lib/utils'

export default async function BlogPreview() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, image_url, tag, read_time, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (!posts?.length) return null

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <span className="section-tag">From Our Kitchen</span>
          <h2 className="section-title mb-4">Stories, Recipes & Insights</h2>
          <p className="section-subtitle mx-auto">
            Learn more about the food you eat — where it comes from and how to make it shine.
          </p>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="blog-card group block h-full">
                <div className="relative aspect-video overflow-hidden bg-green/10">
                  {post.image_url ? (
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">📰</div>
                  )}
                  {post.tag && (
                    <span className="absolute top-3 left-3 bg-green text-sage text-xs font-semibold font-inter px-3 py-1 rounded-full">
                      {post.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-charcoal/50 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-inter text-xs">{formatDate(post.created_at)}</span>
                    {post.read_time && (
                      <>
                        <span>·</span>
                        <span className="font-inter text-xs">{post.read_time}</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-green mb-2 line-clamp-2 group-hover:text-green-light transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="font-inter text-sm text-charcoal/60 line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <Reveal className="text-center">
          <Link href="/blog" className="btn-outline-green">
            Read All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
