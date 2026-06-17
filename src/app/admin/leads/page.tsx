import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { Users } from 'lucide-react'

export default async function AdminLeadsPage() {
  const supabase = await createClient()
  const { data: leads } = await supabase
    .from('distributor_leads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="pt-16 lg:pt-0">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-charcoal">Distributor Leads</h1>
        <p className="font-inter text-sm text-charcoal/60 mt-1">{leads?.length ?? 0} enquiries received</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {leads && leads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Name', 'Phone', 'City', 'Business Type', 'Investment', 'Date'].map(h => (
                    <th key={h} className="px-5 py-4 text-left font-inter text-xs font-semibold text-charcoal/60 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 font-inter text-sm font-medium text-charcoal whitespace-nowrap">{lead.name}</td>
                    <td className="px-5 py-4">
                      <a href={`tel:${lead.phone}`} className="font-inter text-sm text-green hover:underline">{lead.phone}</a>
                    </td>
                    <td className="px-5 py-4 font-inter text-sm text-charcoal/70">{lead.city}</td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-green/10 text-green text-xs font-inter whitespace-nowrap">{lead.business_type}</span>
                    </td>
                    <td className="px-5 py-4 font-inter text-sm text-charcoal/70 whitespace-nowrap">{lead.investment_capacity}</td>
                    <td className="px-5 py-4 font-inter text-sm text-charcoal/60 whitespace-nowrap">{formatDate(lead.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <Users className="w-10 h-10 text-charcoal/20 mx-auto mb-3" />
            <p className="font-inter text-charcoal/50">No distributor enquiries yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
