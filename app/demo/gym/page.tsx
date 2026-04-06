'use client'

import React, { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type Variants,
} from 'framer-motion'
import {
  ArrowRight, CheckCircle2, ChevronDown, Shield, Dumbbell,
  TrendingUp, Users, Zap, Timer, Target, Star, Clock,
  MessageSquare, BarChart3, Brain, Flame, ChevronRight,
  Activity,
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════════════
   BRAND TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */
const C = {
  bg: '#0A0A0F', surface: '#141419', surface2: '#1C1C24',
  accent: '#FF3356', accentH: '#E62B4A', accentSoft: '#FF6B84',
  text: '#F0EDE8', muted: 'rgba(240,237,232,0.50)', dim: 'rgba(240,237,232,0.28)',
  border: 'rgba(255,51,86,0.15)', borderH: 'rgba(255,51,86,0.40)',
  glow: 'rgba(255,51,86,0.18)', glowLg: 'rgba(255,51,86,0.28)',
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const HERO_STATS = [
  { num: '3.2', suffix: 'x', label: 'Avg Booking Increase' },
  { num: '60', suffix: 's', label: 'Lead Response Time', prefix: '<' },
  { num: '89', suffix: '%', label: 'Show-Up Rate' },
  { num: '47', suffix: '%', label: 'Revenue Recovery' },
]

const MARQUEE_ITEMS = [
  'CrossFit Boxes', 'Boutique Studios', 'MMA Gyms', 'Yoga Studios',
  'Personal Training', 'Traditional Gyms', 'Pilates Studios', 'Functional Fitness',
  'Boxing Gyms', 'Cycling Studios', 'Strength Labs', 'Recovery Centers',
]

const PAIN_POINTS = [
  { icon: Clock, title: 'Slow Follow-Ups', desc: 'Leads go cold while your front desk juggles walk-ins, calls, and DMs.' },
  { icon: MessageSquare, title: 'Missed Inquiries', desc: 'Instagram DMs, website forms, missed calls — 40% never get a reply.' },
  { icon: BarChart3, title: 'No Visibility', desc: 'You have no idea how many leads slipped through the cracks last month.' },
]

const FEATURES = [
  { icon: Zap, title: 'Instant AI Response', desc: 'Every lead gets a personalized reply within 60 seconds — 24/7, even at 2 AM.', stat: '60s', statLabel: 'Response' },
  { icon: Brain, title: 'Smart Qualification', desc: 'AI qualifies leads by budget, goals, and timeline — routes hot prospects to your team.', stat: '3x', statLabel: 'Conversion' },
  { icon: Target, title: 'Automated Trial Booking', desc: 'Leads book their trial session automatically. No back-and-forth. No manual scheduling.', stat: '89%', statLabel: 'Show-up' },
]

const STEPS = [
  { num: '01', title: 'Apply Below', desc: 'Fill out the short application so we can understand your gym.' },
  { num: '02', title: 'Strategy Call', desc: 'We analyze your lead flow and show you the exact revenue you\'re missing.' },
  { num: '03', title: 'See It Live', desc: 'Watch the AI respond to a real lead in real-time during your private demo.' },
]

const TESTIMONIALS = [
  { name: 'Arjun M.', role: 'CrossFit Box Owner', text: 'We went from 12 trial bookings/month to 38 in the first 30 days. The AI handles everything overnight.', stars: 5 },
  { name: 'Sarah K.', role: 'Boutique Studio Founder', text: 'I was manually texting every lead. Now I wake up to a full calendar. Game changer.', stars: 5 },
  { name: 'Raj P.', role: 'Gym Chain Manager', text: 'Across 3 locations, we recovered ₹4.2L in revenue from leads we were losing. ROI in week one.', stars: 5 },
]

const LEAD_VOLUME_OPTIONS = ['0–30', '30–75', '75–150', '150+']
const MEMBERSHIP_GROUPS = [
  { label: 'USD', options: ['$30–$60/mo', '$60–$120/mo', '$120–$200/mo', '$200+/mo'] },
  { label: 'INR', options: ['₹1,500–₹3,000/mo', '₹3,000–₹6,000/mo', '₹6,000–₹12,000/mo', '₹12,000+/mo'] },
]
const FOLLOWUP_OPTIONS = ['Front Desk Staff', 'CRM / Software', 'Manual Calls/Texts', 'No Structured Process']
const GYM_TYPE_OPTIONS = ['CrossFit / Functional', 'Traditional Gym', 'Boutique / Studio', 'Personal Training', 'Yoga / Pilates', 'MMA / Combat Sports']

type FormData = {
  gymName: string; websiteUrl: string; gymType: string; leadVolume: string
  membershipValue: string; followupMethod: string; runsAds: string
  isDecisionMaker: string; email: string; phone: string
}
const EMPTY: FormData = {
  gymName: '', websiteUrl: '', gymType: '', leadVolume: '',
  membershipValue: '', followupMethod: '', runsAds: '',
  isDecisionMaker: '', email: '', phone: '',
}

/* ═══════════════════════════════════════════════════════════════════════════
   EFFECT 1 — LOADING SCREEN
   ═══════════════════════════════════════════════════════════════════════════ */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 1800
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(eased * 100)
      if (p < 1) { frame = requestAnimationFrame(tick) }
      else { setTimeout(onComplete, 400) }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onComplete])

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: C.bg }}
    >
      {/* Pulsing icon */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
        style={{ backgroundColor: 'rgba(255,51,86,0.12)', border: `1px solid ${C.border}` }}
      >
        <Dumbbell size={28} style={{ color: C.accent }} />
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-1 rounded-full overflow-hidden mb-4" style={{ backgroundColor: C.surface }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${C.accent}, ${C.accentSoft})`,
            boxShadow: `0 0 20px ${C.glow}`,
          }}
        />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: C.dim }}>
        {Math.round(progress)}%
      </p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EFFECT 2 — CURSOR GLOW
   ═══════════════════════════════════════════════════════════════════════════ */
function CursorGlow() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })

  useEffect(() => {
    function move(e: MouseEvent) { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      className="fixed pointer-events-none z-[90] rounded-full"
      style={{
        x: springX, y: springY,
        width: 400, height: 400,
        translateX: '-50%', translateY: '-50%',
        background: `radial-gradient(circle, rgba(255,51,86,0.07) 0%, rgba(255,51,86,0.02) 40%, transparent 70%)`,
      }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EFFECT 3 — PARTICLE FLOATING SHAPES
   ═══════════════════════════════════════════════════════════════════════════ */
function Particles() {
  const shapes = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 6,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
      type: (['circle', 'square', 'diamond'] as const)[Math.floor(Math.random() * 3)],
      opacity: 0.04 + Math.random() * 0.08,
    }))
  ).current

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {shapes.map(s => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            backgroundColor: C.accent,
            opacity: s.opacity,
            borderRadius: s.type === 'circle' ? '50%' : s.type === 'diamond' ? '2px' : '1px',
            transform: s.type === 'diamond' ? 'rotate(45deg)' : undefined,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, (Math.random() - 0.5) * 60, 0],
            opacity: [s.opacity, s.opacity * 1.5, s.opacity],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EFFECT 4 — FLOATING ORBS (large atmospheric)
   ═══════════════════════════════════════════════════════════════════════════ */
function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{ background: `radial-gradient(circle, ${C.glow} 0%, transparent 70%)` }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,51,86,0.08) 0%, transparent 70%)' }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute bottom-32 left-1/3 w-[300px] h-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,100,130,0.06) 0%, transparent 70%)' }}
        animate={{ x: [0, 20, 0], y: [0, -25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EFFECT 5 — GRAIN OVERLAY
   ═══════════════════════════════════════════════════════════════════════════ */
function Grain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EFFECT 6 — SCROLL-TRIGGERED REVEAL (fade + slide + scale)
   ═══════════════════════════════════════════════════════════════════════════ */
function Reveal({ children, className = '', delay = 0, direction = 'up' }: {
  children: ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'scale'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const variants: Record<string, { opacity: number; y?: number; x?: number; scale?: number }> = {
    up:    { opacity: 0, y: 50 },
    left:  { opacity: 0, x: -50 },
    right: { opacity: 0, x: 50 },
    scale: { opacity: 0, scale: 0.85 },
  }
  const initial = variants[direction]
  return (
    <motion.div ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EFFECT 7 — TEXT SPLIT / REVEAL ANIMATION
   ═══════════════════════════════════════════════════════════════════════════ */
function SplitText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const words = text.split(' ')
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotateX: -80 }}
            animate={inView ? { y: '0%', rotateX: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EFFECT 8 — ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════════════════ */
function Counter({ value, prefix = '', suffix = '', duration = 2 }: {
  value: string; prefix?: string; suffix?: string; duration?: number
}) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const target = parseFloat(value)
    const isDecimal = value.includes('.')
    const start = performance.now()
    function tick(now: number) {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(isDecimal ? (target * eased).toFixed(1) : String(Math.round(target * eased)))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration])
  return <span ref={ref}>{prefix}{display}{suffix}</span>
}

/* ═══════════════════════════════════════════════════════════════════════════
   EFFECT 9 — MAGNETIC HOVER BUTTON
   ═══════════════════════════════════════════════════════════════════════════ */
function MagneticButton({ children, className = '', onClick, type = 'button', disabled = false, style }: {
  children: ReactNode; className?: string; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.2)
    y.set((e.clientY - centerY) * 0.2)
  }

  function handleLeave() { x.set(0); y.set(0) }

  return (
    <motion.button
      ref={ref} type={type} disabled={disabled} onClick={onClick}
      onMouseMove={handleMouse} onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, ...style }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center gap-2.5 font-semibold text-sm tracking-wide
        rounded-xl overflow-hidden transition-shadow duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3356] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {/* Shimmer sweep */}
      <motion.span className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />
      {/* Glow pulse on hover */}
      <span className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 40px ${C.glow}` }}
      />
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </motion.button>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EFFECT 10 — INFINITE MARQUEE TICKER
   ═══════════════════════════════════════════════════════════════════════════ */
function Marquee() {
  return (
    <div className="relative overflow-hidden py-6" style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: `linear-gradient(to right, ${C.bg}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: `linear-gradient(to left, ${C.bg}, transparent)` }} />
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-medium" style={{ color: C.dim }}>
            <Dumbbell size={14} style={{ color: C.accent, opacity: 0.5 }} />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EFFECT 11 — CARD TILT / 3D HOVER
   ═══════════════════════════════════════════════════════════════════════════ */
function TiltCard({ children, className = '', style: styleProp = {} }: {
  children: ReactNode; className?: string; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 20 })

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    rotateX.set((e.clientY - centerY) / rect.height * -10)
    rotateY.set((e.clientX - centerX) / rect.width * 10)
  }

  function handleLeave() { rotateX.set(0); rotateY.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse} onMouseLeave={handleLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800, ...styleProp }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION DIVIDER (smooth gradient transition)
   ═══════════════════════════════════════════════════════════════════════════ */
function SectionTransition() {
  return (
    <div className="relative h-24 pointer-events-none">
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${C.bg}, rgba(20,20,25,0.5), ${C.bg})` }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px" style={{ background: `linear-gradient(to right, transparent, ${C.accent}40, transparent)` }} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FORM FIELDS
   ═══════════════════════════════════════════════════════════════════════════ */
function GymInput({ label, value, onChange, type = 'text', placeholder, required, error }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; error?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-[0.15em] font-semibold" style={{ color: C.accent }}>
        {label}{required && <span className="ml-0.5">*</span>}
      </label>
      <input type={type} required={required} value={value} placeholder={placeholder ?? ''}
        onChange={e => onChange(e.target.value)}
        className="rounded-lg px-4 py-3 text-sm transition-all duration-200 focus:outline-none"
        style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, color: C.text }}
        onFocus={e => { e.target.style.borderColor = C.borderH; e.target.style.boxShadow = `0 0 0 3px ${C.glow}` }}
        onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none' }}
      />
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs" style={{ color: C.accent }}>{error}</motion.p>}
      </AnimatePresence>
    </div>
  )
}

function GymSelect({ label, value, options, onChange, required, error }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void; required?: boolean; error?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-[0.15em] font-semibold" style={{ color: C.accent }}>
        {label}{required && <span className="ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select required={required} value={value} onChange={e => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg px-4 py-3 text-sm cursor-pointer transition-all duration-200 focus:outline-none"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, color: C.text }}
          onFocus={e => { e.target.style.borderColor = C.borderH; e.target.style.boxShadow = `0 0 0 3px ${C.glow}` }}
          onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none' }}
        >
          <option value="" disabled style={{ color: C.dim }}>Select...</option>
          {options.map(o => <option key={o} value={o} style={{ backgroundColor: C.surface, color: C.text }}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.accent }} />
      </div>
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs" style={{ color: C.accent }}>{error}</motion.p>}
      </AnimatePresence>
    </div>
  )
}

function GymGroupedSelect({ label, value, groups, onChange, required, error }: {
  label: string; value: string; groups: { label: string; options: string[] }[]; onChange: (v: string) => void; required?: boolean; error?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-[0.15em] font-semibold" style={{ color: C.accent }}>
        {label}{required && <span className="ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select required={required} value={value} onChange={e => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg px-4 py-3 text-sm cursor-pointer transition-all duration-200 focus:outline-none"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, color: C.text }}
          onFocus={e => { e.target.style.borderColor = C.borderH; e.target.style.boxShadow = `0 0 0 3px ${C.glow}` }}
          onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none' }}
        >
          <option value="" disabled>Select...</option>
          {groups.map(g => (
            <optgroup key={g.label} label={g.label} style={{ backgroundColor: C.surface, color: C.accent }}>
              {g.options.map(o => <option key={o} value={o} style={{ backgroundColor: C.surface, color: C.text }}>{o}</option>)}
            </optgroup>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.accent }} />
      </div>
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs" style={{ color: C.accent }}>{error}</motion.p>}
      </AnimatePresence>
    </div>
  )
}

function GymRadio({ label, value, options, onChange, required, error }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void; required?: boolean; error?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] uppercase tracking-[0.15em] font-semibold" style={{ color: C.accent }}>
        {label}{required && <span className="ml-0.5">*</span>}
      </label>
      <div className="flex gap-3">
        {options.map(o => (
          <motion.button key={o} type="button" onClick={() => onChange(o)} whileTap={{ scale: 0.96 }}
            className="flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3356]"
            style={{
              backgroundColor: value === o ? 'rgba(255,51,86,0.12)' : C.surface,
              border: `1px solid ${value === o ? C.accent : C.border}`,
              color: value === o ? C.accent : C.muted,
              boxShadow: value === o ? `0 0 16px ${C.glow}` : 'none',
            }}
          >{o}</motion.button>
        ))}
      </div>
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs" style={{ color: C.accent }}>{error}</motion.p>}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ██   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function GymLandingPage() {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [form, setForm] = useState<FormData>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  const handleLoaded = useCallback(() => setLoaded(true), [])

  function set<K extends keyof FormData>(key: K) {
    return (val: string) => {
      setForm(prev => ({ ...prev, [key]: val }))
      if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
    }
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.gymName.trim()) e.gymName = 'Required'
    if (!form.gymType) e.gymType = 'Required'
    if (!form.leadVolume) e.leadVolume = 'Required'
    if (!form.membershipValue) e.membershipValue = 'Required'
    if (!form.followupMethod) e.followupMethod = 'Required'
    if (!form.runsAds) e.runsAds = 'Required'
    if (!form.isDecisionMaker) e.isDecisionMaker = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    if (!form.phone.trim()) e.phone = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbw2i98DeecOk6dWKZGOiyYiSedv19KrAGFLfAhy-eVok8WC6WJs2Fp86jMH2gKfrNvAqw/exec',
        { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, source: 'gym-demo' }) }
      )
    } catch { /* continue */ }
    sessionStorage.setItem('demo_applicant', JSON.stringify(form))
    router.push('/demo/calendar')
  }

  const fc: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }
  const fi: Variants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

  return (
    <>
      {/* LOADING SCREEN */}
      <AnimatePresence>{!loaded && <LoadingScreen onComplete={handleLoaded} />}</AnimatePresence>

      <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: C.bg, color: C.text, fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>
        <CursorGlow />
        <FloatingOrbs />
        <Particles />
        <Grain />

        {/* ══ TOP BAR ═══════════════════════════════════════════════════════ */}
        <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${C.accent}, transparent)` }} />

        {/* ══ NAV ════════════════════════════════════════════════════════════ */}
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="px-6 py-5 flex items-center justify-between max-w-7xl mx-auto relative z-20"
        >
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,51,86,0.12)', border: `1px solid ${C.border}` }}
            >
              <Dumbbell size={16} style={{ color: C.accent }} />
            </motion.div>
            <span className="font-semibold text-sm tracking-wide" style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)' }}>
              Gym <span style={{ color: C.accent }}>AI</span> Growth
            </span>
          </div>
          <MagneticButton className="text-xs tracking-widest uppercase px-5 py-2.5"
            style={{ color: C.accent, border: `1px solid ${C.border}`, background: 'transparent' } as React.CSSProperties}
            onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
          >Apply Now</MagneticButton>
        </motion.nav>

        {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
          {/* Spotlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at center, ${C.glow} 0%, transparent 65%)` }}
          />

          {/* Parallax floating shapes */}
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]), backgroundColor: C.accent }}
            className="absolute top-20 left-[10%] w-3 h-3 rounded-full pointer-events-none"
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]), backgroundColor: C.accent, borderRadius: '2px', transform: 'rotate(45deg)' }}
            className="absolute top-40 right-[15%] w-4 h-4 pointer-events-none"
            animate={{ rotate: [0, 180, 360], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -140]), backgroundColor: C.accentSoft }}
            className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full pointer-events-none"
            animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            className="max-w-5xl mx-auto px-6 text-center relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ border: `1px solid ${C.border}`, backgroundColor: 'rgba(255,51,86,0.06)' }}
            >
              <motion.span className="w-2 h-2 rounded-full" style={{ backgroundColor: C.accent }}
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: C.accent }}>
                AI-Powered Member Acquisition
              </span>
            </motion.div>

            {/* Split text headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] mb-6 font-bold"
              style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)', letterSpacing: '-0.025em' }}
            >
              <SplitText text="Stop Losing Leads." delay={0.4} />
              <br />
              <span style={{
                background: `linear-gradient(135deg, ${C.accent} 0%, ${C.accentSoft} 50%, ${C.accent} 100%)`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientShift 4s ease infinite',
              }}>
                <SplitText text="Start Filling Your Gym." delay={0.7} />
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-base lg:text-lg leading-[1.7] max-w-2xl mx-auto mb-10"
              style={{ color: C.muted }}
            >
              AI automation that responds to every gym inquiry in under 60 seconds,
              books trial sessions automatically, and recovers the revenue you&apos;re leaving on the table.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <MagneticButton
                className="px-8 py-4 text-base"
                onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="absolute inset-0 rounded-xl" style={{ background: `linear-gradient(135deg, ${C.accent} 0%, #CC2944 100%)`, zIndex: -1 }} />
                <Flame size={18} />
                Book Your Free Demo
                <ArrowRight size={16} />
              </MagneticButton>
              <span className="text-xs" style={{ color: C.dim }}>No commitment required</span>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {HERO_STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.1 * i} direction="scale">
                  <TiltCard
                    className="rounded-xl p-5 text-center"
                    style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, boxShadow: `0 0 24px ${C.glow}` }}
                  >
                    <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)', color: C.accent }}>
                      <Counter value={s.num} prefix={s.prefix} suffix={s.suffix} />
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: C.dim }}>{s.label}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══ MARQUEE ════════════════════════════════════════════════════════ */}
        <Marquee />

        <SectionTransition />

        {/* ══ PAIN POINTS ════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 relative z-10">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal className="text-center mb-14">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-4 block" style={{ color: C.accent }}>
                The Problem
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold leading-[1.15]" style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)' }}>
                <SplitText text="Your Gym Is" />
                {' '}<span style={{ color: C.accent }}><SplitText text="Leaking Revenue" delay={0.3} /></span>
                {' '}<SplitText text="Every Day" delay={0.5} />
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {PAIN_POINTS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.12} direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}>
                  <TiltCard
                    className="rounded-2xl p-7 h-full group"
                    style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, transition: 'box-shadow 0.3s' }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${C.glow} 0%, transparent 60%)` }}
                    />
                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: 'rgba(255,51,86,0.1)', border: `1px solid ${C.border}` }}
                      >
                        <p.icon size={22} style={{ color: C.accent }} />
                      </motion.div>
                      <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)' }}>{p.title}</h3>
                      <p className="text-sm leading-[1.7]" style={{ color: C.muted }}>{p.desc}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <SectionTransition />

        {/* ══ FEATURES ═══════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 relative z-10">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal className="text-center mb-14">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-4 block" style={{ color: C.accent }}>The Solution</span>
              <h2 className="text-3xl lg:text-4xl font-bold leading-[1.15]" style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)' }}>
                AI That <span style={{ color: C.accent }}>Never Sleeps</span>, Never Misses a Lead
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.12} direction="scale">
                  <TiltCard
                    className="rounded-2xl p-7 h-full group relative overflow-hidden"
                    style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${C.glow} 0%, transparent 60%)` }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300 }}
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(255,51,86,0.1)', border: `1px solid ${C.border}` }}
                        >
                          <f.icon size={22} style={{ color: C.accent }} />
                        </motion.div>
                        <div className="text-right">
                          <p className="text-xl font-bold" style={{ color: C.accent, fontFamily: 'var(--font-playfair, Playfair Display, serif)' }}>{f.stat}</p>
                          <p className="text-[9px] uppercase tracking-widest" style={{ color: C.dim }}>{f.statLabel}</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)' }}>{f.title}</h3>
                      <p className="text-sm leading-[1.7]" style={{ color: C.muted }}>{f.desc}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <SectionTransition />

        {/* ══ HOW IT WORKS ═══════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <Reveal className="text-center mb-14">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-4 block" style={{ color: C.accent }}>How It Works</span>
              <h2 className="text-3xl lg:text-4xl font-bold leading-[1.15]" style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)' }}>
                Three Steps to a <span style={{ color: C.accent }}>Full Gym</span>
              </h2>
            </Reveal>

            <div className="space-y-5">
              {STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 0.15} direction={i % 2 === 0 ? 'left' : 'right'}>
                  <motion.div
                    whileHover={{ x: 12, boxShadow: `0 0 40px ${C.glow}` }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-6 rounded-2xl p-6 lg:p-8 group cursor-default"
                    style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-bold text-lg"
                      style={{
                        background: `linear-gradient(135deg, rgba(255,51,86,0.15), rgba(255,51,86,0.05))`,
                        border: `1px solid ${C.border}`,
                        color: C.accent,
                        fontFamily: 'var(--font-playfair, Playfair Display, serif)',
                      }}
                    >{s.num}</motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)' }}>{s.title}</h3>
                      <p className="text-sm leading-[1.7]" style={{ color: C.muted }}>{s.desc}</p>
                    </div>
                    <ChevronRight size={20} className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: C.accent }} />
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <SectionTransition />

        {/* ══ TESTIMONIALS ═══════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 relative z-10">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal className="text-center mb-14">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-4 block" style={{ color: C.accent }}>Results</span>
              <h2 className="text-3xl lg:text-4xl font-bold leading-[1.15]" style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)' }}>
                Gym Owners <span style={{ color: C.accent }}>Love the Results</span>
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.12} direction="scale">
                  <TiltCard
                    className="rounded-2xl p-7 h-full flex flex-col"
                    style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
                  >
                    <div className="flex items-center gap-0.5 mb-4">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <motion.div key={j} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }} transition={{ delay: 0.3 + j * 0.08, type: 'spring', stiffness: 300 }}>
                          <Star size={14} style={{ color: C.accent }} fill={C.accent} />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm leading-[1.75] flex-1 mb-5" style={{ color: C.muted }}>
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,51,86,0.1)' }}>
                        <Activity size={14} style={{ color: C.accent }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-[11px]" style={{ color: C.dim }}>{t.role}</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <SectionTransition />

        {/* ══ APPLICATION FORM ═══════════════════════════════════════════════ */}
        <section id="apply" className="py-16 lg:py-24 relative z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at center, ${C.glow} 0%, transparent 70%)` }}
          />
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <Reveal className="text-center mb-12">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-4 block" style={{ color: C.accent }}>Limited Spots</span>
              <h2 className="text-3xl lg:text-4xl font-bold leading-[1.15] mb-4" style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)' }}>
                Apply for Your <span style={{ color: C.accent }}>Free Private Demo</span>
              </h2>
              <p className="text-sm leading-[1.7] max-w-lg mx-auto" style={{ color: C.muted }}>
                We only take on a limited number of gyms per month. Fill out the application below.
              </p>
            </Reveal>

            <Reveal direction="scale">
              <motion.form onSubmit={handleSubmit} variants={fc} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                className="rounded-2xl p-8 lg:p-10 space-y-6"
                style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, boxShadow: `0 0 0 1px ${C.border}, 0 8px 48px ${C.glowLg}` }}
              >
                <motion.div variants={fi} className="pb-5 flex items-center gap-3" style={{ borderBottom: `1px solid ${C.border}` }}>
                  <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,51,86,0.1)', border: `1px solid ${C.border}` }}>
                    <Dumbbell size={18} style={{ color: C.accent }} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)' }}>Gym Application</h3>
                    <p className="text-xs" style={{ color: C.dim }}>Takes less than 2 minutes</p>
                  </div>
                </motion.div>

                <motion.div variants={fi} className="grid sm:grid-cols-2 gap-5">
                  <GymInput label="Gym / Studio Name" value={form.gymName} onChange={set('gymName')} placeholder="Elite Performance Fitness" required error={errors.gymName} />
                  <GymInput label="Website (Optional)" value={form.websiteUrl} onChange={set('websiteUrl')} placeholder="www.yourgym.com" />
                </motion.div>

                <motion.div variants={fi}>
                  <GymSelect label="Type of Gym / Studio" value={form.gymType} options={GYM_TYPE_OPTIONS} onChange={set('gymType')} required error={errors.gymType} />
                </motion.div>

                <motion.div variants={fi} className="grid sm:grid-cols-2 gap-5">
                  <GymSelect label="Monthly New Inquiries" value={form.leadVolume} options={LEAD_VOLUME_OPTIONS} onChange={set('leadVolume')} required error={errors.leadVolume} />
                  <GymGroupedSelect label="Avg Membership Value" value={form.membershipValue} groups={MEMBERSHIP_GROUPS} onChange={set('membershipValue')} required error={errors.membershipValue} />
                </motion.div>

                <motion.div variants={fi}>
                  <GymSelect label="Current Lead Follow-up" value={form.followupMethod} options={FOLLOWUP_OPTIONS} onChange={set('followupMethod')} required error={errors.followupMethod} />
                </motion.div>

                <motion.div variants={fi} className="grid sm:grid-cols-2 gap-5">
                  <GymRadio label="Running Paid Ads?" value={form.runsAds} options={['Yes', 'No']} onChange={set('runsAds')} required error={errors.runsAds} />
                  <GymRadio label="Decision Maker?" value={form.isDecisionMaker} options={['Yes', 'Partner Involved']} onChange={set('isDecisionMaker')} required error={errors.isDecisionMaker} />
                </motion.div>

                <motion.div variants={fi} className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${C.border}, transparent)` }} />

                <motion.div variants={fi} className="grid sm:grid-cols-2 gap-5">
                  <GymInput label="Business Email" value={form.email} onChange={set('email')} type="email" placeholder="you@yourgym.com" required error={errors.email} />
                  <div>
                    <GymInput label="Phone Number" value={form.phone} onChange={set('phone')} type="tel" placeholder="+91 98765 43210" required error={errors.phone} />
                    <p className="text-[10px] mt-1.5" style={{ color: C.dim }}>Include country code: +91 (India) · +1 (US)</p>
                  </div>
                </motion.div>

                <motion.div variants={fi}>
                  <MagneticButton type="submit" disabled={submitting}
                    className="w-full py-4 text-white"
                  >
                    <span className="absolute inset-0 rounded-xl" style={{ background: `linear-gradient(135deg, ${C.accent} 0%, #CC2944 100%)`, zIndex: -1,
                      boxShadow: `0 0 0 1px rgba(255,51,86,0.4), 0 4px 24px ${C.glow}, inset 0 1px 0 rgba(255,255,255,0.15)` }} />
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                        Reviewing...
                      </>
                    ) : (
                      <>
                        <Flame size={18} />
                        Apply for Private Demo
                        <ArrowRight size={16} />
                      </>
                    )}
                  </MagneticButton>
                </motion.div>

                <motion.div variants={fi} className="flex items-center justify-center gap-2">
                  <Shield size={12} style={{ color: C.dim }} />
                  <p className="text-[10px] tracking-wide" style={{ color: C.dim }}>Your information is kept strictly confidential.</p>
                </motion.div>
              </motion.form>
            </Reveal>
          </div>
        </section>

        {/* ══ FINAL CTA ═════════════════════════════════════════════════════ */}
        <section className="py-20 relative z-10">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 100%, rgba(255,51,86,0.06) 0%, transparent 60%)` }}
          />
          <Reveal className="max-w-2xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair, Playfair Display, serif)' }}>
              Ready to Fill Every Time Slot?
            </h2>
            <p className="text-sm mb-8 leading-[1.7]" style={{ color: C.muted }}>
              Join the gyms that stopped losing leads and started growing on autopilot.
            </p>
            <MagneticButton className="px-8 py-4 text-base text-white"
              onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="absolute inset-0 rounded-xl" style={{ background: `linear-gradient(135deg, ${C.accent} 0%, #CC2944 100%)`, zIndex: -1,
                boxShadow: `0 0 0 1px rgba(255,51,86,0.4), 0 4px 24px ${C.glow}` }} />
              <Flame size={18} />
              Get Started Now
              <ArrowRight size={16} />
            </MagneticButton>
          </Reveal>
        </section>

        {/* Bottom bar */}
        <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${C.accent}, transparent)` }} />
        <footer className="py-8 text-center relative z-10">
          <p className="text-[11px] tracking-wide" style={{ color: C.dim }}>Gym AI Growth · AI-Powered Member Acquisition</p>
        </footer>
      </div>
    </>
  )
}
