'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Shield } from 'lucide-react'

const EXPECTATIONS = [
  'Review monthly lead volume',
  'Calculate revenue recovery opportunity',
  'Walk through automation architecture',
  'Define 72-hour deployment plan',
]

export default function DemoCalendarPage() {
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
          <span className="w-1.5 h-1.5 rounded-full bg-[#6FCF97] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#6FCF97] font-medium">Application Approved</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          {clinicName && (
            <p className="text-[#C6A75E] text-xs uppercase tracking-widest mb-3 font-medium">
              Welcome, {clinicName}
            </p>
          )}
          <h1 className="font-display text-3xl lg:text-4xl text-[#F8F6F3] leading-[1.18] mb-4">
            Schedule Your{' '}
            <span className="text-[#C6A75E]">30-Minute Revenue Strategy Call</span>
          </h1>
          <p className="text-[#F8F6F3]/50 text-sm leading-relaxed max-w-xl mx-auto">
            We will calculate your missed lead revenue and outline your 72-hour deployment plan.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">

          {/* ── Calendar embed ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="border border-[rgba(198,167,94,0.18)] rounded-2xl bg-[#1A1A1A] overflow-hidden"
          >
            {/* Calendly placeholder — swap src once you have your Calendly link */}
            <div className="w-full h-[600px] flex flex-col items-center justify-center gap-5 p-10 text-center">
              <div className="w-14 h-14 rounded-full border border-[rgba(198,167,94,0.3)] flex items-center justify-center">
                <Clock size={24} className="text-[#C6A75E]" />
              </div>
              <div>
                <p className="text-[#F8F6F3] font-display text-lg mb-2">Calendar Embed</p>
                <p className="text-[#F8F6F3]/40 text-sm leading-relaxed max-w-xs">
                  Paste your Calendly (or Cal.com) embed URL here to activate live booking.
                </p>
              </div>
              {/* Uncomment and replace URL when ready:
              <iframe
                src="https://calendly.com/YOUR_LINK/30min"
                width="100%"
                height="100%"
                frameBorder="0"
                className="absolute inset-0 w-full h-full"
              />
              */}
              <a
                href="/demo/confirmation"
                className="mt-2 inline-flex items-center gap-2 bg-[#C6A75E] text-[#111111] font-semibold text-sm px-6 py-3 rounded-xl
                  hover:bg-[#A88A45] active:scale-[0.98]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A75E]
                  transition-colors duration-200"
                style={{ boxShadow: '0 4px 24px rgba(198,167,94,0.25)' }}
              >
                Preview Confirmation Page →
              </a>
            </div>
          </motion.div>

          {/* ── Sidebar: expectations ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <div className="border border-[rgba(198,167,94,0.18)] rounded-2xl bg-[#1A1A1A] p-6">
              <p className="text-[10px] uppercase tracking-widest text-[#C6A75E] font-medium mb-4">
                What We'll Cover
              </p>
              <ul className="space-y-3.5">
                {EXPECTATIONS.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={15} className="text-[#C6A75E] mt-0.5 shrink-0" />
                    <span className="text-[#F8F6F3]/70 text-sm leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="border border-[rgba(198,167,94,0.15)] rounded-2xl bg-[rgba(198,167,94,0.04)] p-5">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={13} className="text-[#C6A75E]" />
                <span className="text-[10px] uppercase tracking-widest text-[#C6A75E] font-medium">Duration</span>
              </div>
              <p className="text-[#F8F6F3]/50 text-xs leading-relaxed">
                30-minute focused strategy session. No sales pitch — pure analysis and deployment roadmap.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
