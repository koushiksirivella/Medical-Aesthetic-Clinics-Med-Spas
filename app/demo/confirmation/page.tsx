'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Shield, Calendar } from 'lucide-react'

const CHECKLIST = [
  'Know your average monthly lead volume',
  'Have access to your CRM or booking system',
  'Understand your average treatment value',
  'Be prepared to discuss current response workflow',
]

export default function DemoConfirmationPage() {
  const [clinicName, setClinicName] = useState('')

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('demo_applicant')
      if (raw) {
        const data = JSON.parse(raw)
        setClinicName(data.clinicName ?? '')
      }
    } catch {}
  }, [])

  return (
    <div className="min-h-screen luxury-bg grain-overlay relative">
      {/* Gold top bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent" />

      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <span className="font-display text-[#F8F6F3] text-sm tracking-wider font-semibold">
          Koushik <span className="text-[#C6A75E]">AI</span> Automation
        </span>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(198,167,94,0.3)] bg-[rgba(198,167,94,0.06)]">
          <Calendar size={11} className="text-[#C6A75E]" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#C6A75E] font-medium">Session Confirmed</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-20 relative z-10">
        {/* Confirmed badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-10"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'radial-gradient(circle, rgba(198,167,94,0.18) 0%, rgba(198,167,94,0.04) 100%)', boxShadow: '0 0 0 1px rgba(198,167,94,0.25), 0 0 48px rgba(198,167,94,0.1)' }}
          >
            <CheckCircle2 size={36} className="text-[#C6A75E]" />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          {clinicName && (
            <p className="text-[#C6A75E] text-xs uppercase tracking-widest mb-3 font-medium">
              {clinicName}
            </p>
          )}
          <h1 className="font-display text-3xl lg:text-4xl text-[#F8F6F3] leading-[1.18] mb-4">
            Your Strategy Session{' '}
            <span className="text-[#C6A75E]">Is Confirmed</span>
          </h1>
          <p className="text-[#F8F6F3]/50 text-sm leading-relaxed max-w-md mx-auto">
            Please review the information below before our call.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="border border-[rgba(198,167,94,0.18)] rounded-2xl bg-[#1A1A1A] p-7 mb-8"
        >
          <p className="text-[10px] uppercase tracking-widest text-[#C6A75E] font-medium mb-6">
            Prepare Before the Call
          </p>
          <ul className="grid sm:grid-cols-2 gap-4">
            {CHECKLIST.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.09, duration: 0.45 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 size={15} className="text-[#C6A75E] mt-0.5 shrink-0" />
                <span className="text-[#F8F6F3]/70 text-sm leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 pt-5 border-t border-[rgba(198,167,94,0.1)] flex items-center gap-2">
            <Shield size={12} className="text-[#C6A75E]" />
            <p className="text-[10px] text-[#F8F6F3]/30 tracking-wide">
              This is a strategic session, not a generic demo.
            </p>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-[#F8F6F3]/25 text-xs tracking-wide"
        >
          A confirmation has been sent to your email. We look forward to speaking with you.
        </motion.p>
      </div>
    </div>
  )
}
