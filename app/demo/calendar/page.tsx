'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Shield, Clock, CalendarDays, ArrowRight, Users } from 'lucide-react'
import { GoldShinyButton } from '@/components/ui/shiny-button'

const EXPECTATIONS = [
  'Review monthly lead volume',
  'Calculate revenue recovery opportunity',
  'Walk through automation architecture',
  'Define 72-hour deployment plan',
]

const DETAILS = [
  { icon: Clock,        label: 'Duration',  value: '30 minutes' },
  { icon: CalendarDays, label: 'Format',    value: 'Google Meet / Zoom' },
  { icon: Users,        label: 'With',      value: 'Koushik — Founder' },
  { icon: Shield,       label: 'Guarantee', value: 'No pitch. Pure strategy.' },
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

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* ── Main booking card ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="border border-[rgba(198,167,94,0.18)] rounded-2xl bg-[#1A1A1A] overflow-hidden"
          >
            {/* Card header */}
            <div className="px-8 pt-8 pb-6 border-b border-[rgba(198,167,94,0.12)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[rgba(198,167,94,0.12)] border border-[rgba(198,167,94,0.2)] flex items-center justify-center">
                  <CalendarDays size={18} className="text-[#C6A75E]" />
                </div>
                <div>
                  <p className="text-[#F8F6F3]/90 font-semibold text-sm">Revenue Strategy Session</p>
                  <p className="text-[#F8F6F3]/40 text-xs">Private Strategy Session — By Invitation</p>
                </div>
              </div>

              {/* Session detail pills */}
              <div className="grid grid-cols-2 gap-3">
                {DETAILS.map(({ icon: Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.45 }}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[rgba(198,167,94,0.1)] bg-[rgba(198,167,94,0.04)]"
                  >
                    <Icon size={14} className="text-[#C6A75E] shrink-0" />
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.15em] text-[#C6A75E]/60 font-medium leading-none mb-0.5">{label}</p>
                      <p className="text-[#F8F6F3]/75 text-xs font-medium">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Booking CTA */}
            <div className="px-8 py-8 text-center">
              <p className="text-[#F8F6F3]/45 text-xs leading-relaxed mb-6 max-w-sm mx-auto">
                Click below to open the booking calendar and choose a time that works for you. The call is free with no obligation.
              </p>

              <GoldShinyButton
                href="https://calendly.com/koushiksirivella/30min"
                className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide"
              >
                Choose Your Time Slot
                <ArrowRight size={15} />
              </GoldShinyButton>

              <p className="mt-5 text-[#F8F6F3]/25 text-[11px]">
                Opens in a new tab · Powered by Calendly
              </p>
            </div>

            {/* Bottom guarantee strip */}
            <div className="px-8 py-4 border-t border-[rgba(198,167,94,0.1)] bg-[rgba(198,167,94,0.03)] flex items-center justify-center gap-2">
              <Shield size={12} className="text-[#C6A75E]/50" />
              <span className="text-[10px] text-[#F8F6F3]/35 uppercase tracking-widest">
                No sales pitch · Pure analysis · Instant confirmation
              </span>
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

            {/* Who you're meeting */}
            <div className="border border-[rgba(198,167,94,0.15)] rounded-2xl bg-[rgba(198,167,94,0.04)] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users size={13} className="text-[#C6A75E]" />
                <span className="text-[10px] uppercase tracking-widest text-[#C6A75E] font-medium">Who You're Meeting</span>
              </div>
              <p className="text-[#F8F6F3]/80 text-sm font-medium mb-1">Koushik Sirivella</p>
              <p className="text-[#F8F6F3]/40 text-xs leading-relaxed">
                Founder · AI Automation Specialist for Medical Aesthetic Clinics
              </p>
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
