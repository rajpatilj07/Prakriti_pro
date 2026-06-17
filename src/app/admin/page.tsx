import { Package, FileText, Users, MessageSquare } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [products, blogs, leads, messages] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
    supabase.from('distributor_leads').select('id', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Products', count: products.count ?? 0, icon: Package, href: '/admin/products', color: 'bg-green/10 text-green' },
    { label: 'Blog Posts', count: blogs.count ?? 0, icon: FileText, href: '/admin/blogs', color: 'bg-sage/30 text-green' },
    { label: 'Distributor Leads', count: leads.count ?? 0, icon: Users, href: '/admin/leads', color: 'bg-gold/20 text-gold' },
    { label: 'Messages', count: messages.count ?? 0, icon: MessageSquare, href: '/admin/messages', color: 'bg-blue-50 text-blue-600' },
  ]

  return (
    <div className="pt-16 lg:pt-0">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-charcoal">Dashboard</h1>
        <p className="font-inter text-sm text-charcoal/60 mt-1">Welcome back to Prakriti Foods admin panel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map(({ label, count, icon: Icon, href, color }) => (
          <Link key={label} href={href} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-green/20 hover:shadow-md transition-all group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="font-playfair text-3xl font-bold text-charcoal">{count}</p>
            <p className="font-inter text-sm text-charcoal/60 mt-1">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="font-playfair text-lg font-semibold text-charcoal mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/admin/products/new" className="flex items-center gap-3 p-3 rounded-xl hover:bg-green/5 text-sm font-inter text-charcoal/70 hover:text-green transition-all">
              <Package className="w-4 h-4" /> Add New Product
            </Link>
            <Link href="/admin/blogs/new" className="flex items-center gap-3 p-3 rounded-xl hover:bg-green/5 text-sm font-inter text-charcoal/70 hover:text-green transition-all">
              <FileText className="w-4 h-4" /> Write New Blog Post
            </Link>
            <Link href="/admin/leads" className="flex items-center gap-3 p-3 rounded-xl hover:bg-green/5 text-sm font-inter text-charcoal/70 hover:text-green transition-all">
              <Users className="w-4 h-4" /> View Distributor Enquiries
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="font-playfair text-lg font-semibold text-charcoal mb-4">Site Links</h2>
          <div className="space-y-2">
            {['/', '/products', '/blog', '/become-a-distributor', '/contact-us'].map((path) => (
              <a key={path} href={path} target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-green/5 text-sm font-inter text-charcoal/70 hover:text-green transition-all">
                {path === '/' ? 'Homepage' : path.replace(/\//g, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
