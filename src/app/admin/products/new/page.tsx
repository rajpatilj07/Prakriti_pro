import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div className="pt-16 lg:pt-0 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-charcoal">Add Product</h1>
        <p className="font-inter text-sm text-charcoal/60 mt-1">Create a new product listing.</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <ProductForm />
      </div>
    </div>
  )
}
