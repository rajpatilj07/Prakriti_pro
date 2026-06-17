'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { distributorSchema, type DistributorInput } from '@/lib/validations'
import { submitDistributorLead } from '@/actions'

const BUSINESS_TYPES = ['Retailer', 'Wholesaler', 'Super Stockist', 'C&F Agent', 'Online Reseller', 'Other']
const INVESTMENTS = ['Under ₹1 Lakh', '₹1–5 Lakhs', '₹5–10 Lakhs', '₹10–25 Lakhs', 'Above ₹25 Lakhs']

export default function DistributorForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<DistributorInput>({
    resolver: zodResolver(distributorSchema),
  })

  const onSubmit = async (data: DistributorInput) => {
    const result = await submitDistributorLead(data)
    if (result.success) {
      toast.success('Application submitted!', { description: "We'll reach out within 48 hours." })
      reset()
    } else {
      toast.error('Submission failed', { description: result.error })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Full Name *</label>
          <input {...register('name')} placeholder="Your full name" className="form-input" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="form-label">Mobile Number *</label>
          <input {...register('phone')} placeholder="10-digit mobile number" className="form-input" />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">City / District *</label>
        <input {...register('city')} placeholder="Your city or district" className="form-input" />
        {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Business Type *</label>
          <select {...register('business_type')} className="form-input">
            <option value="">Select type</option>
            {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.business_type && <p className="mt-1 text-xs text-red-500">{errors.business_type.message}</p>}
        </div>
        <div>
          <label className="form-label">Investment Capacity *</label>
          <select {...register('investment_capacity')} className="form-input">
            <option value="">Select range</option>
            {INVESTMENTS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          {errors.investment_capacity && <p className="mt-1 text-xs text-red-500">{errors.investment_capacity.message}</p>}
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-4 disabled:opacity-60">
        {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : 'Submit Application'}
      </button>
    </form>
  )
}
