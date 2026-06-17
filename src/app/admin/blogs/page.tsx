import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import DeleteBlogButton from '@/components/admin/DeleteBlogButton'

export default async function AdminBlogsPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })

  return (
    <div className="pt-16 lg:pt-0">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-charcoal">Blog Posts</h1>
          <p className="font-inter text-sm text-charcoal/60 mt-1">{posts?.length ?? 0} total posts</p>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary text-sm px-5 py-2.5">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {posts && posts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Title', 'Tag', 'Published', 'Date', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-4 text-left font-inter text-xs font-semibold text-charcoal/60 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 font-inter text-sm font-medium text-charcoal max-w-xs truncate">{post.title}</td>
                    <td className="px-5 py-4">
                      {post.tag && <span className="px-2.5 py-1 rounded-full bg-green/10 text-green text-xs font-inter">{post.tag}</span>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-inter ${post.published ? 'bg-sage/30 text-green' : 'bg-gray-100 text-gray-500'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-inter text-sm text-charcoal/60">{formatDate(post.created_at)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/blogs/${post.id}/edit`} className="p-2 rounded-lg hover:bg-green/10 text-charcoal/60 hover:text-green transition-colors">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteBlogButton id={post.id} title={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-inter text-charcoal/50 mb-4">No blog posts yet.</p>
            <Link href="/admin/blogs/new" className="btn-primary text-sm px-5 py-2.5 inline-flex">
              <Plus className="w-4 h-4" /> Write First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
