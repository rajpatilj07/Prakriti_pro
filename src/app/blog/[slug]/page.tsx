import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PageTransition } from '@/components/ui/Motion'
import { formatDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('blog_posts').select('title, excerpt').eq('slug', slug).single()
  if (!data) return { title: 'Post Not Found' }
  return {
    title: data.title,
    description: data.excerpt ?? undefined,
    openGraph: { title: data.title, description: data.excerpt ?? undefined },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from('blog_posts').select('*').eq('slug', slug).eq('published', true).single()

  if (!post) notFound()

  return (
    <PageTransition>
      <div className="pt-28 pb-20 bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-inter text-charcoal/60 hover:text-green transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {post.tag && (
            <span className="inline-block bg-green text-sage text-xs font-semibold font-inter px-3 py-1 rounded-full mb-4">{post.tag}</span>
          )}

          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-green leading-tight mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-charcoal/50 mb-8">
            <span className="flex items-center gap-1.5 font-inter text-sm"><Calendar className="w-4 h-4" />{formatDate(post.created_at)}</span>
            {post.read_time && <span className="flex items-center gap-1.5 font-inter text-sm"><Clock className="w-4 h-4" />{post.read_time}</span>}
          </div>

          {post.image_url && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
              <Image src={post.image_url} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <article
            className="prose prose-green prose-lg max-w-none font-inter text-charcoal/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </PageTransition>
  )
}
