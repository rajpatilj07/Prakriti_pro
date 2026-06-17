'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { blogSchema, type BlogInput } from '@/lib/validations'
import { createBlogPost, updateBlogPost } from '@/actions'
import type { BlogPost } from '@/types/database'
import { slugify } from '@/lib/utils'

export default function BlogForm({ post }: { post?: BlogPost }) {
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<BlogInput>({
    resolver: zodResolver(blogSchema),
    defaultValues: post ?? { published: false },
  })

  const onSubmit = async (data: BlogInput) => {
    const result = post ? await updateBlogPost(post.id, data) : await createBlogPost(data)
    if (result.success) {
      toast.success(post ? 'Post updated' : 'Post created')
      router.push('/admin/blogs')
    } else {
      toast.error('Save failed', { description: result.error })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="form-label">Title *</label>
        <input
          {...register('title')}
          className="form-input"
          placeholder="Article title"
          onChange={e => {
            setValue('title', e.target.value)
            if (!post) setValue('slug', slugify(e.target.value))
          }}
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Slug *</label>
          <input {...register('slug')} className="form-input" placeholder="article-slug" />
          {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>}
        </div>
        <div>
          <label className="form-label">Tag</label>
          <input {...register('tag')} className="form-input" placeholder="e.g. Recipe, Health Tip" />
        </div>
      </div>

      <div>
        <label className="form-label">Excerpt (max 200 chars) *</label>
        <textarea {...register('excerpt')} rows={2} className="form-input resize-none" placeholder="Short summary shown on listing page" />
        {errors.excerpt && <p className="mt-1 text-xs text-red-500">{errors.excerpt.message}</p>}
      </div>

      <div>
        <label className="form-label">Content (HTML allowed) *</label>
        <textarea {...register('content')} rows={12} className="form-input resize-y font-mono text-xs" placeholder="Full article content…" />
        {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Image URL</label>
          <input {...register('image_url')} className="form-input" placeholder="https://…" />
        </div>
        <div>
          <label className="form-label">Read Time</label>
          <input {...register('read_time')} className="form-input" placeholder="e.g. 5 min read" />
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" {...register('published')} className="w-4 h-4 accent-green rounded" />
        <span className="font-inter text-sm text-charcoal">Publish immediately</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : post ? 'Update Post' : 'Create Post'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline-green">Cancel</button>
      </div>
    </form>
  )
}
