"use client"

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useInView,
  useSpring,
} from "framer-motion"
import {
  Shield,
  Users,
  Award,
  Clock,
  Star,
  Zap,
  ChevronDown,
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  CheckCircle,
  ChevronUp,
  MessageCircle,
  Sparkles,
  Heart,
  Eye,
} from "lucide-react"

// ── UI Components ────────────────────────────────────────────────────────────
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { Spotlight } from "@/components/ui/spotlight"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { TextScramble } from "@/components/ui/text-scramble"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { GoldShinyButton } from "@/components/ui/shiny-button"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import {
  NoisePatternCard,
  NoisePatternCardBody,
} from "@/components/ui/card-with-noise-patter"
import { ShaderAnimation } from "@/components/ui/shader-animation"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Badge } from "@/components/ui/badge"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Card } from "@/components/ui/card"

// ── Theme Constants ──────────────────────────────────────────────────────────
const C = {
  gold: "#C6A75E",
  goldHover: "#A88A45",
  goldLight: "#D4C48A",
  bg: "#0A0A0B",
  bgCard: "#141414",
  bgElevated: "#1A1A1A",
  border: "#252525",
  borderSubtle: "#1E1E1E",
  text: "#F5F0EB",
  muted: "#8A8078",
  subtle: "#5A5550",
}

const DENTAL_NAV_ITEMS = [
  { name: "Home", url: "#hero", icon: Star },
  { name: "About", url: "#about", icon: Heart },
  { name: "Services", url: "#services", icon: Sparkles },
  { name: "Gallery", url: "#gallery", icon: Eye },
  { name: "Doctor", url: "#doctor", icon: Award },
  { name: "Testimonials", url: "#testimonials", icon: Users },
  { name: "Pricing", url: "#pricing", icon: Calendar },
  { name: "FAQ", url: "#faq", icon: Shield },
]

const DENTAL_PRICING_TIERS: PricingTier[] = [
  {
    name: "Preventive",
    price: { standard: "From ₹400" },
    description: "Routine preventive care for long-term oral health.",
    features: [
      "Consultation and oral exam",
      "Scaling and polishing from ₹800",
      "Fluoride treatment from ₹600",
      "Children's preventive care plans",
    ],
    cta: "Book Check-up",
  },
  {
    name: "Cosmetic",
    price: { standard: "From ₹2,000" },
    description: "Smile-enhancing treatments tailored to face, bite, and shade.",
    features: [
      "Composite bonding from ₹2,000/tooth",
      "Professional whitening from ₹6,000",
      "Digital smile design from ₹500",
      "Porcelain veneers from ₹8,000/tooth",
    ],
    cta: "Plan My Smile",
    popular: true,
  },
  {
    name: "Restorative",
    price: { standard: "From ₹4,000" },
    description: "Repair damaged teeth with durable, aesthetic restorations.",
    features: [
      "Rotary root canal from ₹4,000",
      "Tooth-coloured fillings from ₹800",
      "Zirconia crowns from ₹8,000",
      "Bridgework for multi-tooth replacement",
    ],
    cta: "Restore Comfort",
    highlighted: true,
  },
  {
    name: "Implants",
    price: { standard: "From ₹25,000" },
    description: "Permanent tooth replacement with surgical precision and planning.",
    features: [
      "Single-tooth implants from ₹25,000",
      "Full-mouth rehabilitation options",
      "Bone grafting and sinus lift support",
      "EMI available on complex cases",
    ],
    cta: "Discuss Implants",
  },
]

const DENTAL_CARE_JOURNEY = [
  {
    step: "01",
    title: "Consult & Diagnose",
    description: "We start with a focused clinical exam, digital imaging when needed, and a clear explanation of what is actually worth treating now.",
    icon: Eye,
  },
  {
    step: "02",
    title: "Preview & Plan",
    description: "For cosmetic and restorative cases, we use digital smile planning to show shade, shape, timeline, and total cost before treatment begins.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Treat & Follow Through",
    description: "Procedures are done with comfort-first protocols, transparent follow-up, and WhatsApp access for recovery questions after you leave the clinic.",
    icon: Heart,
  },
]

// ── Google Fonts + Dental Theme CSS ──────────────────────────────────────────
const GoogleFonts = () => (
  <style>{`
    :root {
      --gold: ${C.gold};
      --gold-hover: ${C.goldHover};
      --font-dm: var(--font-inter);
      --font-outfit: var(--font-inter);
    }
    .font-dm { font-family: var(--font-dm); }
    .font-outfit { font-family: var(--font-outfit); }

    .dental-input:focus {
      border-color: rgba(198,167,94,0.5) !important;
      box-shadow: 0 0 0 3px rgba(198,167,94,0.08), 0 0 12px rgba(198,167,94,0.06);
      outline: none;
    }

    #book-appointment input:focus,
    #book-appointment select:focus,
    #book-appointment textarea:focus {
      border-color: rgba(198,167,94,0.5) !important;
      box-shadow: 0 0 0 3px rgba(198,167,94,0.08), 0 0 12px rgba(198,167,94,0.06);
      outline: none;
    }

    .scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, ${C.gold}, ${C.goldLight}, ${C.gold});
      z-index: 9999;
      transform-origin: left;
    }

    .cursor-glow {
      pointer-events: none;
      position: fixed;
      border-radius: 50%;
      mix-blend-mode: screen;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
      width: 350px;
      height: 350px;
      background: radial-gradient(circle, rgba(198,167,94,0.06) 0%, transparent 70%);
    }

    .before-after-slider {
      position: relative;
      overflow: hidden;
      border-radius: 1rem;
      cursor: col-resize;
      user-select: none;
    }
    .before-after-slider .handle {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 3px;
      background: ${C.gold};
      z-index: 10;
      cursor: col-resize;
    }
    .before-after-slider .handle::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: ${C.gold};
      box-shadow: 0 0 0 3px rgba(198,167,94,0.3);
    }

    .testimonial-card {
      min-width: 340px;
      max-width: 380px;
    }

    @keyframes float-orb {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-20px) scale(1.05); }
    }
    .float-orb { animation: float-orb 6s ease-in-out infinite; }
    .float-orb-delay { animation: float-orb 8s ease-in-out 2s infinite; }

    @keyframes pulse-ring {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    .pulse-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid #22c55e;
      animation: pulse-ring 2s ease-out infinite;
    }

    .timeline-dot::before {
      content: '';
      position: absolute;
      left: -21px;
      top: 6px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: ${C.gold};
      box-shadow: 0 0 8px rgba(198,167,94,0.5);
    }

    .dental-fab-left,
    .dental-fab-right {
      bottom: 88px;
    }
    @media (min-width: 640px) {
      .dental-fab-left,
      .dental-fab-right {
        bottom: 24px;
      }
    }
  `}</style>
)

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [start, end, duration])

  return count
}

// ── Tooth SVG Icon ────────────────────────────────────────────────────────────
function ToothIcon({ size = 24, color = C.gold }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C9.5 2 7.5 3.5 6.5 5.5C5.5 3.5 3.5 2 1 2C1 6 3 9 5 11C5 14 6 20 8 22C9 20 10 17 12 17C14 17 15 20 16 22C18 20 19 14 19 11C21 9 23 6 23 2C20.5 2 18.5 3.5 17.5 5.5C16.5 3.5 14.5 2 12 2Z"
        fill={color}
        fillOpacity="0.9"
        stroke={color}
        strokeWidth="0.5"
      />
    </svg>
  )
}

// ── Before/After Slider ───────────────────────────────────────────────────────
function BeforeAfterSlider({ title }: { title: string }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updatePosition(e.clientX)
  }
  const onPointerUp = () => { dragging.current = false }

  return (
    <div
      ref={containerRef}
      className="before-after-slider"
      style={{ height: 220 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${C.bg} 0%, ${C.bgElevated} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", opacity: 0.6 }}>
          <ToothIcon size={40} color="#737373" />
          <p style={{ color: "#737373", fontSize: 11, marginTop: 8, fontFamily: "var(--font-outfit)" }}>BEFORE</p>
          <p style={{ color: "#A3A3A3", fontSize: 13, marginTop: 4, fontFamily: "var(--font-dm)" }}>{title}</p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          background: `linear-gradient(135deg, rgba(198,167,94,0.12) 0%, rgba(60,50,30,0.8) 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <ToothIcon size={40} color={C.gold} />
          <p style={{ color: C.gold, fontSize: 11, marginTop: 8, fontFamily: "var(--font-outfit)" }}>AFTER</p>
          <p style={{ color: "#FFFFFF", fontSize: 13, marginTop: 4, fontFamily: "var(--font-dm)" }}>{title}</p>
        </div>
      </div>
      <div
        className="handle"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />
      <div style={{ position: "absolute", bottom: 10, left: 12, fontSize: 10, color: "#737373", fontFamily: "var(--font-outfit)", fontWeight: 600, letterSpacing: "0.1em", zIndex: 5 }}>
        BEFORE
      </div>
      <div style={{ position: "absolute", bottom: 10, right: 12, fontSize: 10, color: C.gold, fontFamily: "var(--font-outfit)", fontWeight: 600, letterSpacing: "0.1em", zIndex: 5 }}>
        AFTER
      </div>
    </div>
  )
}

// ── Scroll Progress Bar ───────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, width: "100%" }}
    />
  )
}

// ── Gold Section Divider ──────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(198,167,94,0.15), transparent)" }} />
  )
}

// ── Back To Top ───────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="dental-fab-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            left: 24,
            zIndex: 100,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `rgba(198,167,94,0.15)`,
            border: `1px solid rgba(198,167,94,0.4)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(12px)",
            color: C.gold,
          }}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(198,167,94,0.25)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ── Floating WhatsApp ─────────────────────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <motion.a
      className="dental-fab-right group"
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        right: 24,
        zIndex: 100,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 0 0 rgba(37,211,102,0.4)",
        cursor: "pointer",
      }}
      animate={{ boxShadow: ["0 0 0 0 rgba(37,211,102,0.4)", "0 0 0 16px rgba(37,211,102,0)", "0 0 0 0 rgba(37,211,102,0)"] }}
      transition={{ duration: 2.5, repeat: Infinity }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contact on WhatsApp"
    >
      <div className="pulse-ring" />
      <MessageCircle size={26} color="#fff" style={{ position: "relative", zIndex: 1 }} />
      <span style={{
        position: "absolute",
        right: 68,
        background: "#1A1A1A",
        color: "#25D366",
        fontFamily: "var(--font-outfit)",
        fontSize: "0.75rem",
        fontWeight: 600,
        padding: "6px 12px",
        borderRadius: 8,
        whiteSpace: "nowrap",
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.2s",
      }} className="group-hover:!opacity-100">
        Chat with us
      </span>
    </motion.a>
  )
}

// ── Cursor Glow ───────────────────────────────────────────────────────────────
function CursorGlow() {
  const [pos, setPos] = useState({ x: -999, y: -999 })
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [])
  return <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />
}

// ── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="mb-4 border-[rgba(198,167,94,0.25)] bg-[rgba(198,167,94,0.06)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#C6A75E]"
    >
      {children}
    </Badge>
  )
}

// ── Section Heading ───────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-playfair)",
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 700,
        color: "#FFFFFF",
        lineHeight: 1.15,
        letterSpacing: "-0.02em",
        whiteSpace: "pre-line",
      }}
    >
      {children}
    </h2>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
export default function DentalPage() {
  const [formSuccess, setFormSuccess] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", service: "", date: "", time: "", message: "",
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)
    setTimeout(() => {
      setFormSubmitting(false)
      setFormSuccess(true)
    }, 1500)
  }

  return (
    <div
      className="luxury-bg"
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: "var(--font-inter)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: C.bg,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ToothIcon size={48} />
            </motion.div>
            <span style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}>
              DENTICA
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <GoogleFonts />
      <ScrollProgressBar />
      <CursorGlow />
      <BackToTop />
      <FloatingWhatsApp />

      <div className="pointer-events-none fixed inset-x-0 top-5 z-[120] hidden px-6 lg:block">
        <div className="gold-glow pointer-events-auto mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[rgba(198,167,94,0.16)] bg-[#111111]/70 px-5 py-2 backdrop-blur-xl">
          <a
            href="#hero"
            className="flex items-center gap-2 text-white"
            style={{ textDecoration: "none" }}
          >
            <ToothIcon size={24} />
            <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
              DENTICA
            </span>
          </a>
          <GoldShinyButton
            onClick={() => scrollTo("book-appointment")}
            style={{
              padding: "8px 18px",
              borderRadius: 9999,
              fontFamily: "var(--font-outfit)",
              fontWeight: 600,
              fontSize: "0.8rem",
              flexShrink: 0,
            }}
          >
            <Calendar size={14} /> Book Now
          </GoldShinyButton>
        </div>
      </div>

      <NavBar items={DENTAL_NAV_ITEMS} />

      {/* ─────────────── 2. HERO (BackgroundPaths + Spotlight) ─────────────── */}
      <section id="hero">
        <BackgroundPaths title="" pathColor="#C6A75E" pathOpacity={0.08}>
          <Spotlight className="top-[-15%] left-[15%]" fill={C.gold} />

          {/* Floating orbs */}
          <div className="float-orb" style={{
            position: "absolute", top: "10%", right: "5%", width: 280, height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(198,167,94,0.1) 0%, transparent 70%)",
            zIndex: 0,
          }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto" }}>
            {/* Shiny badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}
            >
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 9999,
                border: "1px solid rgba(198,167,94,0.3)",
                background: "rgba(198,167,94,0.08)",
              }}>
                <ToothIcon size={14} />
                <AnimatedShinyText shimmerWidth={120}>
                  <span style={{ fontFamily: "var(--font-outfit)", fontSize: "0.7rem", letterSpacing: "0.15em", color: C.gold }}>
                    PREMIUM DENTAL CLINIC
                  </span>
                </AnimatedShinyText>
              </div>
            </motion.div>

            {/* Main heading with TextScramble */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <TextScramble
                as="h1"
                duration={1.2}
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(3rem, 8vw, 5.5rem)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                Your Smile, Perfected.
              </TextScramble>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                fontFamily: "var(--font-dm)",
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                color: C.muted,
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                maxWidth: 560,
                margin: "0 auto 2.5rem",
                textAlign: "center",
              }}
            >
              Advanced cosmetic &amp; restorative dentistry with world-class
              technology and 15 years of trusted expertise.
            </motion.p>

            {/* CTAs: GoldShinyButton + LiquidButton */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}
            >
              <GoldShinyButton
                onClick={() => scrollTo("book-appointment")}
                style={{
                  padding: "0.85rem 2rem",
                  borderRadius: 9999,
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                <Calendar size={16} />
                Book Free Consultation
              </GoldShinyButton>
              <LiquidButton
                onClick={() => scrollTo("gallery")}
                size="lg"
                style={{
                  borderRadius: 9999,
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: C.gold,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                View Our Work <ArrowRight size={16} />
              </LiquidButton>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" }}
            >
              {[
                { label: "Happy Patients", value: "10,847+" },
                { label: "Years Experience", value: "15+" },
                { label: "Google Rating", value: "4.9★" },
              ].map(item => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 700, color: C.gold }}>{item.value}</div>
                  <div style={{ fontFamily: "var(--font-dm)", fontSize: "0.75rem", color: C.subtle, textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </BackgroundPaths>
      </section>

      {/* ─────────────── 3. TRUST BAR (InfiniteSlider) ─────────────────────── */}
      <section
        style={{
          background: C.bgCard,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: "20px 0",
          overflow: "hidden",
        }}
      >
        <InfiniteSlider gap={48} duration={35}>
          {[
            { icon: Shield, label: "15+ Years Experience" },
            { icon: Users, label: "10,847+ Happy Patients" },
            { icon: Award, label: "Best Dentist Award 2024" },
            { icon: Clock, label: "Open 7 Days a Week" },
            { icon: Star, label: "4.9★ Google Rating" },
            { icon: Zap, label: "Same-Day Appointments" },
            { icon: Heart, label: "Pain-Free Guarantee" },
            { icon: Sparkles, label: "Digital Smile Design" },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  whiteSpace: "nowrap",
                  padding: "0 8px",
                }}
              >
                <Icon size={16} color={C.gold} />
                <span style={{ fontFamily: "var(--font-outfit)", fontSize: "0.85rem", fontWeight: 500, color: C.muted }}>
                  {item.label}
                </span>
                <span style={{ color: C.border, marginLeft: 20 }}>◆</span>
              </div>
            )
          })}
        </InfiniteSlider>
      </section>

      {/* ─────────────── 4. ABOUT ──────────────────────────────────────────── */}
      <AboutSection />

      {/* ─────────────── 5. SERVICES (NoisePatternCard + GlowingEffect) ──── */}
      <ServicesSection />

      {/* ─────────────── 6. SHOWCASE (ContainerScroll) ─────────────────────── */}
      <GoldDivider />
      <ShowcaseSection />

      {/* ─────────────── 7. GALLERY ────────────────────────────────────────── */}
      <GoldDivider />
      <GallerySection />

      {/* ─────────────── 8. DOCTOR ─────────────────────────────────────────── */}
      <DoctorSection />

      {/* ─────────────── 9. WHY CHOOSE US (GlowingEffect) ─────────────────── */}
      <WhyUsSection />

      {/* ─────────────── 10. TESTIMONIALS (InfiniteSlider) ─────────────────── */}
      <TestimonialsSection />

      {/* ─────────────── 11. STATS (ShaderAnimation bg) ────────────────────── */}
      <StatsSection />

      {/* ─────────────── 12. PRICING (GlowingEffect cards) ─────────────────── */}
      <GoldDivider />
      <PricingSection2 />

      {/* ─────────────── 13. FAQ (Accordion) ───────────────────────────────── */}
      <FAQSection />

      {/* ─────────────── 14. BOOK APPOINTMENT ─────────────────────────────── */}
      <GoldDivider />
      <BookSection
        formData={formData}
        setFormData={setFormData}
        formSuccess={formSuccess}
        formSubmitting={formSubmitting}
        handleSubmit={handleSubmit}
      />

      {/* ─────────────── 15. FOOTER ────────────────────────────────────────── */}
      <FooterSection />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── ABOUT SECTION ─────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.01 })

  const features = [
    { icon: Zap, title: "Advanced Technology", desc: "Carestream CBCT 3D imaging, CEREC same-day crowns, and laser dentistry." },
    { icon: Heart, title: "Painless Procedures", desc: "The Wand™ computer-assisted anesthesia for truly pain-free treatment." },
    { icon: Shield, title: "Premium Materials", desc: "Internationally certified, biocompatible materials — nothing less." },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="grain-overlay"
      style={{
        position: "relative",
        padding: "80px 24px",
        background: C.bg,
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
          {/* Left: Image placeholder with Spotlight */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ position: "relative" }}
          >
            <Spotlight className="top-[-20%] left-[-10%]" fill={C.gold} />
            <div style={{
              borderRadius: 24,
              background: `linear-gradient(135deg, ${C.bgElevated} 0%, ${C.bgCard} 100%)`,
              border: `1px solid ${C.border}`,
              height: 420,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 50% 30%, rgba(198,167,94,0.08) 0%, transparent 60%)",
              }} />
              <ToothIcon size={80} color="rgba(198,167,94,0.3)" />
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", color: "rgba(198,167,94,0.5)", marginTop: 16, fontStyle: "italic" }}>
                DENTICA Clinic
              </p>
              <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.875rem", color: C.subtle, marginTop: 8 }}>
                Est. 2009
              </p>
              <div style={{ position: "absolute", top: 16, right: 16, width: 60, height: 60, borderTop: `2px solid rgba(198,167,94,0.25)`, borderRight: `2px solid rgba(198,167,94,0.25)`, borderRadius: "0 8px 0 0" }} />
              <div style={{ position: "absolute", bottom: 16, left: 16, width: 60, height: 60, borderBottom: `2px solid rgba(198,167,94,0.25)`, borderLeft: `2px solid rgba(198,167,94,0.25)`, borderRadius: "0 0 0 8px" }} />
            </div>
          </motion.div>

          {/* Right: About text + features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <SectionLabel>ABOUT OUR CLINIC</SectionLabel>
            <SectionHeading>{`Where Technology\nMeets Compassion`}</SectionHeading>
            <p style={{
              fontFamily: "var(--font-dm)",
              fontSize: "1rem",
              color: C.muted,
              lineHeight: 1.8,
              marginTop: "1.5rem",
              marginBottom: "2rem",
            }}>
              At DENTICA, we believe every smile tells a story. For over 15 years,
              we&apos;ve been crafting beautiful, healthy smiles using the latest
              dental technology and a compassionate, patient-first approach.
            </p>

            {features.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                  style={{
                    position: "relative",
                    display: "flex",
                    gap: 16,
                    marginBottom: 16,
                    padding: "18px",
                    borderRadius: 14,
                    background: `rgba(198,167,94,0.03)`,
                    border: `1px solid rgba(198,167,94,0.1)`,
                  }}
                >
                  <GlowingEffect spread={30} blur={10} proximity={80} variant="default" />
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(198,167,94,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={18} color={C.gold} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-outfit)", fontWeight: 600, color: "#FFFFFF", marginBottom: 4, fontSize: "0.925rem" }}>{item.title}</p>
                    <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.85rem", color: C.subtle, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── SERVICES SECTION (NoisePatternCard + GlowingEffect) ───────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.01 })

  const services = [
    { icon: "✨", title: "Teeth Whitening", desc: "Professional in-chair Philips ZOOM and take-home whitening for a radiant smile.", price: "₹3,000 – ₹8,000", badge: "Most Popular", badgeColor: C.gold },
    { icon: "🦷", title: "Root Canal", desc: "Pain-free rotary endodontics with apex locator guidance — done in a single visit.", price: "₹4,000 – ₹8,000", badge: null, badgeColor: "" },
    { icon: "💎", title: "Dental Implants", desc: "Nobel Biocare titanium implants with natural-looking ceramic crowns — permanent replacement.", price: "₹25,000 – ₹60,000", badge: "Premium", badgeColor: "#D4A853" },
    { icon: "😁", title: "Braces & Aligners", desc: "Traditional metal, ceramic braces, and certified Invisalign clear aligners.", price: "₹18,000 – ₹85,000", badge: null, badgeColor: "" },
    { icon: "👑", title: "Crowns & Bridges", desc: "CEREC CAD/CAM zirconia crowns milled in-house for same-day precision fit.", price: "₹5,000 – ₹15,000", badge: null, badgeColor: "" },
    { icon: "🌿", title: "Teeth Cleaning", desc: "Ultrasonic scaling & air polishing — the foundation of a healthy mouth.", price: "₹800 – ₹1,500", badge: "Essential", badgeColor: C.gold },
    { icon: "🧒", title: "Kids Dentistry", desc: "Fun, gentle, fearless dental care designed for children aged 2–16.", price: "₹400 – ₹3,000", badge: null, badgeColor: "" },
    { icon: "🖥️", title: "Digital Smile Design", desc: "See your new smile before treatment begins with our DSD 3D simulation.", price: "₹500 – ₹2,000", badge: "New", badgeColor: C.gold },
  ]

  return (
    <section
      id="services"
      ref={ref}
      style={{
        padding: "80px 24px",
        background: C.bgCard,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <SectionLabel>OUR SERVICES</SectionLabel>
          <SectionHeading>{`Complete Dental\nCare Solutions`}</SectionHeading>
          <p style={{ fontFamily: "var(--font-dm)", fontSize: "1rem", color: C.subtle, marginTop: 16, maxWidth: 480, margin: "16px auto 0" }}>
            From routine cleanings to full smile makeovers — precision care at every step.
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
          gap: 20,
        }}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <NoisePatternCard
                className="card-lift h-full border-zinc-800/60 hover:border-[rgba(198,167,94,0.3)] transition-colors duration-300"
              >
                <NoisePatternCardBody className="relative">
                  <GlowingEffect spread={25} blur={8} proximity={80} variant="default" />

                  {/* Badge */}
                  {service.badge && (
                    <span style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      background: `${service.badgeColor}20`,
                      color: service.badgeColor,
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-outfit)",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      padding: "3px 8px",
                      borderRadius: 4,
                      border: `1px solid ${service.badgeColor}40`,
                    }}>
                      {service.badge}
                    </span>
                  )}

                  <div style={{ fontSize: "2rem", marginBottom: 12 }}>{service.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>
                    {service.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.825rem", color: C.subtle, lineHeight: 1.6, marginBottom: 16 }}>
                    {service.desc}
                  </p>
                  <p style={{ fontFamily: "var(--font-outfit)", fontSize: "0.875rem", fontWeight: 600, color: C.gold }}>
                    {service.price}
                  </p>
                </NoisePatternCardBody>
              </NoisePatternCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── SHOWCASE SECTION (ContainerScroll) ────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function ShowcaseSection() {
  return (
    <section
      style={{
        background: C.bg,
        overflow: "hidden",
      }}
    >
      <ContainerScroll
        titleComponent={
          <div style={{ marginBottom: 24 }}>
            <SectionLabel>ADVANCED TECHNOLOGY</SectionLabel>
            <h2 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}>
              Digital Smile Design
              <br />
              <span style={{ color: C.gold }}>Preview Your New Smile</span>
            </h2>
          </div>
        }
      >
        {/* Mock dental tech dashboard */}
        <div style={{
          width: "100%",
          height: "100%",
          background: "#0D0D0D",
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${C.border}`,
        }}>
          {/* Titlebar */}
          <div style={{
            height: 44,
            background: "#161616",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 16px",
            borderBottom: `1px solid ${C.border}`,
          }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(239,68,68,0.7)" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(234,179,8,0.7)" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(34,197,94,0.7)" }} />
            <span style={{ marginLeft: 16, fontFamily: "monospace", fontSize: "0.7rem", color: C.subtle }}>
              DENTICA Digital Smile Studio v3.2
            </span>
          </div>

          {/* Dashboard content */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 16,
            padding: 20,
            height: "calc(100% - 44px)",
          }}>
            {/* Main viewport */}
            <div style={{
              background: "#111",
              borderRadius: 12,
              border: `1px solid ${C.border}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center, rgba(198,167,94,0.06) 0%, transparent 70%)",
              }} />
              <ToothIcon size={72} color="rgba(198,167,94,0.3)" />
              <p style={{ color: C.gold, fontFamily: "var(--font-outfit)", fontSize: "0.8rem", marginTop: 16, letterSpacing: "0.1em" }}>
                3D CBCT SCAN PREVIEW
              </p>
              <p style={{ color: C.subtle, fontSize: "0.7rem", marginTop: 4, fontFamily: "var(--font-dm)" }}>
                Carestream CS 9600 · Full Arch
              </p>
              {/* Grid overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `linear-gradient(rgba(198,167,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(198,167,94,0.04) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
                pointerEvents: "none",
              }} />
            </div>

            {/* Sidebar metrics */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Shade match */}
              <div style={{ background: "#111", borderRadius: 10, border: `1px solid ${C.border}`, padding: 14, flex: 1 }}>
                <p style={{ color: C.subtle, fontSize: "0.6rem", fontFamily: "var(--font-outfit)", letterSpacing: "0.12em" }}>SHADE MATCH</p>
                <p style={{ color: "#fff", fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 700, marginTop: 4 }}>A1</p>
                <div style={{ width: "100%", height: 6, background: C.border, borderRadius: 3, marginTop: 8 }}>
                  <div style={{ height: "100%", background: C.gold, borderRadius: 3, width: "92%" }} />
                </div>
                <p style={{ color: C.gold, fontSize: "0.65rem", marginTop: 4, fontFamily: "var(--font-dm)" }}>92% match accuracy</p>
              </div>

              {/* Treatment plan */}
              <div style={{ background: "#111", borderRadius: 10, border: `1px solid ${C.border}`, padding: 14, flex: 1 }}>
                <p style={{ color: C.subtle, fontSize: "0.6rem", fontFamily: "var(--font-outfit)", letterSpacing: "0.12em" }}>TREATMENT PLAN</p>
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                  {["Whitening Session", "Porcelain Veneers ×4", "Composite Bonding ×2"].map(step => (
                    <div key={step} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <CheckCircle size={11} color={C.gold} />
                      <span style={{ color: C.muted, fontSize: "0.7rem", fontFamily: "var(--font-dm)" }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div style={{ background: "#111", borderRadius: 10, border: `1px solid ${C.border}`, padding: 14, flex: 1 }}>
                <p style={{ color: C.subtle, fontSize: "0.6rem", fontFamily: "var(--font-outfit)", letterSpacing: "0.12em" }}>ESTIMATED TIMELINE</p>
                <p style={{ color: "#fff", fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 700, marginTop: 4 }}>
                  6 <span style={{ fontSize: "0.8rem", color: C.subtle, fontFamily: "var(--font-dm)" }}>weeks</span>
                </p>
              </div>

              {/* Cost estimate */}
              <div style={{ background: "rgba(198,167,94,0.06)", borderRadius: 10, border: `1px solid rgba(198,167,94,0.2)`, padding: 14, flex: 1 }}>
                <p style={{ color: C.subtle, fontSize: "0.6rem", fontFamily: "var(--font-outfit)", letterSpacing: "0.12em" }}>ESTIMATED COST</p>
                <p style={{ color: C.gold, fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 700, marginTop: 4 }}>
                  ₹42<span style={{ fontSize: "0.8rem" }}>,000</span>
                </p>
                <p style={{ color: C.subtle, fontSize: "0.6rem", marginTop: 2, fontFamily: "var(--font-dm)" }}>EMI from ₹3,500/mo</p>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── GALLERY SECTION ───────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function GallerySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.01 })

  const cases = [
    "Teeth Whitening",
    "Dental Veneers",
    "Dental Implants",
    "Braces Treatment",
    "Crown Restoration",
    "Gum Contouring",
  ]

  return (
    <section
      id="gallery"
      ref={ref}
      style={{
        padding: "80px 24px",
        background: C.bg,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <SectionLabel>SMILE GALLERY</SectionLabel>
          <SectionHeading>{`Transformations\nThat Speak`}</SectionHeading>
          <p style={{ fontFamily: "var(--font-dm)", fontSize: "1rem", color: C.subtle, marginTop: 16 }}>
            Drag the slider to see real patient transformations
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {cases.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="card-lift" style={{
                position: "relative",
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                overflow: "hidden",
              }}>
                <GlowingEffect spread={20} blur={8} proximity={80} variant="default" />
                <BeforeAfterSlider title={c} />
                <div style={{ padding: "12px 16px" }}>
                  <p style={{ fontFamily: "var(--font-outfit)", fontWeight: 600, fontSize: "0.875rem", color: "#FFFFFF" }}>{c}</p>
                  <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.75rem", color: C.subtle, marginTop: 2 }}>Drag to compare</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── DOCTOR SECTION ────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function DoctorSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.01 })

  const timeline = [
    { year: "2009", title: "BDS — Sri Venkateshwara Dental College", desc: "Graduated with distinction in oral surgery and prosthodontics." },
    { year: "2012", title: "MDS — Prosthodontics & Implantology", desc: "Advanced specialisation in full-mouth rehabilitation and aesthetics." },
    { year: "2015", title: "Founded DENTICA Clinic", desc: "Launched a state-of-the-art digital smile design studio." },
    { year: "2020", title: "Certified Invisalign Provider", desc: "One of 50 Platinum-tier certified providers in Andhra Pradesh." },
    { year: "2024", title: "Best Dentist Award — AP Health Summit", desc: "Recognised for excellence in cosmetic dentistry and patient care." },
  ]

  const specializations = ["Cosmetic Dentistry", "Dental Implants", "Invisalign", "Digital Smile Design", "Oral Surgery"]

  return (
    <section
      id="doctor"
      ref={ref}
      style={{
        padding: "80px 24px",
        background: C.bgCard,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Spotlight className="top-[10%] right-[10%]" fill={C.gold} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <SectionLabel>MEET YOUR DENTIST</SectionLabel>
          <SectionHeading>{`Your Smile Is In\nExpert Hands`}</SectionHeading>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "start" }}>
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <div style={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.bgElevated} 0%, ${C.bg} 100%)`,
              border: `3px solid rgba(198,167,94,0.4)`,
              boxShadow: "0 0 40px rgba(198,167,94,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              position: "relative",
            }}>
              <ToothIcon size={72} color="rgba(198,167,94,0.4)" />
              <div style={{
                position: "absolute",
                inset: -4,
                borderRadius: "50%",
                border: "1px solid rgba(198,167,94,0.15)",
                animation: "float-orb 4s ease-in-out infinite",
              }} />
            </div>

            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>
              Dr. Priya Sharma
            </h3>
            <p style={{ fontFamily: "var(--font-outfit)", fontSize: "0.8rem", color: C.gold, letterSpacing: "0.1em", marginBottom: 8 }}>
              BDS · MDS · FICOI
            </p>
            <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.875rem", color: C.subtle, marginBottom: 24 }}>
              Chief Dental Surgeon, DENTICA
            </p>

            <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.9rem", color: C.muted, lineHeight: 1.8, textAlign: "center", marginBottom: 24 }}>
              With over 15 years of experience and a deep commitment to pain-free,
              precision dentistry, Dr. Sharma has transformed over 5,000 smiles
              using cutting-edge technology and artistry.
            </p>

            {/* Specialization tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {specializations.map(s => (
                <span key={s} style={{
                  padding: "4px 12px",
                  borderRadius: 9999,
                  background: "rgba(198,167,94,0.08)",
                  border: "1px solid rgba(198,167,94,0.2)",
                  fontFamily: "var(--font-outfit)",
                  fontSize: "0.75rem",
                  color: C.gold,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{ position: "relative", paddingLeft: 32 }}>
              <div style={{
                position: "absolute",
                left: 5,
                top: 16,
                bottom: 0,
                width: 2,
                background: `linear-gradient(to bottom, ${C.gold}, rgba(198,167,94,0.1))`,
              }} />

              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                  className="timeline-dot"
                  style={{
                    position: "relative",
                    marginBottom: 32,
                    paddingLeft: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                    <span style={{
                      fontFamily: "var(--font-outfit)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: C.gold,
                      letterSpacing: "0.1em",
                      background: "rgba(198,167,94,0.1)",
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}>
                      {item.year}
                    </span>
                  </div>
                  <h4 style={{ fontFamily: "var(--font-outfit)", fontWeight: 600, color: "#FFFFFF", fontSize: "0.95rem", marginBottom: 4 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.825rem", color: C.subtle, lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── WHY US SECTION (GlowingEffect cards) ──────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function WhyUsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.01 })

  const features = [
    { icon: Heart, title: "100% Painless", desc: "We use topical anesthetics, The Wand™ system, and ultra-thin needles for a genuinely comfortable experience." },
    { icon: Zap, title: "Same-Day Treatment", desc: "Emergency slots reserved daily. Walk-in welcome for urgent dental care — no long waiting lists." },
    { icon: Eye, title: "Transparent Pricing", desc: "No hidden costs. You know exactly what you'll pay before any treatment begins. Period." },
    { icon: Sparkles, title: "Digital-First Care", desc: "Digital X-rays, CBCT 3D scans, app-based records, and WhatsApp follow-ups as standard." },
    { icon: Shield, title: "Hospital-Grade Sterilization", desc: "Class B autoclave sterilization, single-use instruments, and WHO-compliant infection control protocols." },
    { icon: Calendar, title: "Easy EMI Options", desc: "0% EMI on all treatments above ₹10,000 with HDFC, ICICI, Axis, and Bajaj Finserv." },
  ]

  return (
    <section
      id="why-us"
      ref={ref}
      className="grain-overlay"
      style={{
        position: "relative",
        padding: "80px 24px",
        background: `radial-gradient(ellipse at 50% 0%, rgba(198,167,94,0.04) 0%, transparent 60%), ${C.bg}`,
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <SectionLabel>WHY DENTICA</SectionLabel>
          <SectionHeading>{`Why 10,847+ Patients\nTrust Us`}</SectionHeading>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div
                  className="card-lift"
                  style={{
                    position: "relative",
                    background: `linear-gradient(135deg, ${C.bgCard} 0%, ${C.bg} 100%)`,
                    border: `1px solid ${C.border}`,
                    borderRadius: 16,
                    padding: 28,
                    height: "100%",
                    transition: "border-color 0.3s, transform 0.3s",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(198,167,94,0.3)"
                    e.currentTarget.style.transform = "translateY(-4px)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = C.border
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  <GlowingEffect spread={30} blur={12} proximity={80} variant="default" />
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "rgba(198,167,94,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                      transition: "background 0.3s, box-shadow 0.3s",
                    }}
                  >
                    <Icon size={22} color={C.gold} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-outfit)", fontWeight: 600, color: "#FFFFFF", fontSize: "1rem", marginBottom: 10 }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.875rem", color: C.subtle, lineHeight: 1.7 }}>
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── TESTIMONIALS SECTION (InfiniteSlider + Featured Card) ─────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.01 })
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const testimonials = [
    { name: "Ananya R.", initials: "AR", treatment: "Teeth Whitening", quote: "Dr. Priya is absolutely magical! My teeth are 10 shades whiter and the process was completely painless. The clinic is spotless and the staff is so warm and professional.", stars: 5 },
    { name: "Ravi Kumar", initials: "RK", treatment: "Dental Implants", quote: "After losing a tooth in an accident, I was very self-conscious. DENTICA gave me a perfect implant that looks and feels completely natural. Worth every rupee!", stars: 5 },
    { name: "Sushma P.", initials: "SP", treatment: "Invisalign", quote: "I straightened my teeth in 14 months with clear aligners — no one even knew I was wearing them! Dr. Sharma's attention to detail is exceptional.", stars: 5 },
    { name: "Mohammed I.", initials: "MI", treatment: "Root Canal", quote: "I was terrified of root canals but this was honestly the most comfortable dental experience I've ever had. Done in one sitting with zero pain.", stars: 5 },
    { name: "Deepika S.", initials: "DS", treatment: "Veneers", quote: "My smile makeover with 8 veneers transformed my life. I can't stop smiling now! The Digital Smile Design previewed exactly what I'd get.", stars: 5 },
    { name: "Kiran Babu", initials: "KB", treatment: "Cleaning & Check-up", quote: "Best dental clinic I've ever been to. Modern equipment, transparent pricing, and genuinely caring doctors. My whole family comes here now.", stars: 5 },
  ]

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive(a => (a + 1) % testimonials.length)
    }, 4000)
  }, [testimonials.length])

  useEffect(() => {
    startAutoplay()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [startAutoplay])

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{ padding: "80px 24px", background: C.bgCard }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <SectionLabel>PATIENT STORIES</SectionLabel>
          <SectionHeading>{`What Our Patients\nSay About Us`}</SectionHeading>
        </motion.div>

        {/* Large featured testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="gold-glow"
            style={{
              position: "relative",
              background: `linear-gradient(135deg, rgba(198,167,94,0.04) 0%, ${C.bg} 100%)`,
              border: "1px solid rgba(198,167,94,0.15)",
              borderRadius: 20,
              padding: "48px",
              marginBottom: 32,
              overflow: "hidden",
            }}
            onMouseEnter={() => { if (intervalRef.current) clearInterval(intervalRef.current) }}
            onMouseLeave={startAutoplay}
          >
            <GlowingEffect spread={40} blur={15} proximity={120} variant="default" />
            <div style={{
              position: "absolute",
              top: -20,
              left: 32,
              fontFamily: "var(--font-playfair)",
              fontSize: "10rem",
              color: "rgba(198,167,94,0.06)",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}>
              &ldquo;
            </div>
            <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
              {Array.from({ length: testimonials[active].stars }).map((_, j) => (
                <Star key={j} size={18} fill="#D4A853" color="#D4A853" />
              ))}
            </div>
            <p style={{
              fontFamily: "var(--font-dm)",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              color: "#FFFFFF",
              lineHeight: 1.8,
              marginBottom: 28,
              position: "relative",
              zIndex: 1,
              maxWidth: 700,
            }}>
              &ldquo;{testimonials[active].quote}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(198,167,94,0.12)",
                border: "2px solid rgba(198,167,94,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-outfit)",
                fontWeight: 700,
                color: C.gold,
                fontSize: "0.9rem",
              }}>
                {testimonials[active].initials}
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-outfit)", fontWeight: 600, color: "#FFFFFF", fontSize: "0.95rem" }}>
                  {testimonials[active].name}
                </p>
                <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.8rem", color: C.gold }}>
                  {testimonials[active].treatment}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 48 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? C.gold : C.border,
                border: "none",
                cursor: "pointer",
                transition: "width 0.3s, background 0.3s",
              }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Scrolling testimonial cards via InfiniteSlider */}
        <InfiniteSlider gap={16} duration={40}>
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                minWidth: 340,
                maxWidth: 380,
                background: C.bg,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                padding: 20,
              }}
            >
              <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                {Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={12} fill="#D4A853" color="#D4A853" />)}
              </div>
              <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.8rem", color: C.muted, lineHeight: 1.6, marginBottom: 14, minHeight: 60 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(198,167,94,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-outfit)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: C.gold,
                }}>
                  {t.initials}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-outfit)", fontSize: "0.75rem", fontWeight: 600, color: "#FFFFFF" }}>{t.name}</p>
                  <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.65rem", color: C.subtle }}>{t.treatment}</p>
                </div>
              </div>
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── STATS SECTION (ShaderAnimation background) ───────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.01 })

  const stats = [
    { value: 10847, suffix: "+", label: "Happy Patients", decimal: false },
    { value: 15, suffix: "+", label: "Years Experience", decimal: false },
    { value: 5200, suffix: "+", label: "Smile Makeovers", decimal: false },
    { value: 49, suffix: "★", label: "Google Rating", decimal: true },
  ]

  return (
    <section
      id="stats"
      ref={ref}
      style={{
        position: "relative",
        padding: "64px 24px",
        overflow: "hidden",
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      {/* ShaderAnimation WebGL background */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.2,
        zIndex: 0,
      }}>
        <ShaderAnimation />
      </div>

      {/* Dark overlay for readability */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, rgba(10,10,11,0.7) 0%, rgba(10,10,11,0.9) 100%)`,
        zIndex: 1,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48 }}>
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} inView={inView} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCounter({ stat, inView, delay }: {
  stat: { value: number; suffix: string; label: string; decimal: boolean }
  inView: boolean
  delay: number
}) {
  const count = useCountUp(stat.value, 2200, inView)
  const display = stat.decimal ? (count / 10).toFixed(1) : count.toLocaleString()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{ textAlign: "center" }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
        <span style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 700,
          color: "#FFFFFF",
          lineHeight: 1,
        }}>
          {display}
        </span>
        <span style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          fontWeight: 700,
          color: C.gold,
          lineHeight: 1,
        }}>
          {stat.suffix}
        </span>
      </div>
      <p style={{
        fontFamily: "var(--font-outfit)",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.15em",
        color: C.subtle,
        textTransform: "uppercase",
        marginTop: 12,
      }}>
        {stat.label}
      </p>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── PRICING SECTION (GlowingEffect cards) ─────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function PricingSection2() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.01 })

  return (
    <section
      id="pricing"
      ref={ref}
      style={{ padding: "80px 24px", background: C.bg }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <SectionLabel>TRANSPARENT PRICING</SectionLabel>
          <SectionHeading>{`Clear, Honest\nPricing`}</SectionHeading>
          <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.875rem", color: C.subtle, marginTop: 16 }}>
            No hidden costs. No surprises. Know exactly what you&apos;ll invest in your smile.
          </p>
        </motion.div>

        <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-4" style={{ margin: "0 auto 32px" }}>
          {DENTAL_PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              className="card-lift"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <PricingCard tier={tier} paymentFrequency="standard" />
            </motion.div>
          ))}
        </div>

        {/* EMI note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            textAlign: "center",
            padding: "16px 24px",
            background: "rgba(198,167,94,0.06)",
            border: "1px solid rgba(198,167,94,0.2)",
            borderRadius: 12,
          }}
        >
          <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.875rem", color: C.gold }}>
            💳 <strong>0% EMI available</strong> on all treatments above ₹10,000 — HDFC, ICICI, Axis, and Bajaj Finserv.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── FAQ SECTION (Accordion) ───────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.01 })

  const faqs = [
    {
      q: "Is teeth whitening safe?",
      a: "Yes, professional teeth whitening at DENTICA is completely safe. We use ADA-approved whitening agents and protect your gums throughout the procedure. The treatment is supervised by Dr. Priya Sharma and tailored to your enamel sensitivity.",
    },
    {
      q: "How long do dental implants last?",
      a: "With proper care, dental implants can last a lifetime. The titanium implant post is permanent, while the ceramic crown may need replacement after 15–20 years. We provide a 5-year warranty on all implant procedures.",
    },
    {
      q: "Are your procedures really painless?",
      a: "Absolutely. We use a combination of topical anesthetics, ultra-thin needles, and the Wand™ computer-assisted anesthesia system. Most patients report little to no pain during and after treatment. Sedation options are also available for anxious patients.",
    },
    {
      q: "Do you offer payment plans?",
      a: "Yes! We offer 0% EMI on all treatments above ₹10,000 through HDFC, ICICI, Axis Bank, and Bajaj Finserv. We also accept all major credit/debit cards, UPI, and cash. Our team can help you choose the most convenient option.",
    },
    {
      q: "How often should I visit the dentist?",
      a: "We recommend a check-up and professional cleaning every 6 months. Regular visits help us catch issues early, saving you from more complex treatments later. Patients with specific conditions like gum disease may need more frequent visits.",
    },
    {
      q: "What if I have a dental emergency?",
      a: "Call us immediately at +91 99999 99999. We reserve emergency slots daily for urgent cases like severe toothache, broken teeth, and dental trauma. WhatsApp us anytime and we'll respond within 30 minutes.",
    },
  ]

  return (
    <section
      id="faq"
      ref={ref}
      style={{ padding: "80px 24px", background: C.bgCard }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <SectionLabel>COMMON QUESTIONS</SectionLabel>
          <SectionHeading>{`Frequently Asked\nQuestions`}</SectionHeading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full" style={{ "--border": C.border } as React.CSSProperties}>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                style={{ borderColor: C.border }}
              >
                <AccordionTrigger
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontWeight: 600,
                    fontSize: "0.975rem",
                    color: "#FFFFFF",
                    textDecoration: "none",
                    paddingTop: "1.25rem",
                    paddingBottom: "1.25rem",
                  }}
                  className={`[&>svg]:text-[${C.gold}] hover:no-underline`}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  style={{
                    fontFamily: "var(--font-dm)",
                    fontSize: "0.9rem",
                    color: C.muted,
                    lineHeight: 1.8,
                  }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── BOOK APPOINTMENT SECTION ──────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
interface BookSectionProps {
  formData: {
    name: string; phone: string; email: string; service: string; date: string; time: string; message: string
  }
  setFormData: React.Dispatch<React.SetStateAction<BookSectionProps["formData"]>>
  formSuccess: boolean
  formSubmitting: boolean
  handleSubmit: (e: React.FormEvent) => void
}

function BookSection({ formData, setFormData, formSuccess, formSubmitting, handleSubmit }: BookSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.01 })

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: C.bgElevated,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    padding: "10px 14px",
    fontFamily: "var(--font-dm)",
    fontSize: "0.9rem",
    color: "#FFFFFF",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-outfit)",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: C.muted,
    marginBottom: 6,
    display: "block",
    letterSpacing: "0.05em",
  }

  return (
    <section
      id="book-appointment"
      ref={ref}
      style={{ padding: "80px 24px", background: C.bg }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <SectionLabel>BOOK YOUR VISIT</SectionLabel>
          <SectionHeading>{`Ready for Your\nBest Smile?`}</SectionHeading>
          <p style={{ fontFamily: "var(--font-dm)", fontSize: "1rem", color: C.subtle, marginTop: 16 }}>
            Book your free consultation today — we&apos;ll call you within 30 minutes.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
          {/* Left: Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* WhatsApp card */}
            <div style={{
              
              background: "rgba(37,211,102,0.08)",
              border: "1px solid rgba(37,211,102,0.25)",
              borderRadius: 16,
              padding: 24,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#25D366",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <MessageCircle size={22} color="#fff" />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, color: "#FFFFFF", fontSize: "0.975rem" }}>WhatsApp Us</p>
                  <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.8rem", color: "rgba(37,211,102,0.8)" }}>Instant response</p>
                </div>
              </div>
              <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.875rem", color: C.muted, marginBottom: 16 }}>
                Message us on WhatsApp to book an appointment, ask questions, or send photos for a free consultation.
              </p>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#25D366",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: 9999,
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Clinic info card */}
            <div className="card-lift" style={{
              position: "relative",
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: 24,
            }}>
              <GlowingEffect spread={25} blur={10} proximity={80} variant="default" />
              <h3 style={{ fontFamily: "var(--font-outfit)", fontWeight: 600, color: "#FFFFFF", marginBottom: 16, fontSize: "0.975rem" }}>
                Clinic Information
              </h3>
              {[
                { icon: MapPin, text: "123 MG Road, AP 520010" },
                { icon: Phone, text: "+91 99999 99999" },
                { icon: Mail, text: "hello@dentica.in" },
                { icon: Clock, text: "Mon–Sat: 9AM–8PM  |  Sun: 10AM–2PM" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <Icon size={16} color={C.gold} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.875rem", color: C.muted }}>{text}</span>
                </div>
              ))}

              {/* Map placeholder */}
              <div style={{
                marginTop: 16,
                height: 120,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${C.bgElevated} 0%, ${C.bgCard} 100%)`,
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={{ textAlign: "center" }}>
                  <MapPin size={24} color="rgba(198,167,94,0.3)" />
                  <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.75rem", color: C.subtle, marginTop: 6 }}>
                    Andhra Pradesh
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="gold-glow" style={{
              position: "relative",
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: 20,
              padding: 32,
            }}>
              <GlowingEffect spread={30} blur={12} proximity={100} variant="default" />
              <AnimatePresence mode="wait">
                {formSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: "center", padding: "48px 0" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: "rgba(198,167,94,0.12)",
                        border: `2px solid ${C.gold}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                      }}
                    >
                      <CheckCircle size={36} color={C.gold} />
                    </motion.div>
                    <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 12 }}>
                      Booking Received!
                    </h3>
                    <p style={{ fontFamily: "var(--font-dm)", fontSize: "1rem", color: C.muted }}>
                      We will contact you within <strong style={{ color: C.gold }}>30 minutes</strong>!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: 16 }}
                  >
                    <h3 style={{ fontFamily: "var(--font-outfit)", fontWeight: 600, color: "#FFFFFF", marginBottom: 8, fontSize: "1rem" }}>
                      Book Free Consultation
                    </h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input
                          required
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                          style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = "rgba(198,167,94,0.5)")}
                          onBlur={e => (e.target.style.borderColor = C.border)}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Phone Number *</label>
                        <input
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                          style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = "rgba(198,167,94,0.5)")}
                          onBlur={e => (e.target.style.borderColor = C.border)}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Email (optional)</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = "rgba(198,167,94,0.5)")}
                        onBlur={e => (e.target.style.borderColor = C.border)}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Service Required *</label>
                      <select
                        required
                        value={formData.service}
                        onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                        style={{ ...inputStyle, cursor: "pointer" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(198,167,94,0.5)")}
                        onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                      >
                        <option value="" style={{ background: C.bgElevated }}>Select a service</option>
                        {["Teeth Whitening", "Root Canal", "Dental Implants", "Braces & Aligners", "Crowns & Bridges", "Teeth Cleaning", "Kids Dentistry", "Digital Smile Design", "General Check-up"].map(s => (
                          <option key={s} value={s} style={{ background: C.bgElevated }}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={labelStyle}>Preferred Date</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                          style={{ ...inputStyle, colorScheme: "dark" }}
                          onFocus={e => (e.target.style.borderColor = "rgba(198,167,94,0.5)")}
                          onBlur={e => (e.target.style.borderColor = C.border)}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Preferred Time</label>
                        <select
                          value={formData.time}
                          onChange={e => setFormData(p => ({ ...p, time: e.target.value }))}
                          style={{ ...inputStyle, cursor: "pointer" }}
                          onFocus={e => (e.currentTarget.style.borderColor = "rgba(198,167,94,0.5)")}
                          onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                        >
                          <option value="" style={{ background: C.bgElevated }}>Any time</option>
                          {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"].map(t => (
                            <option key={t} value={t} style={{ background: C.bgElevated }}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Message (optional)</label>
                      <textarea
                        rows={3}
                        placeholder="Any concerns or specific questions..."
                        value={formData.message}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
                        onFocus={e => (e.target.style.borderColor = "rgba(198,167,94,0.5)")}
                        onBlur={e => (e.target.style.borderColor = C.border)}
                      />
                    </div>

                    <GoldShinyButton
                      type="submit"
                      className="w-full"
                      disabled={formSubmitting}
                      style={{
                        borderRadius: 9999,
                        padding: "14px",
                        fontFamily: "var(--font-outfit)",
                        fontWeight: 600,
                        fontSize: "1rem",
                        opacity: formSubmitting ? 0.7 : 1,
                        cursor: formSubmitting ? "not-allowed" : "pointer",
                      }}
                    >
                      {formSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }}
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Calendar size={18} />
                          Book Free Consultation
                        </>
                      )}
                    </GoldShinyButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── FOOTER SECTION ────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function FooterSection() {
  const quickLinks = ["About", "Services", "Gallery", "Doctor", "Pricing", "FAQ"]
  const quickIds = ["about", "services", "gallery", "doctor", "pricing", "faq"]
  const services = ["Teeth Whitening", "Dental Implants", "Braces & Aligners", "Root Canal", "Crowns & Bridges", "Kids Dentistry"]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer
      id="footer"
      style={{
        background: C.bg,
        borderTop: `1px solid ${C.border}`,
        padding: "80px 24px 40px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 64 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <ToothIcon size={26} />
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", fontWeight: 700, color: "#FFFFFF" }}>
                DENTICA
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.875rem", fontStyle: "italic", color: C.gold, marginBottom: 12 }}>
              &ldquo;Your Smile, Perfected.&rdquo;
            </p>
            <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.825rem", color: C.subtle, lineHeight: 1.7, marginBottom: 20 }}>
              A trusted dental clinic, combining advanced
              technology with compassionate care since 2009.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: C.bgElevated,
                    border: `1px solid ${C.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.subtle,
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(198,167,94,0.1)"; e.currentTarget.style.color = C.gold; e.currentTarget.style.borderColor = "rgba(198,167,94,0.3)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.bgElevated; e.currentTarget.style.color = C.subtle; e.currentTarget.style.borderColor = C.border }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, color: "#FFFFFF", fontSize: "0.825rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
              Quick Links
            </h4>
            {quickLinks.map((link, i) => (
              <button
                key={link}
                onClick={() => scrollTo(quickIds[i])}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "none",
                  padding: "5px 0",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm)",
                  fontSize: "0.875rem",
                  color: C.subtle,
                  transition: "color 0.2s",
                  width: "100%",
                  textAlign: "left",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = C.subtle)}
              >
                <ChevronDown size={12} style={{ transform: "rotate(-90deg)" }} />
                {link}
              </button>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, color: "#FFFFFF", fontSize: "0.825rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
              Our Services
            </h4>
            {services.map(s => (
              <button
                key={s}
                onClick={() => scrollTo("services")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "none",
                  padding: "5px 0",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm)",
                  fontSize: "0.875rem",
                  color: C.subtle,
                  transition: "color 0.2s",
                  width: "100%",
                  textAlign: "left",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = C.subtle)}
              >
                <ChevronDown size={12} style={{ transform: "rotate(-90deg)" }} />
                {s}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, color: "#FFFFFF", fontSize: "0.825rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
              Contact
            </h4>
            {[
              { icon: MapPin, text: "123 MG Road,\nAndhra Pradesh 520010" },
              { icon: Phone, text: "+91 99999 99999" },
              { icon: Mail, text: "hello@dentica.in" },
              { icon: Clock, text: "Mon–Sat 9AM–8PM\nSun 10AM–2PM" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <Icon size={15} color={C.gold} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.825rem", color: C.subtle, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gold divider */}
        <div className="gold-rule" style={{ marginBottom: 32 }} />

        {/* Bottom bar */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <p style={{ fontFamily: "var(--font-dm)", fontSize: "0.75rem", color: C.subtle }}>
            © 2026 DENTICA Dental Clinic. All rights reserved.
          </p>
          <p style={{
            fontFamily: "var(--font-dm)",
            fontSize: "0.75rem",
            color: C.muted,
            padding: "8px 16px",
            borderRadius: 9999,
            border: "1px solid rgba(198,167,94,0.2)",
            background: "rgba(198,167,94,0.05)",
          }}>
            ⚡ Demo built by{" "}
            <a
              href="#"
              style={{ color: C.gold, textDecoration: "none", fontWeight: 600 }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
            >
              Koushik AI Automation
            </a>
            {" "}| Want one like this? DM{" "}
            <a
              href="https://instagram.com/koushik_ai_automation"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: C.gold, textDecoration: "none", fontWeight: 600 }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
            >
              @koushik_ai_automation
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
