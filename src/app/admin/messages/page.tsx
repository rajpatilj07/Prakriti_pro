import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { MessageSquare } from 'lucide-react'

export default async function AdminMessagesPage() {
  const supabase = await createClient()
  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="pt-16 lg:pt-0">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-charcoal">Contact Messages</h1>
        <p className="font-inter text-sm text-charcoal/60 mt-1">{messages?.length ?? 0} messages received</p>
      </div>

      <div className="space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-green/20 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div>
                  <p className="font-inter text-sm font-semibold text-charcoal">{msg.name}</p>
                  <a href={`mailto:${msg.email}`} className="font-inter text-sm text-green hover:underline">{msg.email}</a>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="px-3 py-1 rounded-full bg-green/10 text-green text-xs font-inter">{msg.subject}</span>
                  <span className="font-inter text-xs text-charcoal/45">{formatDate(msg.created_at)}</span>
                </div>
              </div>
              <p className="font-inter text-sm text-charcoal/70 leading-relaxed">{msg.message}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                  className="inline-flex items-center gap-2 text-xs font-inter font-medium text-green hover:text-green-light transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Reply via Email
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 text-center py-16">
            <MessageSquare className="w-10 h-10 text-charcoal/20 mx-auto mb-3" />
            <p className="font-inter text-charcoal/50">No messages yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
