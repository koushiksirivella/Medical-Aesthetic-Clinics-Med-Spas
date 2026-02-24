'use client'

import { Suspense, lazy, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-full">
      {/* Placeholder shown until scene is ready */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
        style={{ opacity: loaded ? 0 : 1, pointerEvents: 'none' }}
      >
        <div className="w-24 h-24 rounded-full border border-[rgba(198,167,94,0.25)] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-[rgba(198,167,94,0.5)] border-t-[#C6A75E] animate-spin" />
        </div>
      </div>

      {/* Spline canvas — hidden until fully loaded */}
      <div
        className="w-full h-full transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <Suspense fallback={null}>
          <Spline
            scene={scene}
            className={className}
            onLoad={() => setLoaded(true)}
          />
        </Suspense>
      </div>
    </div>
  )
}
