'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { productSchema, type ProductInput } from '@/lib/validations'
import { createProduct, updateProduct } from '@/actions'
import type { Product } from '@/types/database'
import { slugify } from '@/lib/utils'

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter()
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: product ?? { featured: false },
  })

  const name = watch('name')

  const onSubmit = async (data: ProductInput) => {
    const result = product
      ? await updateProduct(product.id, data)
      : await createProduct(data)

    if (result.success) {
      toast.success(product ? 'Product updated' : 'Product created')
      router.push('/admin/products')
    } else {
      toast.error('Save failed', { description: result.error })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Product Name *</label>
          <input
            {...register('name')}
            className="form-input"
            placeholder="e.g. Toor Dal Premium"
            onChange={e => {
              setValue('name', e.target.value)
              if (!product) setValue('slug', slugify(e.target.value))
            }}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="form-label">Slug *</label>
          <input {...register('slug')} className="form-input" placeholder="toor-dal-premium" />
          {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Category *</label>
          <select {...register('category')} className="form-input">
            <option value="">Select category</option>
            {['pulses', 'spices', 'premium', 'gift'].map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
        </div>
        <div>
          <label className="form-label">Badge (optional)</label>
          <input {...register('badge')} className="form-input" placeholder="e.g. Bestseller, New" />
        </div>
      </div>

      <div>
        <label className="form-label">Description *</label>
        <textarea {...register('description')} rows={3} className="form-input resize-none" placeholder="Product description…" />
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Price (₹) *</label>
          <input {...register('price')} type="number" className="form-input" placeholder="199" />
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
        </div>
        <div>
          <label className="form-label">Weight / Size *</label>
          <input {...register('weight')} className="form-input" placeholder="e.g. 500g, 1kg" />
          {errors.weight && <p className="mt-1 text-xs text-red-500">{errors.weight.message}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">Image URL</label>
        <input {...register('image_url')} className="form-input" placeholder="https://…" />
        {errors.image_url && <p className="mt-1 text-xs text-red-500">{errors.image_url.message}</p>}
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" {...register('featured')} className="w-4 h-4 accent-green rounded" />
        <span className="font-inter text-sm text-charcoal">Feature on homepage</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : product ? 'Update Product' : 'Create Product'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline-green">
          Cancel
        </button>
      </div>
    </form>
  )
}
