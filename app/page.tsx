'use client'

import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight, Phone, MessageSquare, Calendar, Bot, Activity,
  CheckCircle2, Shield, Lock, Users, DollarSign, TrendingUp,
  Zap, Star, ChevronDown, Clock, Sparkles, PlayCircle,
} from 'lucide-react'

import { Header }      from '@/components/ui/header-1'
import { Spotlight }   from '@/components/ui/spotlight'
import { Card }        from '@/components/ui/card'
import { LiquidButton }from '@/components/ui/liquid-button'
import { GoldShinyButton } from '@/components/ui/shiny-button'
import { BackgroundPaths } from '@/components/ui/background-paths'
import { GlowingEffect } from '@/components/ui/glowing-effect'

const ShaderAnimation = dynamic(
  () => import('@/components/ui/shader-animation').then(m => ({ default: m.ShaderAnimation })),
  { ssr: false },
)
const SplineScene = dynamic(
  () => import('@/components/ui/splite').then(m => ({ default: m.SplineScene })),
  { ssr: false },
)

// ── Fade-in wrapper ───────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Brand data from Koushik_AI_Automation_Claude_Code_72H_Deployment.json ─────

// 3-step system — landing_page_sections[3].steps
const engineSteps = [
  {
    step: '01',
    icon: Phone,
    title: 'Lead submits inquiry',
    subtitle: 'Website / Facebook / Call',
    body: 'Every inbound lead — web form, Facebook ad, missed call, or DM — is captured instantly and routed into the system automatically.',
    tag: 'Lead Capture',
  },
  {
    step: '02',
    icon: Bot,
    title: 'AI responds within 60 seconds via SMS',
    subtitle: 'Around the clock, no exceptions',
    body: 'Intelligent conversation flow fires within 60 seconds of any inquiry — qualifying, educating, and warming the lead before your competition even sees the notification.',
    tag: 'Instant AI Response',
  },
  {
    step: '03',
    icon: Calendar,
    title: 'Patient qualifies and books automatically',
    subtitle: '24/7 calendar integration',
    body: 'Qualified leads book directly into your calendar — at midnight, weekends, and after hours — with zero staff involvement required.',
    tag: 'Auto Booking',
  },
]

// Offer components — offer.components from JSON
const offerComponents = [
  'Instant 60-Second SMS Response',
  'Missed Call Text-Back Automation',
  'AI Lead Qualification Conversation Flow',
  'Automated Follow-Up (Day 1, Day 3, Day 7)',
  'Calendar Booking Integration',
  'Revenue Tracking Dashboard',
]

// ROEA.Objections — objection_handling section
const objections = [
  { q: '"We already have a receptionist."',             a: 'Automation enhances speed and consistency. Staff continues closing; system ensures instant engagement.' },
  { q: '"We respond manually."',                        a: 'Manual response averages 4–12 hours. 78% of patients book with the first clinic that replies. Speed wins.' },
  { q: '"We use a CRM."',                               a: 'Most CRMs require someone to trigger the sequence. Ours fires automatically the second a lead enters — zero reliance on human memory.' },
  { q: '"Will this replace my staff?"',                 a: 'No. The system handles initial engagement. Your team stays focused on in-clinic care and high-value closing conversations.' },
]

// Services niche
const services = ['Botox', 'Dermal Fillers', 'Laser Hair Removal', 'Skin Rejuvenation', 'PRP', 'Body Contouring']

// Trust builders
const trust = [
  { icon: Shield,       text: 'HIPAA-Friendly Compliant' },
  { icon: Lock,         text: 'Secure Cloud Infrastructure' },
  { icon: Users,        text: 'Done-For-You Implementation' },
  { icon: CheckCircle2, text: 'Not a Template — Custom Built' },
]

// ROI numbers — framework_ROEA.Revenue.roi_simulation from JSON
const roiCards = [
  { icon: Phone,        label: 'Missed Leads / Month',   value: '20',       sub: 'Industry average for med spas',      col: '#C6A75E' },
  { icon: DollarSign,   label: 'Avg Treatment Value',    value: '$1,500',   sub: 'Botox, fillers, laser packages',      col: '#C6A75E' },
  { icon: TrendingUp,   label: 'Potential Loss / Month', value: '$30,000',  sub: '20 leads × $1,500 avg value',        col: '#E87A7A' },
  { icon: CheckCircle2, label: 'Recovered (30%)',        value: '$9,000',   sub: 'Conservative recovery model',         col: '#6FCF97' },
  { icon: Zap,          label: 'System Investment',      value: '$5K–7K',   sub: 'Done-for-you, one-time setup',        col: '#C6A75E' },
  { icon: Star,         label: 'Payback Period',         value: '< 30 days', sub: 'Estimated based on recovery rate',  col: '#F2C94C' },
]

// Proof assets — ROEA.Evidence.proof_assets_required from JSON
const proofAssets = [
  { icon: Activity,     title: 'Workflow Screenshot',        desc: 'Blurred live automation workflow from active med spa account', col: '#C6A75E' },
  { icon: PlayCircle,   title: '60-Second Loom Demo',        desc: 'Watch the full lead-to-booking flow in under 60 seconds',     col: '#6FCF97' },
  { icon: TrendingUp,   title: 'Live ROI Calculator',        desc: 'Enter your numbers — see your exact monthly revenue opportunity', col: '#F2C94C' },
  { icon: Bot,          title: 'Automation Dashboard Preview', desc: 'Real-time conversation tracking and revenue attribution',    col: '#C6A75E' },
]

// Implementation timeline — implementation_process section from 72H_Deployment.json
const timeline = [
  { week: 'Day 1–2', title: 'System Setup & Configuration', desc: 'AI response flows configured, SMS templates built, lead sources connected, CRM synced.' },
  { week: 'Day 3',   title: 'Core System Live',             desc: 'Your automation engine goes live. First recovered leads begin flowing within hours.' },
  { week: 'Day 4–7', title: 'Testing, Optimization & Performance Tuning', desc: 'Full QA testing, conversion tuning, and staff walkthrough to ensure peak performance.' },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-[#F8F6F3] overflow-x-hidden">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <Header />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">

        {/* Shader background */}
        <div className="absolute inset-0 z-0">
          <ShaderAnimation />
          <div className="absolute inset-0 bg-[#111111]/88" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_30%_50%,transparent_30%,#111111_100%)]" />
        </div>

        {/* Gold spotlight */}
        <Spotlight className="-top-40 left-0 md:left-48 md:-top-20" fill="#C6A75E" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left copy */}
            <div className="space-y-8">

              {/* Niche badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#C6A75E]/30 bg-[#C6A75E]/8 text-[#C6A75E] text-xs font-semibold uppercase tracking-widest"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A75E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C6A75E]" />
                </span>
                Medical Aesthetic Clinics &nbsp;·&nbsp; Med Spas
              </motion.div>

              {/* Headline — hero.headline from 72H_Deployment.json */}
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl lg:text-6xl xl:text-[68px] font-bold leading-[1.08]"
                style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}
              >
                Core System Live in{' '}
                <span
                  className="italic"
                  style={{
                    color: '#C6A75E',
                    textShadow: '0 0 40px rgba(198,167,94,0.6), 0 0 80px rgba(198,167,94,0.25)',
                  }}
                >
                  72 Hours
                </span>
              </motion.h1>

              {/* Subheadline — hero.subheadline from 72H_Deployment.json */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl lg:text-2xl font-semibold text-[#C6A75E]/75"
                style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}
              >
                Fully Optimized Within 7 Days
              </motion.p>

              {/* Subtext — hero.description from 72H_Deployment.json */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg lg:text-xl leading-[1.72] text-[#F8F6F3]/62 max-w-lg"
                style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
              >
                AI-powered instant response and booking automation engineered exclusively for medical aesthetic clinics.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row gap-4 items-start"
              >
                {/* PRIMARY — hero.cta_primary: "Book Strategy Call" */}
                <GoldShinyButton href="#contact" className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide">
                  Book Strategy Call
                  <ArrowRight size={17} />
                </GoldShinyButton>

                {/* SECONDARY — hero.cta_secondary: "See Revenue Simulation" */}
                <LiquidButton href="#roi" variant="secondary">
                  See Revenue Simulation
                  <ChevronDown size={16} />
                </LiquidButton>
              </motion.div>

              {/* Trust micro-row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="flex flex-wrap gap-5 pt-1"
              >
                {trust.slice(0, 2).map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-[#F8F6F3]/42">
                    <Icon size={13} className="text-[#C6A75E]" />
                    <span>{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — 3D Spline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[500px] lg:h-[600px] hidden lg:block"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#C6A75E]/15 to-[#E8D8C3]/8 blur-3xl" />
              <Card className="relative w-full h-full bg-black/25 border-[#C6A75E]/15 overflow-hidden rounded-3xl backdrop-blur-sm">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
                <div className="absolute bottom-5 left-5 right-5 bg-[#111111]/60 backdrop-blur-md rounded-2xl p-4 border border-[#C6A75E]/15">
                  <p className="text-[10px] text-[#C6A75E] font-bold uppercase tracking-[0.22em] mb-1">
                    MedSpa Revenue Recovery Engine™
                  </p>
                  <p className="text-[#F8F6F3] font-medium text-sm">
                    Missed Lead → AI Response → Booked Consultation
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={22} className="text-[#F8F6F3]/25" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── SPECIALIZATION — "Built Exclusively for High-Ticket Medical Aesthetic Clinics" */}
      <section id="specialization" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(198,167,94,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#C6A75E] mb-5">
              Specialization
            </span>
            {/* specialization.title from JSON */}
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 max-w-3xl mx-auto"
              style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
              Built Exclusively for{' '}
              <span className="italic" style={{
                background: 'linear-gradient(135deg, #C6A75E, #E8D8C3)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>High-Ticket Medical Aesthetic Clinics</span>
            </h2>
            {/* niche.specialization_statement from JSON */}
            <p className="text-[#F8F6F3]/52 text-lg max-w-2xl mx-auto leading-[1.72]">
              Built exclusively for high-ticket Botox, filler, laser, PRP, and body contouring clinics.
              One clinic per zip code. No competing with your neighbours.
            </p>
          </FadeIn>

          {/* Service badges */}
          <FadeIn delay={0.1} className="flex flex-wrap justify-center gap-3 mb-14">
            {services.map((s) => (
              <span
                key={s}
                className="px-4 py-2 rounded-full text-sm border border-[#C6A75E]/20 bg-[#C6A75E]/6 text-[#C6A75E]/80"
              >
                {s}
              </span>
            ))}
          </FadeIn>

          {/* Core stats from niche.core_problem */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { stat: '78%',     label: 'of patients book with the first clinic that replies',  col: '#E87A7A', icon: Phone },
              { stat: '5 min',   label: 'before a lead goes cold — speed is the product',       col: '#F2C94C', icon: Clock },
              { stat: '$1,000+', label: 'opportunity loss per missed inbound call',              col: '#E87A7A', icon: DollarSign },
              { stat: '0%',      label: 'of manual follow-up is consistent or fast enough',     col: '#F2C94C', icon: MessageSquare },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="relative group card-lift rounded-2xl p-8 border border-white/6 bg-gradient-to-b from-white/4 to-transparent overflow-hidden">
                    <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at 30% 30%, ${item.col}10, transparent 60%)` }}
                    />
                    <Icon size={26} className="mb-5" style={{ color: item.col }} />
                    <p
                      className="text-4xl font-bold mb-2 tracking-tight"
                      style={{ color: item.col, fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}
                    >
                      {item.stat}
                    </p>
                    <p className="text-[#F8F6F3]/52 text-sm leading-relaxed">{item.label}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PROBLEM — "Your Clinic Is Losing $10K–$50K Per Month" ─────────── */}
      <section id="problem" className="relative py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(232,120,120,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#E87A7A] mb-5">
              The Problem
            </span>
            {/* problem.title from kkk3.json */}
            <h2 className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
              Your Clinic Is Losing{' '}
              <span className="italic text-[#E87A7A]">$10K–$50K Per Month</span>
            </h2>
            <p className="text-[#F8F6F3]/55 text-lg max-w-2xl mx-auto leading-[1.72]">
              Most clinics lose this much due to slow follow-up, missed calls, and lack of automation.
              At <span className="text-[#F8F6F3]/80 font-semibold">$800–$5,000+</span> per patient,
              every missed lead is a consultation that went to your competitor.
            </p>
          </FadeIn>

          {/* Problem pain points */}
          <FadeIn delay={0.1}>
            <div className="grid md:grid-cols-2 gap-5 mb-16">
              {[
                { icon: Phone,        title: '78% of patients book the first responder',    desc: 'If you\'re not responding within minutes, you\'re handing patients to your competition.',       col: '#E87A7A' },
                { icon: Clock,        title: 'Leads go cold within 5 minutes',              desc: 'Every minute of delay reduces your chance of booking. Manual response averages 4–12 hours.',     col: '#F2C94C' },
                { icon: MessageSquare,title: 'Missed calls = $1,000+ opportunity loss',     desc: 'One missed inbound call from a Botox or filler inquiry is revenue you\'ll never see again.',     col: '#E87A7A' },
                { icon: TrendingUp,   title: 'Inconsistent follow-up kills booking rates',  desc: 'Manual processes create irregular follow-up. Without structure, leads die in your pipeline.',    col: '#F2C94C' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <FadeIn key={i} delay={i * 0.07}>
                    <div className="flex gap-5 p-6 rounded-2xl border border-white/6 bg-gradient-to-b from-white/3 to-transparent hover:border-white/10 transition-colors duration-300">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${item.col}15` }}>
                        <Icon size={20} style={{ color: item.col }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#F8F6F3]/90 mb-1.5 text-sm">{item.title}</h3>
                        <p className="text-[#F8F6F3]/45 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 3-STEP SYSTEM / SOLUTION ────────────────────────────────────────── */}
      <section id="solution" className="relative py-32 overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[800px] bg-[radial-gradient(ellipse,rgba(198,167,94,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-20">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#C6A75E] mb-5">
              The Solution
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
              The{' '}
              <span style={{
                background: 'linear-gradient(135deg, #C6A75E, #E8D8C3)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                3-Step Automation Engine
              </span>
            </h2>
            {/* offer.core_promise from JSON */}
            <p className="text-[#F8F6F3]/55 text-lg max-w-xl mx-auto leading-[1.72]">
              Convert missed inbound leads into booked consultations within{' '}
              <span className="text-[#C6A75E] font-semibold">60 seconds.</span>{' '}
              Integrates with your existing CRM and calendar systems.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Left — 3 steps from JSON */}
            <div className="space-y-5">
              {engineSteps.map((item, i) => {
                const Icon = item.icon
                return (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="group flex gap-6 p-6 rounded-2xl border border-[#C6A75E]/12 bg-gradient-to-b from-white/4 to-transparent hover:border-[#C6A75E]/30 hover:from-[#C6A75E]/6 transition-all duration-300 cursor-default">
                      <div className="flex-shrink-0 flex flex-col items-center gap-3">
                        <span className="text-[11px] font-bold text-[#C6A75E]/50 tracking-widest">{item.step}</span>
                        <div className="w-12 h-12 rounded-xl bg-[#C6A75E]/12 border border-[#C6A75E]/20 flex items-center justify-center group-hover:bg-[#C6A75E]/22 transition-colors duration-300">
                          <Icon size={22} className="text-[#C6A75E]" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#C6A75E]/10 text-[#C6A75E] text-[10px] font-bold uppercase tracking-widest mb-2">
                          {item.tag}
                        </div>
                        <h3 className="text-base font-semibold text-[#F8F6F3] mb-0.5">{item.title}</h3>
                        <p className="text-[#C6A75E]/60 text-xs mb-2 italic">{item.subtitle}</p>
                        <p className="text-[#F8F6F3]/50 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  </FadeIn>
                )
              })}

              {/* All 6 offer components */}
              <FadeIn delay={0.35}>
                <div className="mt-4 p-6 rounded-2xl border border-[#C6A75E]/10 bg-[#C6A75E]/4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C6A75E]/60 mb-4">
                    What's included — MedSpa Revenue Recovery Engine™
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {offerComponents.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-[#F8F6F3]/55">
                        <CheckCircle2 size={12} className="text-[#C6A75E] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right — live flow terminal */}
            <FadeIn delay={0.2} className="lg:sticky lg:top-24">
              <div className="rounded-3xl overflow-hidden border border-[#C6A75E]/15 bg-gradient-to-br from-[#1A1A1A] to-[#111111]">

                {/* Terminal bar */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-[#C6A75E]/10 bg-black/30">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  <span className="ml-2 text-[11px] text-[#F8F6F3]/35 font-mono">koushikautomation.live — live session</span>
                </div>

                <div className="p-6 space-y-4 font-mono text-sm">
                  {[
                    { msg: '📞 Missed call from +1 (310) 555-9210 — 11:47 PM',                              col: '#F2C94C', delay: 0    },
                    { msg: '⚡ AI triggered — SMS sending in 3s…',                                          col: '#C6A75E', delay: 0.6  },
                    { msg: '💬 "Hi! We missed your call at Lumina MedSpa. Interested in Botox or fillers?"', col: '#6FCF97', delay: 1.2  },
                    { msg: '👤 Patient: "Yes! Looking for lip filler before my vacation."',                 col: '#F8F6F3', delay: 1.8  },
                    { msg: '🤖 AI: "Perfect — I can book you for a complimentary consult this week…"',     col: '#C6A75E', delay: 2.4  },
                    { msg: '✅ Booked: Sat 10 am — Lip Filler Consult — $1,800 case secured.',             col: '#6FCF97', delay: 3.0  },
                  ].map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: line.delay + 0.3, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-[#F8F6F3]/20 text-[11px] mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <p style={{ color: line.col }} className="leading-relaxed text-xs">{line.msg}</p>
                    </motion.div>
                  ))}
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex gap-3"
                  >
                    <span className="text-[#F8F6F3]/20 text-[11px]">07</span>
                    <span className="text-[#C6A75E] text-xs">█</span>
                  </motion.div>
                </div>

                {/* Stats bar */}
                <div className="grid grid-cols-3 divide-x divide-[#C6A75E]/10 border-t border-[#C6A75E]/10 bg-black/25">
                  {[
                    { label: 'Response', value: '<60s' },
                    { label: 'Always On', value: '24/7' },
                    { label: 'Avg Value', value: '$1,500' },
                  ].map(({ label, value }) => (
                    <div key={label} className="px-4 py-3 text-center">
                      <p className="text-[#C6A75E] font-bold text-base">{value}</p>
                      <p className="text-[#F8F6F3]/35 text-[10px]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── ROI — "Revenue Recovery Simulation" ────────────────────────────── */}
      <section id="roi" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(198,167,94,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-20">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#C6A75E] mb-5">
              The Math
            </span>
            {/* roi_section.title from JSON */}
            <h2 className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
              Revenue Recovery{' '}
              <span className="italic" style={{
                background: 'linear-gradient(135deg, #C6A75E, #E8D8C3)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Simulation</span>
            </h2>
            <p className="text-[#F8F6F3]/52 text-lg max-w-2xl mx-auto">
              Based on a single-location med spa with 20 missed leads per month —
              a conservative industry average.
            </p>
          </FadeIn>

          {/* ROI cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {roiCards.map((item, i) => {
              const Icon = item.icon
              return (
                <FadeIn key={i} delay={i * 0.07}>
                  <div
                    className="relative card-lift rounded-2xl p-7 border bg-gradient-to-b from-white/4 to-transparent overflow-hidden"
                    style={{ borderColor: `${item.col}22` }}
                  >
                    <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${item.col}15` }}>
                      <Icon size={20} style={{ color: item.col }} />
                    </div>
                    <p className="text-[#F8F6F3]/42 text-[10px] uppercase tracking-widest mb-2">{item.label}</p>
                    <p
                      className="text-3xl font-bold tracking-tight mb-1"
                      style={{ color: item.col, fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}
                    >{item.value}</p>
                    <p className="text-[#F8F6F3]/35 text-xs">{item.sub}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>

          {/* ROI Summary banner */}
          <FadeIn delay={0.15}>
            <div
              className="relative rounded-3xl p-10 text-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(198,167,94,0.1), rgba(232,216,195,0.06))',
                border: '1px solid rgba(198,167,94,0.22)',
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,167,94,0.08)_0%,transparent_65%)]" />
              <div className="relative z-10">
                <Sparkles className="w-6 h-6 text-[#C6A75E] mx-auto mb-4 opacity-70" />
                <p className="text-2xl lg:text-3xl font-bold text-[#F8F6F3] mb-3">
                  One recovered Botox patient pays for the system.
                </p>
                <p className="text-[#F8F6F3]/52 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
                  At $1,500 avg value, recovering just 4 leads per month more than covers your investment.
                  Every month after is pure recovered revenue.
                </p>
                {/* framework.A.secondary_cta: "Calculate My Revenue Loss" */}
                <div className="flex justify-center">
                  <LiquidButton href="#contact" variant="primary">
                    Calculate My Revenue Loss
                    <ArrowRight size={17} />
                  </LiquidButton>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── OBJECTION HANDLING — "Common Questions from Clinic Owners" ─────── */}
      <section id="objections" className="relative py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#C6A75E] mb-5">
              FAQ
            </span>
            {/* objection_handling.title from JSON */}
            <h2 className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
              Common Questions from{' '}
              <span className="italic" style={{
                background: 'linear-gradient(135deg, #C6A75E, #E8D8C3)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Clinic Owners</span>
            </h2>
            {/* ROEA.Objections.response from JSON */}
            <p className="text-[#F8F6F3]/52 text-lg max-w-xl mx-auto leading-[1.72]">
              Automation enhances speed and consistency. Staff continues closing;
              system ensures instant engagement.
            </p>
          </FadeIn>

          <div className="rounded-3xl border border-[#C6A75E]/12 bg-gradient-to-b from-[#1A1A1A] to-[#111111] p-8 lg:p-10">
            <div className="grid md:grid-cols-2 gap-5">
              {objections.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="p-5 rounded-2xl border border-white/6 bg-white/3 space-y-2 hover:border-[#C6A75E]/20 transition-colors duration-300">
                    <p className="text-[#F8F6F3]/70 text-sm font-semibold italic">{item.q}</p>
                    <p className="text-[#F8F6F3]/48 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF SECTION — "Live System Proof & Demonstration" ────────────── */}
      <section id="proof" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(198,167,94,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#C6A75E] mb-5">
              Proof
            </span>
            {/* proof_section.title from JSON */}
            <h2 className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
              Live System Proof{' '}
              <span className="italic" style={{
                background: 'linear-gradient(135deg, #C6A75E, #E8D8C3)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>&amp; Demonstration</span>
            </h2>
            <p className="text-[#F8F6F3]/52 text-lg max-w-xl mx-auto leading-[1.72]">
              Real proof from a live system — not slides, not mockups.
            </p>
          </FadeIn>

          {/* Proof assets from ROEA.Evidence */}
          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {proofAssets.map((item, i) => {
              const Icon = item.icon
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div
                    className="relative group card-lift p-7 rounded-2xl border bg-gradient-to-b from-white/4 to-transparent hover:from-white/6 transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{ borderColor: `${item.col}20` }}
                  >
                    <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${item.col}15` }}>
                      <Icon size={22} style={{ color: item.col }} />
                    </div>
                    <h3 className="font-semibold text-[#F8F6F3]/90 mb-2">{item.title}</h3>
                    <p className="text-[#F8F6F3]/45 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>

          {/* Trust badges */}
          <FadeIn>
            <div className="gold-rule mb-10" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trust.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-[#C6A75E]/12 bg-[#C6A75E]/5">
                  <div className="w-9 h-9 rounded-lg bg-[#C6A75E]/12 flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-[#C6A75E]" />
                  </div>
                  <span className="text-sm text-[#F8F6F3]/70">{text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── IMPLEMENTATION PROCESS — 4-week timeline ────────────────────────── */}
      <section id="implementation" className="relative py-28 overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[600px] bg-[radial-gradient(ellipse,rgba(198,167,94,0.07)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#C6A75E] mb-5">
              How It Works
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
              Core System Live in{' '}
              <span className="italic" style={{
                background: 'linear-gradient(135deg, #C6A75E, #E8D8C3)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>72 Hours</span>
            </h2>
            <p className="text-[#F8F6F3]/52 text-lg max-w-xl mx-auto leading-[1.72]">
              Rapid deployment with a structured optimization phase to ensure precision performance. Fully optimized within 7 days.
            </p>
          </FadeIn>

          {/* 4-week timeline from JSON */}
          <div className="relative">
            {/* Vertical gold line */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-[#C6A75E]/40 via-[#C6A75E]/20 to-transparent hidden sm:block" />

            <div className="space-y-5">
              {timeline.map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-8 items-start">
                    {/* Phase indicator */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-14 h-12 rounded-xl bg-[#C6A75E]/12 border border-[#C6A75E]/30 flex items-center justify-center px-1">
                        <span className="text-[#C6A75E] font-bold text-[10px] uppercase tracking-wider text-center leading-tight">{item.week}</span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-5 pt-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-semibold text-[#F8F6F3]/90">{item.title}</h3>
                      </div>
                      <p className="text-[#F8F6F3]/45 text-sm leading-relaxed max-w-lg">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BACKGROUND PATHS — Transition ───────────────────────────────────── */}
      <BackgroundPaths>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#C6A75E] mb-6 block">
            The Opportunity
          </span>
          <h2
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-10 tracking-tight"
            style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}
          >
            {['Stop', 'Losing', 'Revenue'].map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: wordIndex * 0.12 + letterIndex * 0.03,
                      type: 'spring',
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block"
                    style={{
                      background: 'linear-gradient(135deg, #C6A75E 0%, #E8D8C3 60%, #C6A75E 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-xl text-[#F8F6F3]/55 max-w-xl mx-auto leading-[1.72] mb-10"
          >
            Every missed call, every unanswered DM, every slow response is revenue walking out the door.
            Your automated engine is ready.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            <LiquidButton href="#contact" variant="primary">
              Claim Your Spot
              <ArrowRight size={17} />
            </LiquidButton>
          </motion.div>
        </motion.div>
      </BackgroundPaths>

      {/* ── FINAL CTA — "Secure Your Revenue Recovery System" ──────────────── */}
      <section id="contact" className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ShaderAnimation />
          <div className="absolute inset-0 bg-[#111111]/90" />
        </div>
        <Spotlight className="top-0 left-1/2 -translate-x-1/2" fill="#C6A75E" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            {/* framework.A.scarcity_statement: "Private implementation. Limited to one clinic per zip code." */}
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#C6A75E] mb-6">
              Private Implementation — One Clinic Per Zip Code
            </span>

            {/* final_cta.headline from kkk3.json: "Secure Your Revenue Recovery System" */}
            <h2
              className="text-5xl lg:text-6xl xl:text-[68px] font-bold leading-[1.08] mb-8"
              style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}
            >
              Secure Your{' '}
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(135deg, #C6A75E 0%, #E8D8C3 60%, #C6A75E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Revenue Recovery System
              </span>
            </h2>

            <p className="text-[#F8F6F3]/58 text-xl leading-[1.72] mb-4 max-w-2xl mx-auto">
              We implement one system per zip code to protect your competitive advantage.
              Secure your market before a competitor clinic in your area does.
            </p>

            {/* final_cta.note from JSON: "Limited availability per market." */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E87A7A]/10 border border-[#E87A7A]/28 text-[#E87A7A] text-xs font-bold uppercase tracking-widest mb-14">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E87A7A] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E87A7A]" />
              </span>
              Limited Availability Per Market
            </div>

            {/* framework.A.primary_cta: "Book Private Demo" | secondary: "Calculate My Revenue Loss" */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <LiquidButton href="/demo" variant="primary" className="text-base px-10 py-5">
                Book Private Demo
                <ArrowRight size={18} />
              </LiquidButton>
              <LiquidButton href="#roi" variant="secondary">
                Calculate My Revenue Loss
                <Sparkles size={15} />
              </LiquidButton>
            </div>

            <p className="mt-8 text-[#F8F6F3]/28 text-sm">
              No commitment. No sales pressure. Just a clear look at your revenue recovery opportunity.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="relative border-t border-[#C6A75E]/10 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">

            {/* Brand */}
            <div>
              <p
                className="text-xl font-bold mb-1"
                style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}
              >
                <span style={{
                  background: 'linear-gradient(135deg, #C6A75E, #E8D8C3)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Koushik</span>
                {' '}<span className="text-[#F8F6F3]">AI Automation</span>
              </p>
              <p className="text-[#F8F6F3]/38 text-sm">Revenue Infrastructure Partner for Medical Aesthetic Clinics</p>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap gap-8 text-sm text-[#F8F6F3]/35">
              {[['Problem','#problem'],['Solution','#solution'],['ROI','#roi'],['Contact','#contact']].map(([l,h]) => (
                <a key={l} href={h} className="hover:text-[#C6A75E] transition-colors duration-200">{l}</a>
              ))}
            </div>

            {/* Markets */}
            <div className="flex items-center gap-2 text-sm text-[#F8F6F3]/28">
              <Shield size={13} className="text-[#C6A75E]/50" />
              <span>HIPAA-Friendly · US · AU · CA</span>
            </div>
          </div>

          <div className="gold-rule mb-8" />
          <p className="text-center text-[#F8F6F3]/18 text-xs">
            © {new Date().getFullYear()} Koushik AI Automation. MedSpa Revenue Recovery Engine™ — All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
