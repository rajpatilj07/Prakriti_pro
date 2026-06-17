'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { contactSchema, type ContactInput } from '@/lib/validations'
import { submitContactMessage } from '@/actions'

const SUBJECTS = ['General Enquiry', 'Product Question', 'Distributor Query', 'Quality Feedback', 'Other']

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactInput) => {
    const result = await submitContactMessage(data)
    if (result.success) {
      toast.success('Message sent!', { description: "We'll respond within 24–48 hours." })
      reset()
    } else {
      toast.error('Failed to send', { description: result.error })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Your Name *</label>
          <input {...register('name')} placeholder="Full name" className="form-input" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="form-label">Email Address *</label>
          <input {...register('email')} type="email" placeholder="you@email.com" className="form-input" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label className="form-label">Subject *</label>
        <select {...register('subject')} className="form-input">
          <option value="">Select a subject</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
      </div>
      <div>
        <label className="form-label">Message *</label>
        <textarea {...register('message')} rows={5} placeholder="Tell us how we can help…" className="form-input resize-none" />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-4 disabled:opacity-60">
        {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : 'Send Message'}
      </button>
    </form>
  )
}
