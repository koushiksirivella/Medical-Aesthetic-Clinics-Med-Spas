'use client'

import React from 'react'

interface GoldShinyButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

export function GoldShinyButton({
  children,
  className = '',
  href,
  type = 'button',
  disabled,
  onClick,
  style,
}: GoldShinyButtonProps) {
  const cls = `shiny-gold-btn ${className}`

  if (href) {
    return (
      <a href={href} className={cls} style={style}>
        <span className="shiny-inner">{children}</span>
      </a>
    )
  }

  const isFullWidth = className.includes('w-full')

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cls}
      style={{ ...(isFullWidth ? { display: 'flex', width: '100%' } : {}), ...style }}
    >
      <span className="shiny-inner">{children}</span>
    </button>
  )
}
