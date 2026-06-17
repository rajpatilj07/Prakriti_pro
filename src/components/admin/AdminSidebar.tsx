'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Leaf, LayoutDashboard, Package, FileText, Users, MessageSquare, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Blog Posts', href: '/admin/blogs', icon: FileText },
  { label: 'Distributor Leads', href: '/admin/leads', icon: Users },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 bg-green text-white z-40">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-sage" />
            </div>
            <div>
              <p className="font-playfair text-lg font-bold">Prakriti</p>
              <p className="font-inter text-[10px] text-sage tracking-widest uppercase">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl font-inter text-sm font-medium transition-all',
                pathname === href ? 'bg-white/15 text-white' : 'text-white/65 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-inter text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all w-full"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-green text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-sage" />
          <span className="font-playfair font-bold">Prakriti Admin</span>
        </div>
        <button onClick={handleLogout} className="text-white/70 hover:text-white">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </>
  )
}
