import BlogForm from '@/components/admin/BlogForm'

export default function NewBlogPage() {
  return (
    <div className="pt-16 lg:pt-0 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-charcoal">New Blog Post</h1>
        <p className="font-inter text-sm text-charcoal/60 mt-1">Write and publish a new article.</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <BlogForm />
      </div>
    </div>
  )
}
