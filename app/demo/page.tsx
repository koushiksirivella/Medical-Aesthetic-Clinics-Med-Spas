'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, ChevronDown, Shield } from 'lucide-react'

const BULLETS = [
  'Personalized ROI Calculation',
  'Live Automation Walkthrough',
  'Deployment Roadmap for Your Clinic',
]

const LEAD_VOLUME_OPTIONS = ['0–20', '20–50', '50–100', '100+']
const TREATMENT_VALUE_OPTIONS = ['$500–$1,000', '$1,000–$2,500', '$2,500–$5,000', '$5,000+']
const RESPONSE_METHOD_OPTIONS = ['Receptionist', 'CRM Automation', 'Manual SMS', 'Not Structured']

type FormData = {
  clinicName: string
  websiteUrl: string
  leadVolume: string
  treatmentValue: string
  responseMethod: string
  runsAds: string
  isDecisionMaker: string
  email: string
  phone: string
}

const EMPTY: FormData = {
  clinicName: '',
  websiteUrl: '',
  leadVolume: '',
  treatmentValue: '',
  responseMethod: '',
  runsAds: '',
  isDecisionMaker: '',
  email: '',
  phone: '',
}

function SelectField({
  label, value, options, onChange, required,
}: {
  label: string; value: string; options: string[]; onChange: (v: string) => void; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-widest text-[#C6A75E] font-medium">
        {label}{required && <span className="text-[#C6A75E] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          required={required}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-[#1A1A1A] border border-[rgba(198,167,94,0.18)] rounded-lg px-4 py-3 text-[#F8F6F3] text-sm focus:outline-none focus:border-[rgba(198,167,94,0.55)] focus:ring-1 focus:ring-[rgba(198,167,94,0.3)] transition-colors duration-200 cursor-pointer"
        >
          <option value="" disabled className="text-[#F8F6F3]/40">Select…</option>
          {options.map(o => (
            <option key={o} value={o} className="bg-[#1A1A1A] text-[#F8F6F3]">{o}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C6A75E] pointer-events-none" />
      </div>
    </div>
  )
}

function TextField({
  label, value, onChange, type = 'text', placeholder, required,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-widest text-[#C6A75E] font-medium">
        {label}{required && <span className="text-[#C6A75E] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder ?? ''}
        onChange={e => onChange(e.target.value)}
        className="bg-[#1A1A1A] border border-[rgba(198,167,94,0.18)] rounded-lg px-4 py-3 text-[#F8F6F3] text-sm placeholder:text-[#F8F6F3]/25 focus:outline-none focus:border-[rgba(198,167,94,0.55)] focus:ring-1 focus:ring-[rgba(198,167,94,0.3)] transition-colors duration-200"
      />
    </div>
  )
}

function RadioGroup({
  label, value, options, onChange, required,
}: {
  label: string; value: string; options: string[]; onChange: (v: string) => void; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-widest text-[#C6A75E] font-medium">
        {label}{required && <span className="text-[#C6A75E] ml-0.5">*</span>}
      </label>
      <div className="flex gap-3">
        {options.map(o => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#C6A75E] focus-visible:outline-none ${
              value === o
                ? 'bg-[rgba(198,167,94,0.12)] border-[#C6A75E] text-[#C6A75E]'
                : 'bg-[#1A1A1A] border-[rgba(198,167,94,0.18)] text-[#F8F6F3]/60 hover:border-[rgba(198,167,94,0.4)] hover:text-[#F8F6F3]'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function DemoApplicationPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [rejected, setRejected] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  function set<K extends keyof FormData>(key: K) {
    return (val: string) => setForm(prev => ({ ...prev, [key]: val }))
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.clinicName.trim())    e.clinicName       = 'Required'
    if (!form.websiteUrl.trim())    e.websiteUrl       = 'Required'
    if (!form.leadVolume)           e.leadVolume        = 'Required'
    if (!form.treatmentValue)       e.treatmentValue   = 'Required'
    if (!form.responseMethod)       e.responseMethod   = 'Required'
    if (!form.runsAds)              e.runsAds          = 'Required'
    if (!form.isDecisionMaker)      e.isDecisionMaker  = 'Required'
    if (!form.email.trim())         e.email            = 'Required'
    if (!form.phone.trim())         e.phone            = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbw2i98DeecOk6dWKZGOiyYiSedv19KrAGFLfAhy-eVok8WC6WJs2Fp86jMH2gKfrNvAqw/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      )
    } catch {
      // Continue regardless — don't block the user
    }

    if (form.leadVolume === '0–20') {
      setRejected(true)
      setSubmitting(false)
    } else {
      sessionStorage.setItem('demo_applicant', JSON.stringify(form))
      router.push('/demo/calendar')
    }
  }

  return (
    <div className="min-h-screen luxury-bg grain-overlay relative">
      {/* Gold top bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent" />

      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <span className="font-display text-[#F8F6F3] text-sm tracking-wider font-semibold">
          Koushik <span className="text-[#C6A75E]">AI</span> Automation
        </span>
        <a
          href="/"
          className="text-xs text-[#F8F6F3]/40 hover:text-[#F8F6F3]/70 transition-colors duration-200 tracking-widest uppercase"
        >
          ← Back to Home
        </a>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

          {/* ── Left: Hero ─────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(198,167,94,0.3)] bg-[rgba(198,167,94,0.06)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A75E] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#C6A75E] font-medium">
                Private Access Only
              </span>
            </div>

            <h1 className="font-display text-3xl lg:text-4xl text-[#F8F6F3] leading-[1.18] mb-5">
              Private Revenue System Demo{' '}
              <span className="text-[#C6A75E]">for Medical Aesthetic Clinics</span>
            </h1>

            <p className="text-[#F8F6F3]/55 leading-[1.75] text-sm mb-10">
              This strategy session evaluates your missed lead volume and revenue recovery opportunity.
            </p>

            <ul className="space-y-4 mb-12">
              {BULLETS.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={16} className="text-[#C6A75E] mt-0.5 shrink-0" />
                  <span className="text-[#F8F6F3]/75 text-sm leading-relaxed">{b}</span>
                </motion.li>
              ))}
            </ul>

            {/* Trust signal */}
            <div className="border border-[rgba(198,167,94,0.15)] rounded-xl p-5 bg-[rgba(198,167,94,0.04)]">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={13} className="text-[#C6A75E]" />
                <span className="text-[10px] uppercase tracking-widest text-[#C6A75E] font-medium">Qualification Notice</span>
              </div>
              <p className="text-[#F8F6F3]/45 text-xs leading-relaxed">
                This session is reserved for clinics generating 20+ leads per month. We pre-qualify every applicant to ensure the session delivers real value.
              </p>
            </div>
          </motion.div>

          {/* ── Right: Form ────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {rejected ? (
                /* Rejection state */
                <motion.div
                  key="rejected"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-[rgba(198,167,94,0.18)] rounded-2xl bg-[#1A1A1A] p-10 text-center"
                >
                  <div className="w-12 h-12 rounded-full border border-[rgba(198,167,94,0.3)] flex items-center justify-center mx-auto mb-6">
                    <Shield size={22} className="text-[#C6A75E]" />
                  </div>
                  <h2 className="font-display text-xl text-[#F8F6F3] mb-3">
                    Not a Fit — Yet
                  </h2>
                  <p className="text-[#F8F6F3]/50 text-sm leading-relaxed max-w-xs mx-auto">
                    We're currently prioritizing clinics generating at least 20 monthly inquiries. As your lead volume grows, reach back out — we'd love to work with you.
                  </p>
                  <button
                    onClick={() => { setRejected(false); setForm(EMPTY) }}
                    className="mt-8 text-xs text-[#C6A75E] hover:text-[#A88A45] transition-colors duration-200 tracking-widest uppercase"
                  >
                    ← Update My Application
                  </button>
                </motion.div>
              ) : (
                /* Form state */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="border border-[rgba(198,167,94,0.18)] rounded-2xl bg-[#1A1A1A] p-8 space-y-6"
                >
                  <div className="pb-4 border-b border-[rgba(198,167,94,0.1)]">
                    <h2 className="font-display text-xl text-[#F8F6F3] mb-1">Application Form</h2>
                    <p className="text-[#F8F6F3]/35 text-xs tracking-wide">All fields required</p>
                  </div>

                  {/* Clinic info */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <TextField
                        label="Clinic Name"
                        value={form.clinicName}
                        onChange={set('clinicName')}
                        placeholder="Advanced Aesthetics MD"
                        required
                      />
                      {errors.clinicName && <p className="text-red-400 text-xs">{errors.clinicName}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <TextField
                        label="Website URL"
                        value={form.websiteUrl}
                        onChange={set('websiteUrl')}
                        placeholder="www.yourclinic.com"
                        required
                      />
                      {errors.websiteUrl && <p className="text-red-400 text-xs">{errors.websiteUrl}</p>}
                    </div>
                  </div>

                  {/* Volume & value */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <SelectField
                        label="Monthly Lead Volume"
                        value={form.leadVolume}
                        options={LEAD_VOLUME_OPTIONS}
                        onChange={set('leadVolume')}
                        required
                      />
                      {errors.leadVolume && <p className="text-red-400 text-xs">{errors.leadVolume}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <SelectField
                        label="Average Treatment Value"
                        value={form.treatmentValue}
                        options={TREATMENT_VALUE_OPTIONS}
                        onChange={set('treatmentValue')}
                        required
                      />
                      {errors.treatmentValue && <p className="text-red-400 text-xs">{errors.treatmentValue}</p>}
                    </div>
                  </div>

                  {/* Response method */}
                  <div className="flex flex-col gap-1.5">
                    <SelectField
                      label="Current Lead Response Method"
                      value={form.responseMethod}
                      options={RESPONSE_METHOD_OPTIONS}
                      onChange={set('responseMethod')}
                      required
                    />
                    {errors.responseMethod && <p className="text-red-400 text-xs">{errors.responseMethod}</p>}
                  </div>

                  {/* Radios */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <RadioGroup
                        label="Do You Currently Run Paid Ads?"
                        value={form.runsAds}
                        options={['Yes', 'No']}
                        onChange={set('runsAds')}
                        required
                      />
                      {errors.runsAds && <p className="text-red-400 text-xs">{errors.runsAds}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <RadioGroup
                        label="Are You the Decision Maker?"
                        value={form.isDecisionMaker}
                        options={['Yes', 'Partner Involved']}
                        onChange={set('isDecisionMaker')}
                        required
                      />
                      {errors.isDecisionMaker && <p className="text-red-400 text-xs">{errors.isDecisionMaker}</p>}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <TextField
                        label="Business Email"
                        value={form.email}
                        onChange={set('email')}
                        type="email"
                        placeholder="you@yourclinic.com"
                        required
                      />
                      {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <TextField
                        label="Phone Number"
                        value={form.phone}
                        onChange={set('phone')}
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                      {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-2 relative overflow-hidden flex items-center justify-center gap-2.5 bg-[#C6A75E] text-[#111111] font-semibold text-sm tracking-wide py-4 rounded-xl
                      hover:bg-[#A88A45] active:scale-[0.98]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A75E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]
                      disabled:opacity-60 disabled:cursor-not-allowed
                      transition-colors duration-200"
                    style={{ boxShadow: '0 4px 24px rgba(198,167,94,0.25), 0 1px 0 rgba(255,255,255,0.1) inset' }}
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-[#111]/30 border-t-[#111] animate-spin" />
                        Reviewing Application…
                      </>
                    ) : (
                      <>
                        Apply for Private Demo
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[#F8F6F3]/25 text-[10px] tracking-wide">
                    Your information is kept strictly confidential and never shared.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
