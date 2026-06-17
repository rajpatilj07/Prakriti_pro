'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { deleteBlogPost } from '@/actions'

export default function DeleteBlogButton({ id, title }: { id: string; title: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Delete "${title}"?`)) return
    setLoading(true)
    const result = await deleteBlogPost(id)
    setLoading(false)
    if (result.success) {
      toast.success('Post deleted')
      router.refresh()
    } else {
      toast.error('Delete failed', { description: result.error })
    }
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="p-2 rounded-lg hover:bg-red-50 text-charcoal/60 hover:text-red-500 transition-colors disabled:opacity-40">
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  )
}
