import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProductForm from '@/components/admin/ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: product } = await supabase.from('products').select('*').eq('id', id).single()

  if (!product) notFound()

  return (
    <div className="pt-16 lg:pt-0 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-charcoal">Edit Product</h1>
        <p className="font-inter text-sm text-charcoal/60 mt-1">{product.name}</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <ProductForm product={product} />
      </div>
    </div>
  )
}
