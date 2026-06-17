import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import DeleteProductButton from '@/components/admin/DeleteProductButton'

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false })

  return (
    <div className="pt-16 lg:pt-0">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-charcoal">Products</h1>
          <p className="font-inter text-sm text-charcoal/60 mt-1">{products?.length ?? 0} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary text-sm px-5 py-2.5">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {products && products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Name', 'Category', 'Price', 'Weight', 'Featured', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-4 text-left font-inter text-xs font-semibold text-charcoal/60 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 font-inter text-sm font-medium text-charcoal">{p.name}</td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-green/10 text-green text-xs font-inter capitalize">{p.category}</span>
                    </td>
                    <td className="px-5 py-4 font-inter text-sm text-charcoal/70">{formatPrice(p.price)}</td>
                    <td className="px-5 py-4 font-inter text-sm text-charcoal/70">{p.weight}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-inter ${p.featured ? 'bg-sage/30 text-green' : 'bg-gray-100 text-gray-500'}`}>
                        {p.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/products/${p.id}/edit`} className="p-2 rounded-lg hover:bg-green/10 text-charcoal/60 hover:text-green transition-colors">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteProductButton id={p.id} name={p.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-inter text-charcoal/50 mb-4">No products yet.</p>
            <Link href="/admin/products/new" className="btn-primary text-sm px-5 py-2.5 inline-flex">
              <Plus className="w-4 h-4" /> Add First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
