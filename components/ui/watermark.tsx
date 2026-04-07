'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'

export function Watermark() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setMousePos({
      x: (e.clientX - cx) / (rect.width / 2),
      y: (e.clientY - cy) / (rect.height / 2),
    })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  const tiltX = isHovered ? mousePos.y * -4 : 0
  const tiltY = isHovered ? mousePos.x * 6 : 0

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 left-5 z-[9999] select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '600px' }}
    >
      <div
        className="flex items-center gap-2.5 rounded-full px-4 py-2 backdrop-blur-xl"
        style={{
          background: isHovered
            ? 'rgba(17,17,17,0.85)'
            : 'rgba(17,17,17,0.65)',
          border: `1px solid ${isHovered ? 'rgba(198,167,94,0.4)' : 'rgba(248,246,243,0.08)'}`,
          boxShadow: isHovered
            ? '0 0 20px rgba(198,167,94,0.2), 0 0 40px rgba(198,167,94,0.08), 0 8px 32px rgba(0,0,0,0.4)'
            : '0 4px 16px rgba(0,0,0,0.3)',
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isHovered ? 1.04 : 1})`,
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Gold accent dot */}
        <span
          className="relative flex h-1.5 w-1.5 shrink-0"
          style={{
            filter: isHovered ? 'drop-shadow(0 0 4px rgba(198,167,94,0.8))' : 'none',
            transition: 'filter 0.4s ease',
          }}
        >
          {isHovered && (
            <span className="absolute inset-0 rounded-full bg-[#C6A75E] opacity-75 animate-ping" />
          )}
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C6A75E]" />
        </span>

        {/* Name */}
        <span
          className="text-[14px] tracking-[-0.01em] whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
            color: isHovered ? '#F8F6F3' : 'rgba(248,246,243,0.7)',
            textShadow: isHovered
              ? '0 0 12px rgba(198,167,94,0.5), 0 0 24px rgba(198,167,94,0.2)'
              : 'none',
            transition: 'color 0.4s ease, text-shadow 0.5s ease',
          }}
        >
          Koushik Dev
        </span>

        {/* Divider */}
        <span
          className="h-3 w-px shrink-0"
          style={{
            background: isHovered ? 'rgba(198,167,94,0.35)' : 'rgba(248,246,243,0.12)',
            transition: 'background 0.4s ease',
          }}
        />

        {/* WEB DEV badge */}
        <span
          className="rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            color: isHovered ? '#C6A75E' : 'rgba(248,246,243,0.5)',
            background: isHovered ? 'rgba(198,167,94,0.1)' : 'rgba(248,246,243,0.04)',
            border: `1px solid ${isHovered ? 'rgba(198,167,94,0.3)' : 'rgba(248,246,243,0.08)'}`,
            boxShadow: isHovered
              ? '0 0 8px rgba(198,167,94,0.2), inset 0 0 6px rgba(198,167,94,0.06)'
              : 'none',
            transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          Web Dev
        </span>
      </div>
    </div>
  )
}
