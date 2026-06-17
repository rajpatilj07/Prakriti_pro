'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { deleteProduct } from '@/actions'

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setLoading(true)
    const result = await deleteProduct(id)
    setLoading(false)
    if (result.success) {
      toast.success('Product deleted')
      router.refresh()
    } else {
      toast.error('Delete failed', { description: result.error })
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 rounded-lg hover:bg-red-50 text-charcoal/60 hover:text-red-500 transition-colors disabled:opacity-40"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  )
}
