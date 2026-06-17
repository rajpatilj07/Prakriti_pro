'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Leaf, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      toast.error('Login failed', { description: error.message })
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-7 h-7 text-sage" />
          </div>
          <h1 className="font-playfair text-3xl font-bold text-white">Admin Portal</h1>
          <p className="font-inter text-sm text-white/60 mt-1">Prakriti Foods</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-3xl p-8 space-y-4 shadow-xl">
          <div>
            <label className="form-label">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" placeholder="admin@prakritifoods.in" required />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-input" placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-60">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
