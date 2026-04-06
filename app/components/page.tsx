"use client"

import React, { useState, useRef, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Star,
  ArrowRight,
  Home,
  Users,
  Heart,
  Sparkles,
  Shield,
  Zap,
  Award,
  Calendar,
  Eye,
  Check,
  Mail,
  ChevronDown,
  Target,
  Layers,
  Globe,
  Send,
} from "lucide-react"

// ── All UI Components ────────────────────────────────────────────────────────
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  NoisePatternCard,
  NoisePatternCardBody,
} from "@/components/ui/card-with-noise-patter"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { FeyButton } from "@/components/ui/fey-button"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import HeroText from "@/components/ui/hero-shutter-text"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { Label } from "@/components/ui/label"
import { LiquidButton as LiquidButtonOriginal } from "@/components/ui/liquid-button"
import { LiquidButton as LiquidGlassButton } from "@/components/ui/liquid-glass-button"
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon"
import { Button as NeonButton } from "@/components/ui/neon-button"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ShaderAnimation } from "@/components/ui/shader-animation"
import { ShaderAnimation as ShaderLines } from "@/components/ui/shader-lines"
import { GoldShinyButton } from "@/components/ui/shiny-button"
import { CanvasRevealEffect } from "@/components/ui/sign-in-flow-1"
import { Spotlight } from "@/components/ui/spotlight"
import { TextScramble } from "@/components/ui/text-scramble"
import { NavBar } from "@/components/ui/tubelight-navbar"

// ── Theme ────────────────────────────────────────────────────────────────────
const C = {
  gold: "#C6A75E",
  goldHover: "#A88A45",
  goldLight: "#D4C48A",
  bg: "#0A0A0B",
  bgCard: "#141414",
  bgElevated: "#1A1A1A",
  border: "#252525",
  text: "#F5F0EB",
  muted: "#8A8078",
  subtle: "#5A5550",
}

// ── Full-Screen Section ──────────────────────────────────────────────────────
function FullSection({
  num,
  title,
  description,
  children,
  dark = true,
  noPadding = false,
}: {
  num: number
  title: string
  description: string
  children: React.ReactNode
  dark?: boolean
  noPadding?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: dark ? C.bg : C.bgCard,
        borderBottom: `1px solid ${C.border}`,
        overflow: "visible",
      }}
    >
      {/* Label overlay */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          zIndex: 50,
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            fontWeight: 800,
            color: C.gold,
            lineHeight: 1,
            opacity: 0.15,
          }}
        >
          {String(num).padStart(2, "0")}
        </span>
        <div style={{ paddingTop: 8 }}>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              fontWeight: 700,
              color: C.text,
              letterSpacing: "-0.02em",
              marginBottom: 4,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
              color: C.muted,
              maxWidth: 400,
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        </div>
      </motion.div>

      {/* Component area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: noPadding ? 0 : "120px 48px 48px",
          width: "100%",
        }}
      >
        {children}
      </motion.div>
    </section>
  )
}

// ── Pricing data ─────────────────────────────────────────────────────────────
const demoPricingTier: PricingTier = {
  name: "Professional",
  price: { monthly: 99, yearly: 990 },
  description: "For growing businesses",
  features: [
    "Unlimited projects",
    "Priority 24/7 support",
    "Custom integrations",
    "Advanced analytics dashboard",
    "Team collaboration tools",
    "API access",
  ],
  cta: "Get Started",
  highlighted: true,
  popular: true,
}

const basicTier: PricingTier = {
  name: "Starter",
  price: { monthly: 29, yearly: 290 },
  description: "For individuals",
  features: [
    "3 projects",
    "Email support",
    "Basic analytics",
    "Standard integrations",
  ],
  cta: "Start Free",
  highlighted: false,
  popular: false,
}

const enterpriseTier: PricingTier = {
  name: "Enterprise",
  price: { monthly: 299, yearly: 2990 },
  description: "For large teams",
  features: [
    "Unlimited everything",
    "Dedicated account manager",
    "Custom SLA",
    "Advanced security",
    "On-premise deployment",
    "White-label options",
    "Priority phone support",
  ],
  cta: "Contact Sales",
  highlighted: false,
  popular: false,
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═════════════════════════════════════════════════════════════════════════════
export default function ComponentShowcase() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedRadio, setSelectedRadio] = useState("option-1")
  const [scrambleTrigger, setScrambleTrigger] = useState(true)
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }, [])

  return (
    <div style={{ background: C.bg, color: C.text }}>
      {/* ═══════ HERO ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Spotlight className="top-[-15%] left-[15%]" fill={C.gold} />
        <Spotlight className="top-[-5%] right-[20%]" fill="rgba(198,167,94,0.4)" />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 900, padding: "0 24px", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 20px",
                borderRadius: 9999,
                border: `1px solid rgba(198,167,94,0.3)`,
                background: "rgba(198,167,94,0.08)",
              }}
            >
              <Sparkles size={14} style={{ color: C.gold }} />
              <AnimatedShinyText shimmerWidth={120}>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.18em", color: C.gold }}>
                  PREMIUM UI LIBRARY
                </span>
              </AnimatedShinyText>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <TextScramble
              as="h1"
              duration={1.5}
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
                marginBottom: 24,
              }}
            >
              Component Showcase
            </TextScramble>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: C.muted,
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 40px",
            }}
          >
            38 premium components rendered full-screen. Hover, click, scroll —
            every interaction is live.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <GoldShinyButton
              onClick={() => document.getElementById("comp-01")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "1rem 2.5rem", borderRadius: 9999, fontWeight: 600, fontSize: "1rem" }}
            >
              <ArrowRight size={18} />
              Explore Components
            </GoldShinyButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}
          >
            {[
              { label: "Components", value: "38" },
              { label: "Interactive", value: "22" },
              { label: "WebGL Effects", value: "4" },
              { label: "Full-Screen", value: "100%" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-playfair)", fontSize: "2.2rem", fontWeight: 700, color: C.gold }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: C.subtle, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            style={{
              position: "absolute",
              bottom: -80,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ color: C.subtle }}
            >
              <ChevronDown size={28} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 01. ANIMATED SHINY TEXT ═══════════════════════════════════════ */}
      <FullSection
        num={1}
        title="Animated Shiny Text"
        description="Moving gold shimmer across text. Hover to intensify."
      >
        <div id="comp-01" style={{ display: "flex", flexDirection: "column", gap: 48, alignItems: "center", width: "100%", maxWidth: 800 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 28px",
              borderRadius: 9999,
              border: `1px solid rgba(198,167,94,0.3)`,
              background: "rgba(198,167,94,0.08)",
              cursor: "pointer",
              transition: "border-color 0.3s, background 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(198,167,94,0.6)"
              e.currentTarget.style.background = "rgba(198,167,94,0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(198,167,94,0.3)"
              e.currentTarget.style.background = "rgba(198,167,94,0.08)"
            }}
          >
            <Star size={16} style={{ color: C.gold }} />
            <AnimatedShinyText shimmerWidth={150}>
              <span style={{ fontSize: "0.85rem", letterSpacing: "0.18em", color: C.gold }}>
                PREMIUM COLLECTION
              </span>
            </AnimatedShinyText>
          </div>

          <AnimatedShinyText shimmerWidth={300}>
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 800,
                color: C.gold,
                letterSpacing: "-0.03em",
              }}
            >
              Gold Shimmer Typography
            </span>
          </AnimatedShinyText>

          <AnimatedShinyText shimmerWidth={200}>
            <span style={{ fontSize: "1.1rem", color: C.goldLight, lineHeight: 1.7, textAlign: "center", display: "block", maxWidth: 500 }}>
              The shimmer sweeps continuously across any text element. Perfect for badges, headings, and premium callouts.
            </span>
          </AnimatedShinyText>
        </div>
      </FullSection>

      {/* ═══ 02. ACCORDION ════════════════════════════════════════════════ */}
      <FullSection
        num={2}
        title="Accordion"
        description="Click items to expand/collapse. Smooth spring animations. Built on Radix UI with full keyboard support."
        dark={false}
      >
        <div style={{ width: "100%", maxWidth: 700 }}>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "What technologies power these components?",
                a: "React 19, Next.js 15, Framer Motion for animations, Tailwind CSS v4 for styling, Radix UI primitives for accessibility, Three.js and custom GLSL for WebGL effects.",
              },
              {
                q: "Are all components fully interactive?",
                a: "Yes. Every component on this page is rendered live — not a screenshot or static preview. Hover effects, click handlers, scroll triggers, and keyboard navigation all work in real-time.",
              },
              {
                q: "Can I customize the theme and colors?",
                a: "Absolutely. All colors are driven by CSS variables and a theme constants object. Swap the gold palette for any brand color in seconds. Typography, spacing, and border-radius are all configurable.",
              },
              {
                q: "How is accessibility handled?",
                a: "Interactive components use Radix UI primitives with full WAI-ARIA support. Keyboard navigation (Tab, Enter, Space, Arrow keys), focus-visible indicators, and screen reader announcements are built in.",
              },
              {
                q: "What about mobile responsiveness?",
                a: "Every component is mobile-first responsive. Layouts adapt from mobile to desktop using fluid typography (clamp), CSS Grid auto-fit, and responsive Tailwind breakpoints.",
              },
              {
                q: "Can I use WebGL effects on low-end devices?",
                a: "The shader components detect GPU capability and gracefully degrade. On devices without WebGL support, they fall back to CSS gradient animations.",
              },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </FullSection>

      {/* ═══ 03. BACKGROUND PATHS ═════════════════════════════════════════ */}
      <FullSection
        num={3}
        title="Background Paths"
        description="Animated SVG paths floating behind content. Gold-tinted. Continuously animating."
        noPadding
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <BackgroundPaths title="" pathColor="#C6A75E" pathOpacity={0.15}>
            <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 16,
                  letterSpacing: "-0.03em",
                }}
              >
                Floating Gold Paths
              </h3>
              <p style={{ color: C.muted, fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
                SVG paths continuously animate with smooth easing. Customize color, opacity, and density.
              </p>
            </div>
          </BackgroundPaths>
        </div>
      </FullSection>

      {/* ═══ 04. BADGE ════════════════════════════════════════════════════ */}
      <FullSection
        num={4}
        title="Badge"
        description="Status indicators with 4 variants. Hover to see scale effect."
        dark={false}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 48, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
            {(["default", "secondary", "outline", "destructive"] as const).map((v) => (
              <motion.div key={v} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} style={{ cursor: "pointer" }}>
                <Badge variant={v} className="text-sm px-5 py-2">
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </Badge>
              </motion.div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { label: "Status", badge: <Badge variant="default"><Check size={10} className="mr-1" /> Live</Badge> },
              { label: "Plan", badge: <Badge variant="secondary">Enterprise</Badge> },
              { label: "Version", badge: <Badge variant="outline">v4.0.0</Badge> },
              { label: "Alert", badge: <Badge variant="destructive">3 Issues</Badge> },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: C.muted, fontSize: "0.85rem" }}>{item.label}:</span>
                {item.badge}
              </div>
            ))}
          </div>
        </div>
      </FullSection>

      {/* ═══ 05. BUTTON ══════════════════════════════════════════════════ */}
      <FullSection
        num={5}
        title="Button"
        description="6 variants, 4 sizes. Full hover, focus-visible, and active states. Click any button."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 40, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <Button variant="default" size="lg">Default</Button>
            <Button variant="secondary" size="lg">Secondary</Button>
            <Button variant="outline" size="lg">Outline</Button>
            <Button variant="ghost" size="lg">Ghost</Button>
            <Button variant="link" size="lg">Link</Button>
            <Button variant="destructive" size="lg">Destructive</Button>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            <Button size="sm" variant="outline"><Star size={12} className="mr-1" /> Small</Button>
            <Button size="default" variant="outline"><Star size={14} className="mr-1" /> Default</Button>
            <Button size="lg" variant="outline"><Star size={18} className="mr-1" /> Large</Button>
            <Button size="icon" variant="outline" aria-label="Star"><Star size={16} /></Button>
          </div>
        </div>
      </FullSection>

      {/* ═══ 06. NOISE PATTERN CARD ══════════════════════════════════════ */}
      <FullSection
        num={6}
        title="Noise Pattern Card"
        description="Textured cards with noise overlay. Hover for lift and glow."
        dark={false}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, width: "100%", maxWidth: 1000 }}>
          {[
            { icon: <Award size={32} />, title: "Premium Quality", desc: "Textured surface adds subtle depth and a tactile visual feel to card layouts." },
            { icon: <Shield size={32} />, title: "Secure by Design", desc: "Built with accessibility and security best practices from the ground up." },
            { icon: <Zap size={32} />, title: "Lightning Fast", desc: "GPU-accelerated animations. Sub-16ms frame times for butter-smooth 60fps." },
            { icon: <Eye size={32} />, title: "Pixel Perfect", desc: "Every component is hand-tuned for visual precision across all screen sizes." },
          ].map((card) => (
            <motion.div key={card.title} whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <NoisePatternCard>
                <NoisePatternCardBody>
                  <div style={{ padding: 32 }}>
                    <div style={{ color: C.gold, marginBottom: 16 }}>{card.icon}</div>
                    <h4 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 700, color: C.text, marginBottom: 10 }}>
                      {card.title}
                    </h4>
                    <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.7 }}>{card.desc}</p>
                  </div>
                </NoisePatternCardBody>
              </NoisePatternCard>
            </motion.div>
          ))}
        </div>
      </FullSection>

      {/* ═══ 07. CARD ════════════════════════════════════════════════════ */}
      <FullSection
        num={7}
        title="Card"
        description="Composable card system with header, title, description, content, and footer. Hover for lift."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, width: "100%", maxWidth: 1000 }}>
          {[
            { title: "Full Card", desc: "All slots used", content: "Header + Title + Description + Content + Footer — the complete composition.", cta: "Learn More" },
            { title: "Stat Card", desc: "Metric display", content: null, stat: "12,847", statLabel: "Active Users This Month", cta: null },
            { title: "Feature Card", desc: "Highlighted", content: "Designed for feature lists, service descriptions, and content blocks with call-to-action buttons.", cta: "Get Started" },
          ].map((c, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{c.title}</CardTitle>
                  <CardDescription>{c.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  {c.stat ? (
                    <div style={{ textAlign: "center", padding: "16px 0" }}>
                      <div style={{ fontSize: "2.5rem", fontWeight: 700, color: C.gold, fontFamily: "var(--font-playfair)" }}>{c.stat}</div>
                      <p style={{ fontSize: "0.85rem", color: C.muted }}>{c.statLabel}</p>
                    </div>
                  ) : (
                    <p style={{ fontSize: "0.875rem", color: C.muted, lineHeight: 1.7 }}>{c.content}</p>
                  )}
                </CardContent>
                {c.cta && (
                  <CardFooter>
                    <Button variant="outline" size="sm">{c.cta}</Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </FullSection>

      {/* ═══ 08. CONTAINER SCROLL ANIMATION ══════════════════════════════ */}
      <FullSection
        num={8}
        title="Container Scroll Animation"
        description="Scroll-triggered 3D perspective transform. Scroll down to see the card rotate and scale into view."
        noPadding
      >
        <div style={{ width: "100%", overflow: "hidden" }}>
          <ContainerScroll
            titleComponent={
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.1 }}>
                Scroll-Driven
                <br />
                <span style={{ color: C.gold }}>3D Perspective</span>
              </h3>
            }
          >
            <div
              style={{
                width: "100%",
                height: 600,
                background: `linear-gradient(135deg, ${C.bgElevated} 0%, ${C.bgCard} 50%, ${C.bg} 100%)`,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${C.border}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ textAlign: "center", zIndex: 2 }}>
                <Layers size={48} style={{ color: C.gold, marginBottom: 16, opacity: 0.6 }} />
                <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", color: C.gold, opacity: 0.8 }}>
                  Your App Preview Here
                </p>
              </div>
            </div>
          </ContainerScroll>
        </div>
      </FullSection>

      {/* ═══ 09. DIALOG ══════════════════════════════════════════════════ */}
      <FullSection
        num={9}
        title="Dialog"
        description="Click the button to open an accessible modal. Press Escape or click outside to close."
        dark={false}
      >
        <Dialog>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="lg" className="text-base px-8 py-6">
                Open Premium Dialog
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Premium Modal Dialog</DialogTitle>
              <DialogDescription>
                Fully accessible with focus trapping, keyboard navigation, and screen reader support.
              </DialogDescription>
            </DialogHeader>
            <div style={{ padding: "24px 0", display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.7 }}>
                This dialog uses Radix UI primitives. It traps focus inside the modal, returns focus when closed, and supports Escape key dismissal.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <Button variant="default">Confirm Action</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </FullSection>

      {/* ═══ 10. FEY BUTTON ══════════════════════════════════════════════ */}
      <FullSection
        num={10}
        title="Fey Button"
        description="Hover to see the expanding arrow animation. Click for tactile feedback."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
          <FeyButton>Explore Premium Features</FeyButton>
          <FeyButton>Start Your Journey</FeyButton>
          <FeyButton>View Case Studies</FeyButton>
        </div>
      </FullSection>

      {/* ═══ 11. GLOWING EFFECT ══════════════════════════════════════════ */}
      <FullSection
        num={11}
        title="Glowing Effect"
        description="Move your mouse over the cards. The glow follows your cursor along the border."
        dark={false}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, width: "100%", maxWidth: 1100 }}>
          {[
            { icon: <Zap size={32} />, label: "Lightning Fast", desc: "Sub-100ms response times", variant: "gold" as const },
            { icon: <Shield size={32} />, label: "Enterprise Security", desc: "SOC 2 Type II certified", variant: "white" as const },
            { icon: <Award size={32} />, label: "Award Winning", desc: "Best UI Library 2026", variant: "gold" as const },
            { icon: <Heart size={32} />, label: "Developer Loved", desc: "98% satisfaction rate", variant: "default" as const },
            { icon: <Globe size={32} />, label: "Global Scale", desc: "CDN across 90+ regions", variant: "gold" as const },
            { icon: <Target size={32} />, label: "Pixel Perfect", desc: "Sub-pixel rendering", variant: "white" as const },
          ].map((item) => (
            <div
              key={item.label}
              className="relative"
              style={{
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                padding: 32,
                position: "relative",
                background: C.bgElevated,
                minHeight: 180,
              }}
            >
              <GlowingEffect variant={item.variant} glow disabled={false} spread={25} borderWidth={2} blur={4} inactiveZone={0.6} proximity={100} />
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ color: C.gold }}>{item.icon}</div>
                <h4 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: C.text }}>{item.label}</h4>
                <p style={{ fontSize: "0.85rem", color: C.muted }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </FullSection>

      {/* ═══ 12. HERO GEOMETRIC / SHAPE LANDING ══════════════════════════ */}
      <FullSection
        num={12}
        title="Hero Geometric / Shape Landing"
        description="Full hero with animated geometric shapes, badge, and title. Shapes animate on mount."
        noPadding
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <HeroGeometric
            badge="Premium Components"
            title1="Elevate Your"
            title2="Digital Vision"
          />
        </div>
      </FullSection>

      {/* ═══ 13. HERO SHUTTER TEXT ═══════════════════════════════════════ */}
      <FullSection
        num={13}
        title="Hero Shutter Text"
        description="Massive text with shutter-slice reveal. High-impact hero typography."
        dark={false}
        noPadding
      >
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 120 }}>
          <HeroText text="PREMIUM" />
        </div>
      </FullSection>

      {/* ═══ 14. INFINITE SLIDER ═════════════════════════════════════════ */}
      <FullSection
        num={14}
        title="Infinite Slider"
        description="Auto-scrolling marquee. Hover to slow down. Supports horizontal/vertical, forward/reverse."
      >
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
          <InfiniteSlider gap={32} duration={30}>
            {["React 19", "Next.js 15", "Framer Motion", "Tailwind v4", "Three.js", "Radix UI", "TypeScript", "WebGL", "GLSL Shaders", "Turbopack"].map((t) => (
              <div
                key={t}
                style={{
                  padding: "14px 28px",
                  borderRadius: 9999,
                  border: `1px solid rgba(198,167,94,0.2)`,
                  background: "rgba(198,167,94,0.06)",
                  fontSize: "0.9rem",
                  color: C.gold,
                  whiteSpace: "nowrap",
                  letterSpacing: "0.05em",
                  fontWeight: 500,
                }}
              >
                {t}
              </div>
            ))}
          </InfiniteSlider>
          <InfiniteSlider gap={32} duration={35} reverse>
            {["Teeth Whitening", "Dental Implants", "Smile Design", "Root Canal", "Braces", "Veneers", "Cosmetic", "Orthodontics"].map((s) => (
              <div
                key={s}
                style={{
                  padding: "14px 28px",
                  borderRadius: 9999,
                  border: `1px solid ${C.border}`,
                  background: C.bgElevated,
                  fontSize: "0.9rem",
                  color: C.muted,
                  whiteSpace: "nowrap",
                  letterSpacing: "0.05em",
                }}
              >
                {s}
              </div>
            ))}
          </InfiniteSlider>
          <InfiniteSlider gap={32} duration={25}>
            {["Premium", "Luxury", "Elegant", "Refined", "Exclusive", "Bespoke", "Curated", "Artisan"].map((s) => (
              <div
                key={s}
                style={{
                  padding: "14px 28px",
                  borderRadius: 12,
                  border: `1px solid rgba(198,167,94,0.15)`,
                  background: "rgba(198,167,94,0.04)",
                  fontSize: "0.85rem",
                  color: C.goldLight,
                  whiteSpace: "nowrap",
                  fontStyle: "italic",
                  fontFamily: "var(--font-playfair)",
                }}
              >
                {s}
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </FullSection>

      {/* ═══ 15. LABEL + FORM ════════════════════════════════════════════ */}
      <FullSection
        num={15}
        title="Label"
        description="Accessible form labels. Submit the form to see the interaction."
        dark={false}
      >
        <form onSubmit={handleFormSubmit} style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Label htmlFor="name" style={{ color: C.text, fontSize: "0.85rem", fontWeight: 500 }}>Full Name</Label>
            <input
              id="name"
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="John Doe"
              style={{
                padding: "14px 18px",
                borderRadius: 10,
                border: `1px solid ${C.border}`,
                background: C.bgElevated,
                color: C.text,
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = C.gold)}
              onBlur={(e) => (e.target.style.borderColor = C.border)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Label htmlFor="email" style={{ color: C.text, fontSize: "0.85rem", fontWeight: 500 }}>Email Address</Label>
            <input
              id="email"
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              placeholder="john@example.com"
              style={{
                padding: "14px 18px",
                borderRadius: 10,
                border: `1px solid ${C.border}`,
                background: C.bgElevated,
                color: C.text,
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = C.gold)}
              onBlur={(e) => (e.target.style.borderColor = C.border)}
            />
          </div>
          <AnimatePresence mode="wait">
            {formSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  padding: 16,
                  borderRadius: 10,
                  background: "rgba(198,167,94,0.1)",
                  border: `1px solid rgba(198,167,94,0.3)`,
                  color: C.gold,
                  textAlign: "center",
                  fontSize: "0.9rem",
                }}
              >
                <Check size={20} style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }} />
                Submitted successfully!
              </motion.div>
            ) : (
              <motion.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button type="submit" variant="default" size="lg" className="w-full">
                  <Send size={16} className="mr-2" /> Submit
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </FullSection>

      {/* ═══ 16. LIQUID BUTTON ═══════════════════════════════════════════ */}
      <FullSection
        num={16}
        title="Liquid Button"
        description="Hover to see the liquid ripple effect. Available in primary and secondary."
      >
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          <LiquidButtonOriginal variant="primary">Primary Liquid</LiquidButtonOriginal>
          <LiquidButtonOriginal variant="secondary">Secondary Liquid</LiquidButtonOriginal>
        </div>
      </FullSection>

      {/* ═══ 17. LIQUID GLASS BUTTON ═════════════════════════════════════ */}
      <FullSection
        num={17}
        title="Liquid Glass Button"
        description="Glassmorphic buttons with SVG liquid distortion. Hover to activate the glass effect."
        dark={false}
      >
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          <LiquidGlassButton variant="default" size="xl">Default Glass</LiquidGlassButton>
          <LiquidGlassButton variant="outline" size="xl">Outline Glass</LiquidGlassButton>
          <LiquidGlassButton variant="secondary" size="xl">Secondary Glass</LiquidGlassButton>
          <LiquidGlassButton variant="ghost" size="xl">Ghost Glass</LiquidGlassButton>
        </div>
      </FullSection>

      {/* ═══ 18. MENU TOGGLE ICON ════════════════════════════════════════ */}
      <FullSection
        num={18}
        title="Menu Toggle Icon"
        description="Click the icon to toggle between hamburger and X. Smooth SVG morphing animation."
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: C.bgElevated,
              border: `2px solid ${menuOpen ? C.gold : C.border}`,
              borderRadius: 20,
              padding: 32,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.3s",
            }}
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={menuOpen} duration={400} width={48} height={48} stroke={C.gold} />
          </motion.button>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "1.1rem", color: C.text, fontWeight: 600 }}>
              {menuOpen ? "Menu Open" : "Menu Closed"}
            </span>
            <p style={{ fontSize: "0.8rem", color: C.muted, marginTop: 4 }}>Click to toggle</p>
          </div>
        </div>
      </FullSection>

      {/* ═══ 19. NEON BUTTON ═════════════════════════════════════════════ */}
      <FullSection
        num={19}
        title="Neon Button"
        description="Pulsing neon glow on the border. Hover to intensify the glow."
        dark={false}
      >
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <NeonButton variant="default" neon size="lg">Neon Default</NeonButton>
          <NeonButton variant="solid" neon size="lg">Neon Solid</NeonButton>
          <NeonButton variant="ghost" neon size="lg">Neon Ghost</NeonButton>
        </div>
      </FullSection>

      {/* ═══ 20. PRICING CARD ════════════════════════════════════════════ */}
      <FullSection
        num={20}
        title="Pricing Card"
        description="Full pricing cards with popular badge, feature lists, and CTA. Hover for lift."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, width: "100%", maxWidth: 1000 }}>
          <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <PricingCard tier={basicTier} paymentFrequency="monthly" />
          </motion.div>
          <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <PricingCard tier={demoPricingTier} paymentFrequency="monthly" />
          </motion.div>
          <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <PricingCard tier={enterpriseTier} paymentFrequency="monthly" />
          </motion.div>
        </div>
      </FullSection>

      {/* ═══ 21. RADIO GROUP ═════════════════════════════════════════════ */}
      <FullSection
        num={21}
        title="Radio Group"
        description="Click any option or use arrow keys to navigate. Full keyboard support."
        dark={false}
      >
        <div style={{ width: "100%", maxWidth: 500 }}>
          <RadioGroup value={selectedRadio} onValueChange={setSelectedRadio} className="flex flex-col gap-4">
            {[
              { value: "option-1", label: "Starter Plan", desc: "$29/mo — 3 projects, email support" },
              { value: "option-2", label: "Professional Plan", desc: "$99/mo — Unlimited projects, priority support" },
              { value: "option-3", label: "Enterprise Plan", desc: "$299/mo — Custom SLA, dedicated manager" },
            ].map((opt) => (
              <motion.div
                key={opt.value}
                whileHover={{ scale: 1.02 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: 20,
                  borderRadius: 12,
                  border: `1px solid ${selectedRadio === opt.value ? C.gold : C.border}`,
                  background: selectedRadio === opt.value ? "rgba(198,167,94,0.06)" : C.bgElevated,
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onClick={() => setSelectedRadio(opt.value)}
              >
                <RadioGroupItem value={opt.value} id={opt.value} />
                <div>
                  <Label htmlFor={opt.value} style={{ color: C.text, fontSize: "1rem", fontWeight: 600, cursor: "pointer", display: "block" }}>
                    {opt.label}
                  </Label>
                  <span style={{ fontSize: "0.8rem", color: C.muted }}>{opt.desc}</span>
                </div>
              </motion.div>
            ))}
          </RadioGroup>
        </div>
      </FullSection>

      {/* ═══ 22. SHADER ANIMATION ════════════════════════════════════════ */}
      <FullSection
        num={22}
        title="Shader Animation"
        description="WebGL shader with flowing gradients. GPU-accelerated, full-screen visual."
        noPadding
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <ShaderAnimation />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>
            WebGL Shader
          </h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>GPU-accelerated flowing gradients</p>
        </div>
      </FullSection>

      {/* ═══ 23. SHADER LINES ════════════════════════════════════════════ */}
      <FullSection
        num={23}
        title="Shader Lines"
        description="Three.js organic line patterns. Dynamic, flowing, GPU-rendered."
        noPadding
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <ShaderLines />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>
            Three.js Lines
          </h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>Organic flowing line patterns</p>
        </div>
      </FullSection>

      {/* ═══ 24. GOLD SHINY BUTTON ═══════════════════════════════════════ */}
      <FullSection
        num={24}
        title="Gold Shiny Button"
        description="The flagship CTA. Animated gold shine sweeps across on hover. Click for press feedback."
        dark={false}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
          <GoldShinyButton
            style={{ padding: "1.1rem 3rem", borderRadius: 9999, fontWeight: 700, fontSize: "1.15rem" }}
          >
            <Calendar size={20} />
            Book Free Consultation
          </GoldShinyButton>
          <GoldShinyButton
            style={{ padding: "1rem 2.5rem", borderRadius: 14, fontWeight: 600, fontSize: "1rem" }}
          >
            Get Started Today
          </GoldShinyButton>
          <GoldShinyButton
            style={{ padding: "0.85rem 2rem", borderRadius: 10, fontWeight: 600, fontSize: "0.9rem" }}
          >
            <ArrowRight size={16} /> View Plans
          </GoldShinyButton>
        </div>
      </FullSection>

      {/* ═══ 25. CANVAS REVEAL EFFECT ════════════════════════════════════ */}
      <FullSection
        num={25}
        title="Canvas Reveal Effect"
        description="Dot-matrix canvas animation radiating from center. Gold-themed with gradient overlay."
        noPadding
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <CanvasRevealEffect
            animationSpeed={6}
            colors={[[198, 167, 94]]}
            showGradient
            dotSize={3}
          />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>
            Canvas Dot Matrix
          </h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>Radiating dot animation</p>
        </div>
      </FullSection>

      {/* ═══ 26. SPOTLIGHT ═══════════════════════════════════════════════ */}
      <FullSection
        num={26}
        title="Spotlight"
        description="Dramatic directional light beams. Used for hero sections and feature highlights."
        noPadding
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Spotlight className="top-[-15%] left-[15%]" fill={C.gold} />
          <Spotlight className="top-[-10%] right-[15%]" fill="rgba(198,167,94,0.5)" />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>
          <Eye size={48} style={{ color: C.gold, marginBottom: 16 }} />
          <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>
            Dramatic Cross-Lighting
          </h3>
          <p style={{ color: C.muted, fontSize: "1.1rem", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            Two spotlight beams creating dramatic illumination for hero sections
          </p>
        </div>
      </FullSection>

      {/* ═══ 27. TEXT SCRAMBLE ════════════════════════════════════════════ */}
      <FullSection
        num={27}
        title="Text Scramble"
        description="Characters scramble through random glyphs. Click Retrigger to replay the animation."
        dark={false}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40, width: "100%", maxWidth: 700 }}>
          <TextScramble
            key={`headline-${scrambleTrigger}`}
            as="div"
            duration={0.6}
            style={{ fontSize: "0.85rem", letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase" }}
          >
            Introducing
          </TextScramble>
          <TextScramble
            key={`title-${scrambleTrigger}`}
            as="div"
            duration={1.5}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              color: "#fff",
              textAlign: "center",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            The Future of Design
          </TextScramble>
          <TextScramble
            key={`sub-${scrambleTrigger}`}
            as="div"
            duration={2}
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              color: C.muted,
              textAlign: "center",
              maxWidth: 500,
              lineHeight: 1.7,
            }}
          >
            Premium components for premium brands. Every pixel crafted with intention.
          </TextScramble>
          <motion.button
            onClick={() => setScrambleTrigger((p) => !p)}
            whileHover={{ scale: 1.05, borderColor: C.gold }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 32px",
              borderRadius: 9999,
              border: `1px solid ${C.border}`,
              background: C.bgElevated,
              color: C.gold,
              fontSize: "0.9rem",
              cursor: "pointer",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            Retrigger Scramble
          </motion.button>
        </div>
      </FullSection>

      {/* ═══ 28. TUBELIGHT NAVBAR ════════════════════════════════════════ */}
      <FullSection
        num={28}
        title="Tubelight Navbar"
        description="Click items to see the animated glow follow your selection. Responsive — icons on mobile, text on desktop."
      >
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <NavBar
            items={[
              { name: "Home", url: "#", icon: Home },
              { name: "About", url: "#", icon: Users },
              { name: "Services", url: "#", icon: Sparkles },
              { name: "Portfolio", url: "#", icon: Layers },
              { name: "Contact", url: "#", icon: Mail },
            ]}
          />
        </div>
      </FullSection>

      {/* ═══ 29. NOISE PATTERN — FEATURE GRID ════════════════════════════ */}
      <FullSection
        num={29}
        title="Noise Pattern Card — Feature Grid"
        description="Full-width feature grid with textured cards. Hover any card for lift + scale."
        dark={false}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, width: "100%", maxWidth: 1100 }}>
          {[
            { icon: <Zap size={28} />, title: "Lightning Fast", desc: "Sub-100ms interactions with GPU-accelerated rendering" },
            { icon: <Shield size={28} />, title: "Secure", desc: "Enterprise-grade security with SOC 2 compliance" },
            { icon: <Eye size={28} />, title: "Stunning", desc: "Pixel-perfect design across all screen sizes" },
            { icon: <Target size={28} />, title: "Precise", desc: "Sub-pixel rendering with antialiased edges" },
            { icon: <Globe size={28} />, title: "Global", desc: "CDN-optimized assets across 90+ edge locations" },
            { icon: <Layers size={28} />, title: "Composable", desc: "Mix and match components for any layout" },
          ].map((f) => (
            <motion.div key={f.title} whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <NoisePatternCard>
                <NoisePatternCardBody>
                  <div style={{ padding: 28, textAlign: "center" }}>
                    <div style={{ color: C.gold, marginBottom: 14, display: "flex", justifyContent: "center" }}>{f.icon}</div>
                    <h4 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: C.text, marginBottom: 8 }}>
                      {f.title}
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: C.muted, lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </NoisePatternCardBody>
              </NoisePatternCard>
            </motion.div>
          ))}
        </div>
      </FullSection>

      {/* ═══ 30. CONTAINER SCROLL — ALT ══════════════════════════════════ */}
      <FullSection
        num={30}
        title="Container Scroll — Dashboard Preview"
        description="Scroll-triggered 3D transform showcasing a dashboard mockup."
        noPadding
      >
        <div style={{ width: "100%", overflow: "hidden" }}>
          <ContainerScroll
            titleComponent={
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", textAlign: "center" }}>
                Your Dashboard
                <br />
                <span style={{ color: C.gold }}>Comes to Life</span>
              </h3>
            }
          >
            <div
              style={{
                width: "100%",
                height: 500,
                background: C.bgCard,
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                padding: 32,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
              }}
            >
              {[
                { label: "Revenue", value: "$124,592", change: "+12.5%" },
                { label: "Customers", value: "3,847", change: "+8.2%" },
                { label: "Conversion", value: "4.8%", change: "+0.6%" },
              ].map((m) => (
                <div key={m.label} style={{ background: C.bgElevated, borderRadius: 12, padding: 24, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: "0.75rem", color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>{m.label}</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 700, color: C.text, fontFamily: "var(--font-playfair)" }}>{m.value}</div>
                  <div style={{ fontSize: "0.8rem", color: "#4ade80", marginTop: 4 }}>{m.change}</div>
                </div>
              ))}
            </div>
          </ContainerScroll>
        </div>
      </FullSection>

      {/* ═══ 31. GLOWING CARDS — ALT LAYOUT ══════════════════════════════ */}
      <FullSection
        num={31}
        title="Glowing Effect — Service Cards"
        description="Mouse-following glow on larger service cards. Move your cursor across each card."
        dark={false}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, width: "100%", maxWidth: 1100 }}>
          {[
            { icon: <Star size={36} />, title: "Brand Strategy", desc: "Comprehensive brand identity development with market positioning analysis", variant: "gold" as const },
            { icon: <Sparkles size={36} />, title: "UI/UX Design", desc: "User-centered design systems with interactive prototyping and usability testing", variant: "gold" as const },
            { icon: <Zap size={36} />, title: "Development", desc: "Full-stack development with React, Next.js, and cloud-native architecture", variant: "white" as const },
          ].map((item) => (
            <div
              key={item.title}
              className="relative"
              style={{
                borderRadius: 20,
                border: `1px solid ${C.border}`,
                padding: 40,
                position: "relative",
                background: C.bgElevated,
                minHeight: 220,
              }}
            >
              <GlowingEffect variant={item.variant} glow disabled={false} spread={30} borderWidth={2} blur={6} inactiveZone={0.5} proximity={120} />
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ color: C.gold }}>{item.icon}</div>
                <h4 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", fontWeight: 700, color: C.text }}>{item.title}</h4>
                <p style={{ fontSize: "0.9rem", color: C.muted, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </FullSection>

      {/* ═══ 32. ALL BUTTONS TOGETHER ════════════════════════════════════ */}
      <FullSection
        num={32}
        title="Full Button Collection"
        description="Every button type side by side. Hover and click each to compare interactions."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center", width: "100%", maxWidth: 800 }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            <GoldShinyButton style={{ padding: "0.85rem 2rem", borderRadius: 9999, fontWeight: 600, fontSize: "0.9rem" }}>
              Gold Shiny
            </GoldShinyButton>
            <LiquidButtonOriginal variant="primary">Liquid</LiquidButtonOriginal>
            <LiquidGlassButton variant="default" size="lg">Glass</LiquidGlassButton>
            <FeyButton>Fey</FeyButton>
            <NeonButton variant="default" neon size="lg">Neon</NeonButton>
            <Button variant="outline" size="lg">Standard</Button>
          </div>
          <p style={{ fontSize: "0.8rem", color: C.muted, textAlign: "center" }}>
            6 unique button components — each with distinct hover, active, and focus states
          </p>
        </div>
      </FullSection>

      {/* ═══ 33. SPOTLIGHT + TEXT SCRAMBLE COMBO ═════════════════════════ */}
      <FullSection
        num={33}
        title="Spotlight + Text Scramble"
        description="Combined effect — spotlight illumination with scramble reveal text."
        noPadding
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Spotlight className="top-[-10%] left-[25%]" fill={C.gold} />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>
          <TextScramble
            as="div"
            duration={0.8}
            style={{ fontSize: "0.8rem", letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}
          >
            Effect Composition
          </TextScramble>
          <TextScramble
            as="div"
            duration={1.5}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 20,
            }}
          >
            Layered Effects
          </TextScramble>
          <TextScramble
            as="div"
            duration={2}
            style={{ fontSize: "1.1rem", color: C.muted, maxWidth: 500, margin: "0 auto" }}
          >
            Multiple effects combined for maximum visual impact
          </TextScramble>
        </div>
      </FullSection>

      {/* ═══ 34. BACKGROUND PATHS + SHINY TEXT ═══════════════════════════ */}
      <FullSection
        num={34}
        title="Background Paths + Animated Shiny Text"
        description="Floating paths behind shimmer text — a premium hero combination."
        noPadding
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <BackgroundPaths title="" pathColor="#C6A75E" pathOpacity={0.1}>
            <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <AnimatedShinyText shimmerWidth={250}>
                <span
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(2.5rem, 7vw, 5rem)",
                    fontWeight: 800,
                    color: C.gold,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Luxury Meets Code
                </span>
              </AnimatedShinyText>
            </div>
          </BackgroundPaths>
        </div>
      </FullSection>

      {/* ═══ 35. ACCORDION — ALT STYLE ═══════════════════════════════════ */}
      <FullSection
        num={35}
        title="Accordion — Services FAQ"
        description="Accordion styled for a services FAQ. Click to expand any answer."
        dark={false}
      >
        <div style={{ width: "100%", maxWidth: 700 }}>
          <Accordion type="multiple" className="w-full">
            {[
              { q: "How long does a typical project take?", a: "Most projects are delivered within 4-8 weeks depending on scope. We break projects into 2-week sprints for maximum transparency and fast iteration." },
              { q: "What is your pricing model?", a: "We offer both fixed-price and retainer-based pricing. Fixed-price starts at $2,500 for landing pages and scales with complexity. Retainers start at $6,000/month." },
              { q: "Do you provide ongoing support?", a: "Yes. All projects include 30 days of free support post-launch. Extended support and maintenance plans are available at competitive rates." },
              { q: "Can you work with existing codebases?", a: "Absolutely. We regularly integrate with existing React, Next.js, and Vue projects. Our components are designed for drop-in compatibility." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`svc-${i}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </FullSection>

      {/* ═══ 36. INFINITE SLIDER — TESTIMONIALS ═════════════════════════ */}
      <FullSection
        num={36}
        title="Infinite Slider — Testimonial Marquee"
        description="Continuously scrolling testimonial cards. Hover to slow the scroll."
      >
        <div style={{ width: "100%", overflow: "hidden" }}>
          <InfiniteSlider gap={24} duration={40}>
            {[
              { name: "Sarah K.", role: "CEO, TechVenture", quote: "These components transformed our entire product experience." },
              { name: "Marcus J.", role: "Lead Designer", quote: "The attention to detail in every animation is incredible." },
              { name: "Priya R.", role: "CTO, ScaleUp", quote: "Shipped our redesign in half the time. Best investment we made." },
              { name: "David L.", role: "Founder, PixelCraft", quote: "Our conversion rate jumped 40% after implementing these UI components." },
              { name: "Emma T.", role: "Product Manager", quote: "The accessibility and responsiveness are best-in-class." },
            ].map((t) => (
              <div
                key={t.name}
                style={{
                  minWidth: 340,
                  padding: 28,
                  borderRadius: 16,
                  border: `1px solid ${C.border}`,
                  background: C.bgCard,
                }}
              >
                <p style={{ color: C.text, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div style={{ color: C.gold, fontSize: "0.9rem", fontWeight: 600 }}>{t.name}</div>
                  <div style={{ color: C.muted, fontSize: "0.75rem" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </FullSection>

      {/* ═══ 37. CANVAS REVEAL — ALT COLOR ══════════════════════════════ */}
      <FullSection
        num={37}
        title="Canvas Reveal — Multi-Color"
        description="Dot matrix with multiple color channels. Full-screen GPU canvas."
        noPadding
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <CanvasRevealEffect
            animationSpeed={10}
            colors={[[198, 167, 94], [168, 138, 69]]}
            showGradient
            dotSize={2}
          />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff" }}>
            Dual Channel
          </h3>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", marginTop: 8 }}>Multi-color dot-matrix pattern</p>
        </div>
      </FullSection>

      {/* ═══ 38. FINAL COMPOSITION ═══════════════════════════════════════ */}
      <FullSection
        num={38}
        title="Full Composition"
        description="Hero section combining BackgroundPaths + Spotlight + TextScramble + AnimatedShinyText + GoldShinyButton"
        noPadding
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <BackgroundPaths title="" pathColor="#C6A75E" pathOpacity={0.08}>
            <Spotlight className="top-[-15%] left-[15%]" fill={C.gold} />
            <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 20px",
                  borderRadius: 9999,
                  border: `1px solid rgba(198,167,94,0.3)`,
                  background: "rgba(198,167,94,0.08)",
                  marginBottom: 24,
                }}
              >
                <Sparkles size={14} style={{ color: C.gold }} />
                <AnimatedShinyText shimmerWidth={120}>
                  <span style={{ fontSize: "0.75rem", letterSpacing: "0.18em", color: C.gold }}>
                    ALL EFFECTS COMBINED
                  </span>
                </AnimatedShinyText>
              </div>

              <TextScramble
                as="h2"
                duration={1.5}
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  color: "#FFFFFF",
                  marginBottom: 20,
                }}
              >
                Everything Together
              </TextScramble>

              <p style={{ color: C.muted, fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 32px" }}>
                BackgroundPaths, Spotlight, TextScramble, AnimatedShinyText, and GoldShinyButton — all working in harmony.
              </p>

              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <GoldShinyButton style={{ padding: "1rem 2.5rem", borderRadius: 9999, fontWeight: 600, fontSize: "1rem" }}>
                  <Calendar size={18} />
                  Book Consultation
                </GoldShinyButton>
                <LiquidGlassButton variant="outline" size="lg">
                  View Our Work <ArrowRight size={16} className="ml-2" />
                </LiquidGlassButton>
              </div>
            </div>
          </BackgroundPaths>
        </div>
      </FullSection>

      {/* ═══ FOOTER ═════════════════════════════════════════════════════ */}
      <footer
        style={{
          borderTop: `1px solid ${C.border}`,
          padding: "64px 24px",
          textAlign: "center",
          background: C.bg,
        }}
      >
        <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", color: C.text, marginBottom: 8 }}>
          38 Premium Components
        </p>
        <p style={{ fontSize: "0.8rem", color: C.subtle, lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
          React 19 · Next.js 15 · Framer Motion · Tailwind v4 · Three.js · Radix UI · WebGL · GLSL
        </p>
      </footer>
    </div>
  )
}
