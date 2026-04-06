"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextScramble } from "@/components/ui/text-scramble"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PricingSection } from "@/components/ui/pricing-section"
import { type PricingTier } from "@/components/ui/pricing-card"
import {
  Dumbbell,
  Flame,
  Zap,
  Shield,
  Clock,
  Users,
  Star,
  ChevronRight,
  ArrowRight,
  Trophy,
  Heart,
  Activity,
} from "lucide-react"

// ── Types ───────────────────────────────────────────────────────────────────
type Theme = "obsidian" | "crimson" | "sapphire" | "emerald"

interface GymTheme {
  label: string
  accent: string
  accentHover: string
  glow: string
  gradient: string
  bg: string
  card: string
}

const THEMES: Record<Theme, GymTheme> = {
  obsidian: {
    label: "Obsidian",
    accent: "#C6A75E",
    accentHover: "#A88A45",
    glow: "rgba(198,167,94,0.25)",
    gradient: "linear-gradient(135deg,#C6A75E,#8B6914)",
    bg: "#0A0A0A",
    card: "#111111",
  },
  crimson: {
    label: "Crimson",
    accent: "#E53E3E",
    accentHover: "#C53030",
    glow: "rgba(229,62,62,0.25)",
    gradient: "linear-gradient(135deg,#E53E3E,#742A2A)",
    bg: "#0A0505",
    card: "#130808",
  },
  sapphire: {
    label: "Sapphire",
    accent: "#4299E1",
    accentHover: "#2B6CB0",
    glow: "rgba(66,153,225,0.25)",
    gradient: "linear-gradient(135deg,#4299E1,#1A365D)",
    bg: "#030A12",
    card: "#060F1A",
  },
  emerald: {
    label: "Emerald",
    accent: "#48BB78",
    accentHover: "#276749",
    glow: "rgba(72,187,120,0.25)",
    gradient: "linear-gradient(135deg,#48BB78,#1C4532)",
    bg: "#030A06",
    card: "#060F09",
  },
}

// ── Pricing tiers ────────────────────────────────────────────────────────────
const GYM_TIERS: PricingTier[] = [
  {
    name: "Ignite",
    price: { monthly: 49, yearly: 39 },
    description: "Everything you need to start your transformation.",
    features: [
      "Full gym floor access",
      "2 group classes / week",
      "Locker room access",
      "Fitness assessment",
    ],
    cta: "Start Ignite",
  },
  {
    name: "Elite",
    price: { monthly: 99, yearly: 79 },
    description: "For serious athletes who demand more.",
    features: [
      "Everything in Ignite",
      "Unlimited group classes",
      "1 PT session / month",
      "Recovery suite access",
      "Nutrition guide",
    ],
    cta: "Go Elite",
    popular: true,
  },
  {
    name: "Apex",
    price: { monthly: 199, yearly: 159 },
    description: "The ultimate performance experience.",
    features: [
      "Everything in Elite",
      "4 PT sessions / month",
      "Custom training plan",
      "Priority booking",
      "Guest passes (2/mo)",
      "Supplement starter kit",
    ],
    cta: "Join Apex",
    highlighted: true,
  },
  {
    name: "Corporate",
    price: { monthly: "Custom", yearly: "Custom" },
    description: "Tailored packages for teams and companies.",
    features: [
      "Flexible member seats",
      "Dedicated account manager",
      "On-site wellness events",
      "Analytics dashboard",
    ],
    cta: "Contact Sales",
  },
]

// ── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "12K+", label: "Active Members" },
  { value: "98%", label: "Retention Rate" },
  { value: "200+", label: "Classes / Month" },
  { value: "15+", label: "Elite Coaches" },
]

// ── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Dumbbell,
    title: "World-Class Equipment",
    body: "Over 500 premium machines, free weights, and functional training rigs. Updated every 18 months.",
  },
  {
    icon: Zap,
    title: "High-Performance Training",
    body: "HIIT, powerlifting, Olympic lifting, and sport-specific programs built by elite coaches.",
  },
  {
    icon: Heart,
    title: "Recovery Suite",
    body: "Infrared saunas, ice baths, compression therapy, and sports massage — all under one roof.",
  },
  {
    icon: Activity,
    title: "Progress Tracking",
    body: "Real-time body composition scans and biometric monitoring so you always know your numbers.",
  },
  {
    icon: Users,
    title: "Exclusive Community",
    body: "Join a tight-knit tribe of high-achievers. Private events, challenges, and accountability groups.",
  },
  {
    icon: Shield,
    title: "24 / 7 Access",
    body: "Your schedule, your rules. Keycard access around the clock — no waiting, no crowds.",
  },
]

// ── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Is there a joining fee?",
    a: "No joining fees. Ever. Pick your plan, activate today, and we'll waive every onboarding charge.",
  },
  {
    q: "Can I freeze my membership?",
    a: "Yes — freeze up to 3 months per year at no cost. Just give us 48 hours notice.",
  },
  {
    q: "Do I need prior experience?",
    a: "Absolutely not. Every new member receives a complimentary fitness assessment and a personalised starter program.",
  },
  {
    q: "What's included in the Recovery Suite?",
    a: "Infrared saunas, cold plunge pools, normatec compression boots, foam rolling stations, and on-demand sports massage bookings.",
  },
  {
    q: "Are personal training sessions transferable?",
    a: "PT sessions on Elite and Apex plans roll over month-to-month and can be gifted to a guest.",
  },
]

// ── Component ────────────────────────────────────────────────────────────────
export default function GymLandingPage() {
  const [theme, setTheme] = React.useState<Theme>("obsidian")
  const t = THEMES[theme]

  return (
    <div
      style={{ background: t.bg, color: "#F8F6F3" }}
      className="min-h-screen font-sans overflow-x-hidden transition-colors duration-700"
    >
      {/* ── Grain overlay ────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Ambient radial glow ──────────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${t.glow} 0%, transparent 70%)`,
        }}
      />

      {/* ════════════════════════════════════════════════════════════════════
          NAV
      ════════════════════════════════════════════════════════════════════ */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-5 md:px-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ background: t.gradient }}
          >
            <Flame className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            APEX<span style={{ color: t.accent }}>·</span>ELITE
          </span>
        </motion.div>

        {/* Nav links */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden items-center gap-8 md:flex"
        >
          {["Features", "Pricing", "FAQ"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            className="rounded-full px-5 py-2 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: t.gradient,
              boxShadow: `0 0 0 1px ${t.accentHover}, 0 4px 20px ${t.glow}`,
            }}
          >
            Get Started
          </button>
        </motion.div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════════
          THEME SWITCHER
      ════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-40 flex justify-center pb-2"
      >
        <div
          className="flex items-center gap-1.5 rounded-full px-3 py-2"
          style={{ background: `${t.card}cc`, border: `1px solid ${t.accent}22` }}
        >
          <span className="mr-1.5 text-xs font-medium text-white/40">Theme</span>
          {(Object.entries(THEMES) as [Theme, GymTheme][]).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              title={val.label}
              className="h-5 w-5 rounded-full transition-all duration-200 hover:scale-125"
              style={{
                background: val.gradient,
                outline: theme === key ? `2px solid ${val.accent}` : "none",
                outlineOffset: "2px",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 flex min-h-[88vh] flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ borderColor: `${t.accent}40`, color: t.accent }}
          >
            <Trophy className="h-3 w-3" />
            <AnimatedShinyText className="text-xs font-semibold uppercase tracking-widest">
              London&apos;s #1 Luxury Fitness Club
            </AnimatedShinyText>
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl font-black leading-none tracking-tighter text-white md:text-8xl lg:text-[9rem]"
        >
          WHERE
          <br />
          <TextScramble
            duration={1.2}
            speed={0.03}
            className="inline-block"
            style={{ color: t.accent }}
          >
            LEGENDS
          </TextScramble>
          <br />
          ARE FORGED
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-white/55 md:text-lg"
        >
          Premium equipment. Elite coaching. An obsessive culture of excellence.
          Choose your plan. Transform your body. Elevate your life.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <button
            className="flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-black transition-all duration-200 hover:scale-[1.04] hover:brightness-110 active:scale-[0.97]"
            style={{
              background: t.gradient,
              boxShadow: `0 4px 32px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`,
            }}
          >
            Claim Free Trial <ArrowRight className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:text-white">
            View Plans <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 flex items-center gap-2"
        >
          <div className="flex -space-x-2">
            {["BF", "AK", "RM", "JD", "SL"].map((initials) => (
              <div
                key={initials}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[10px] font-bold text-white"
                style={{ background: t.card }}
              >
                {initials}
              </div>
            ))}
          </div>
          <div className="ml-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-white/40">
              Loved by <strong className="text-white/70">12,000+</strong> members
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="h-8 w-5 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: t.accent }}
              />
            </div>
            <span className="text-[9px] uppercase tracking-widest text-white/25">Scroll</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16">
        <div
          className="mx-auto max-w-5xl rounded-2xl px-8 py-10"
          style={{
            background: t.card,
            border: `1px solid ${t.accent}18`,
            boxShadow: `0 0 60px ${t.glow}20`,
          }}
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <p
                  className="font-display text-4xl font-black tracking-tight"
                  style={{ color: t.accent }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/45">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════════════════════════════════ */}
      <section id="features" className="relative z-10 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <div className="mb-16 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: t.accent }}
            >
              The Apex Experience
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl font-black tracking-tight text-white md:text-5xl"
            >
              Built for those who
              <br />
              <span style={{ color: t.accent }}>refuse to settle</span>
            </motion.h2>
          </div>

          {/* Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl p-6 transition-shadow duration-300"
                style={{
                  background: t.card,
                  border: `1px solid ${t.accent}14`,
                  boxShadow: `0 2px 20px rgba(0,0,0,0.3)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 40px ${t.glow}40, 0 0 0 1px ${t.accent}30`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 2px 20px rgba(0,0,0,0.3)`
                }}
              >
                {/* Accent corner glow */}
                <div
                  className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, ${t.glow} 0%, transparent 70%)`,
                    transform: "translate(30%, -30%)",
                  }}
                />
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `${t.accent}18` }}
                >
                  <feat.icon className="h-5 w-5" style={{ color: t.accent }} />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-white">
                  {feat.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">{feat.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FULL-WIDTH PROMO BANNER
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 overflow-hidden py-16">
        <div
          className="mx-4 flex flex-col items-center justify-between gap-6 rounded-3xl px-10 py-14 md:mx-12 md:flex-row"
          style={{
            background: t.gradient,
            boxShadow: `0 20px 80px ${t.glow}50`,
          }}
        >
          {/* Dot grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">
              Limited Time Offer
            </p>
            <h3 className="mt-1 font-display text-3xl font-black text-white md:text-4xl">
              7 Days. No Strings.
            </h3>
            <p className="mt-2 text-white/75">
              Try Apex Elite free for a week — full access, zero commitment.
            </p>
          </div>
          <button className="relative z-10 flex-shrink-0 rounded-full bg-white px-8 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-[1.04] hover:bg-white/90 active:scale-[0.97]"
            style={{ color: t.accentHover }}
          >
            Claim Free Trial
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="relative z-10 px-6 py-24 md:px-12">
        <PricingSection
          title="Choose Your Path"
          subtitle="Transparent pricing. No contracts. Cancel anytime."
          tiers={GYM_TIERS}
          frequencies={["monthly", "yearly"]}
        />
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          TESTIMONIALS (quick strip)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                quote:
                  "I've been to gyms across three continents. Apex Elite is on another level — the coaching, the recovery suite, the community.",
                name: "James R.",
                role: "Elite Member · 2 yrs",
              },
              {
                quote:
                  "Lost 22kg in 6 months. The personal training and nutrition support made the difference. I'm a completely different person.",
                name: "Priya S.",
                role: "Apex Member · 8 mo",
              },
              {
                quote:
                  "Our entire team joined on the Corporate plan. The analytics dashboard and on-site events have been incredible for culture.",
                name: "Marcus T.",
                role: "HR Director · Corporate",
              },
            ].map((t_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6"
                style={{
                  background: t.card,
                  border: `1px solid ${t.accent}14`,
                }}
              >
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-white/65 italic">
                  &quot;{t_.quote}&quot;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: t.gradient, color: "white" }}
                  >
                    {t_.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t_.name}</p>
                    <p className="text-xs text-white/40">{t_.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="relative z-10 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: t.accent }}
            >
              Got Questions?
            </p>
            <h2 className="font-display text-4xl font-black tracking-tight text-white">
              Frequently Asked
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl px-5"
                style={{
                  background: t.card,
                  border: `1px solid ${t.accent}14`,
                }}
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-white hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-white/55">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-32 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <p
            className="mb-4 text-xs font-bold uppercase tracking-widest"
            style={{ color: t.accent }}
          >
            The Time Is Now
          </p>
          <h2 className="font-display text-5xl font-black leading-none tracking-tighter text-white md:text-7xl">
            Your best self
            <br />
            <span style={{ color: t.accent }}>starts today.</span>
          </h2>
          <p className="mt-6 text-white/50">
            Join 12,000+ members already living the Apex Elite life.
            No contracts, no excuses.
          </p>
          <button
            className="mt-10 flex items-center gap-2 rounded-full px-10 py-4 text-base font-bold text-black transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] mx-auto"
            style={{
              background: t.gradient,
              boxShadow: `0 8px 40px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
            }}
          >
            Start Your Free Trial <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t px-6 py-10 text-center md:px-12" style={{ borderColor: `${t.accent}15` }}>
        <div className="flex items-center justify-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-md"
            style={{ background: t.gradient }}
          >
            <Flame className="h-3 w-3 text-white" />
          </div>
          <span className="font-display text-sm font-bold text-white">
            APEX<span style={{ color: t.accent }}>·</span>ELITE
          </span>
        </div>
        <p className="mt-3 text-xs text-white/25">
          © {new Date().getFullYear()} Apex Elite Ltd. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
