import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DENTICA — Premium Dental Clinic | Your Smile, Perfected",
  description:
    "Premium dental clinic. Advanced cosmetic & restorative dentistry — teeth whitening, implants, braces, smile design. Book your free consultation today.",
}

export default function DentalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
