import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BlogForm from '@/components/admin/BlogForm'

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single()

  if (!post) notFound()

  return (
    <div className="pt-16 lg:pt-0 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-charcoal">Edit Post</h1>
        <p className="font-inter text-sm text-charcoal/60 mt-1">{post.title}</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <BlogForm post={post} />
      </div>
    </div>
  )
}
