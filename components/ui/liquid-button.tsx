'use client'

import { useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LiquidButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
}

export function LiquidButton({
  children,
  href,
  onClick,
  className,
  variant = 'primary',
}: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const controls = useAnimation()
  const rippleId = useRef(0)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const handleClick = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const id = rippleId.current++
    setRipples((prev) => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 900)
    controls.start({ scale: [1, 0.96, 1.02, 1], transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } })
    onClick?.()
  }

  const isPrimary = variant === 'primary'

  const inner = (
    <motion.span
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={cn(
        'relative inline-flex items-center justify-center gap-2.5 overflow-hidden select-none cursor-pointer',
        'rounded-full font-semibold text-sm tracking-wide',
        isPrimary
          ? 'px-8 py-4 text-[#111111]'
          : 'px-7 py-3.5 text-[#F8F6F3]',
        className,
      )}
      style={
        isPrimary
          ? {
              background: isHovered
                ? 'linear-gradient(135deg, #D4B86A 0%, #A88A45 100%)'
                : 'linear-gradient(135deg, #C6A75E 0%, #B8943F 100%)',
              boxShadow: isHovered
                ? '0 0 0 1px rgba(198,167,94,0.6), 0 8px 48px rgba(198,167,94,0.45), 0 0 80px rgba(198,167,94,0.2)'
                : '0 0 0 1px rgba(198,167,94,0.4), 0 4px 24px rgba(198,167,94,0.3)',
              transition: 'background 0.45s ease, box-shadow 0.4s ease',
            }
          : {
              background: isHovered
                ? 'rgba(198,167,94,0.1)'
                : 'rgba(255,255,255,0.04)',
              boxShadow: isHovered
                ? '0 0 0 1px rgba(198,167,94,0.55), 0 4px 20px rgba(198,167,94,0.15)'
                : '0 0 0 1px rgba(248,246,243,0.18)',
              transition: 'background 0.4s ease, box-shadow 0.4s ease',
            }
      }
    >
      {/* SVG gooey filter */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id="liquid-goo-gold">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Morphing gold blobs (primary only) */}
      {isPrimary && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ filter: 'url(#liquid-goo-gold)' }}
        >
          {/* Blob 1 — warm gold */}
          <motion.span
            className="absolute rounded-full"
            style={{
              width: '130%',
              height: '130%',
              top: '-15%',
              left: '-15%',
              background: 'linear-gradient(135deg, #C6A75E, #D4B86A)',
              opacity: 0.95,
            }}
            animate={
              isHovered
                ? {
                    borderRadius: [
                      '60% 40% 30% 70% / 60% 30% 70% 40%',
                      '30% 60% 70% 40% / 50% 60% 30% 60%',
                      '50% 40% 60% 50% / 35% 65% 65% 35%',
                      '60% 40% 30% 70% / 60% 30% 70% 40%',
                    ],
                    scale: [1, 1.06, 1.02, 1],
                  }
                : { borderRadius: '50%', scale: 0.95 }
            }
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Blob 2 — amber offset */}
          <motion.span
            className="absolute rounded-full"
            style={{
              width: '95%',
              height: '95%',
              top: '8%',
              left: '8%',
              background: 'linear-gradient(220deg, #B8943F, #C6A75E)',
              opacity: 0.75,
            }}
            animate={
              isHovered
                ? {
                    borderRadius: [
                      '40% 60% 60% 40% / 40% 60% 40% 60%',
                      '60% 40% 40% 60% / 60% 40% 60% 40%',
                      '50% 50% 60% 40% / 50% 40% 60% 50%',
                      '40% 60% 60% 40% / 40% 60% 40% 60%',
                    ],
                    x: [-3, 5, -2, 0],
                    y: [3, -4, 2, 0],
                  }
                : { borderRadius: '50%', x: 0, y: 0 }
            }
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
        </span>
      )}

      {/* Click ripples */}
      {ripples.map(({ x, y, id }) => (
        <motion.span
          key={id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: x, top: y,
            x: '-50%', y: '-50%',
            background: isPrimary
              ? 'rgba(255,255,255,0.3)'
              : 'rgba(198,167,94,0.4)',
          }}
          initial={{ width: 0, height: 0, opacity: 0.7 }}
          animate={{ width: 320, height: 320, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Text */}
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </motion.span>
  )

  if (href) {
    return (
      <a ref={buttonRef as React.RefObject<HTMLAnchorElement>} href={href} className="inline-block">
        {inner}
      </a>
    )
  }

  return (
    <button ref={buttonRef as unknown as React.RefObject<HTMLButtonElement>} type="button" className="inline-block">
      {inner}
    </button>
  )
}
