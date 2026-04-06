'use client'
import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon'
import { useScroll } from '@/components/ui/use-scroll'
import { createPortal } from 'react-dom'

export function Header() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(10)

  const links = [
    { label: 'Problem',  href: '#problem'  },
    { label: 'Solution', href: '#solution' },
    { label: 'ROI',      href: '#roi'      },
  ]

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full border-b border-transparent transition-all duration-300',
        scrolled &&
          'border-[rgba(198,167,94,0.15)] bg-[#111111]/90 backdrop-blur-xl',
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8">


        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'text-[#F8F6F3]/60 hover:text-[#F8F6F3] hover:bg-white/5 rounded-full text-sm',
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#solution"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-[#F8F6F3]/60 hover:text-[#F8F6F3] hover:bg-white/5 rounded-full text-sm',
            )}
          >
            See Live Demo
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-[#111111] transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #C6A75E, #A88A45)',
              boxShadow: '0 2px 16px rgba(198,167,94,0.3)',
            }}
          >
            Book Strategy Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#F8F6F3]/70 hover:text-[#F8F6F3] hover:bg-white/5"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <MobileMenu open={open} className="flex flex-col justify-between gap-4">
        <div className="grid gap-y-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'justify-start text-[#F8F6F3]/70 hover:text-[#F8F6F3] hover:bg-white/5',
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3 pb-4">
          <a
            href="#solution"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-full border-[#C6A75E]/30 text-[#F8F6F3] bg-transparent hover:bg-[#C6A75E]/10',
            )}
          >
            See Live Demo
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="flex h-10 w-full items-center justify-center rounded-md text-sm font-semibold text-[#111111]"
            style={{ background: 'linear-gradient(135deg, #C6A75E, #A88A45)' }}
          >
            Book Strategy Call
          </a>
        </div>
      </MobileMenu>
    </header>
  )
}

type MobileMenuProps = React.ComponentProps<'div'> & { open: boolean }

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null
  return createPortal(
    <div
      id="mobile-menu"
      className="fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col border-t border-[#C6A75E]/15 bg-[#111111]/95 backdrop-blur-xl md:hidden"
    >
      <div
        data-slot={open ? 'open' : 'closed'}
        className={cn(
          'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out size-full p-5',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
