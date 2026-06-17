import Link from 'next/link'
import { Leaf } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-10 h-10 text-sage" />
        </div>
        <h1 className="font-playfair text-8xl font-bold text-white/20 mb-2">404</h1>
        <h2 className="font-playfair text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="font-inter text-white/65 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link href="/" className="btn-primary">
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}
