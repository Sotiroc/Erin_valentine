"use client"

import React, { useEffect, useState, useCallback } from "react"

export function CelebrationScreen() {
  const [showMessage, setShowMessage] = useState(false)

  const launchConfetti = useCallback(async () => {
    const confetti = (await import("canvas-confetti")).default
    const duration = 4000
    const end = Date.now() + duration
    const colors = ["#f472b6", "#fb7185", "#fda4af", "#fecdd3", "#e63946", "#ff6b8a"]

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])

  useEffect(() => {
    launchConfetti()
    const timer = setTimeout(() => setShowMessage(true), 500)
    return () => clearTimeout(timer)
  }, [launchConfetti])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10">
      <div className="text-center space-y-8 max-w-lg mx-auto">
        {/* Celebration hearts */}
        <div className="relative">
          <div className="flex items-center justify-center gap-4">
            <HeartIcon
              className="w-16 h-16 text-primary animate-pulse-heart"
              style={{ animationDelay: "0s" }}
            />
            <HeartIcon
              className="w-24 h-24 md:w-28 md:h-28 text-primary animate-pulse-heart"
              style={{ animationDelay: "0.2s" }}
            />
            <HeartIcon
              className="w-16 h-16 text-primary animate-pulse-heart"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>

        {/* Main message */}
        <div
          className={`space-y-6 transition-all duration-1000 ${
            showMessage
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-serif text-foreground font-bold">
            Yay!
          </h1>

          <div className="space-y-4">
            <p className="text-2xl md:text-3xl text-foreground font-medium">
              You made me the happiest person!
            </p>
            <p className="text-muted-foreground text-lg md:text-xl">
              Happy Valentine&apos;s Day, Erin!
            </p>
            <p className="text-muted-foreground text-base">
              Can&apos;t wait to spend it with you
            </p>
          </div>

          {/* Rose */}
          <div className="pt-4">
            <img
              src="/red_rose.png"
              alt="Rose for you"
              className="w-20 h-20 md:w-28 md:h-28 mx-auto animate-gentle-bounce"
              draggable={false}
            />
          </div>

          {/* Footer hearts */}
          <div className="pt-4 flex items-center justify-center gap-3 text-primary">
            <HeartIcon className="w-5 h-5" />
            <span className="text-foreground font-serif text-lg">
              See you soon, beautiful
            </span>
            <HeartIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Extra celebration hearts */}
      <CelebrationHearts />
    </div>
  )
}

function HeartIcon({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

function CelebrationHearts() {
  const hearts = React.useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
        size: Math.random() * 22 + 12,
      })),
    []
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-primary"
          style={{
            left: `${heart.x}%`,
            bottom: `-${heart.size}px`,
            fontSize: `${heart.size}px`,
            opacity: 0.5,
            animation: `float-up 6s ease-out forwards`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <HeartIcon className="w-[1em] h-[1em]" />
        </div>
      ))}
    </div>
  )
}
