"use client"

import { useState } from "react"
import { FloatingHearts } from "@/components/floating-hearts"
import { ValentineLanding } from "@/components/valentine-landing"
import { LoveLetter } from "@/components/love-letter"
import { CelebrationScreen } from "@/components/celebration-screen"

type Phase = "landing" | "letter" | "celebration"

export default function ValentinePage() {
  const [phase, setPhase] = useState<Phase>("landing")

  return (
    <main className="min-h-screen bg-background overflow-hidden relative">
      <FloatingHearts />

      {/* Rose decorations - always visible */}
      <div className="fixed top-4 left-4 z-[2] pointer-events-none animate-rose-sway">
        <img
          src="/red_rose.png"
          alt=""
          className="w-16 h-16 md:w-24 md:h-24 opacity-70 -rotate-12"
          draggable={false}
        />
      </div>
      <div className="fixed top-4 right-4 z-[2] pointer-events-none animate-rose-sway" style={{ animationDelay: "1s" }}>
        <img
          src="/red_rose.png"
          alt=""
          className="w-16 h-16 md:w-24 md:h-24 opacity-70 rotate-12"
          draggable={false}
        />
      </div>
      <div className="fixed bottom-4 left-4 z-[2] pointer-events-none animate-rose-sway" style={{ animationDelay: "0.5s" }}>
        <img
          src="/red_rose.png"
          alt=""
          className="w-14 h-14 md:w-20 md:h-20 opacity-60 rotate-[200deg]"
          draggable={false}
        />
      </div>
      <div className="fixed bottom-4 right-4 z-[2] pointer-events-none animate-rose-sway" style={{ animationDelay: "1.5s" }}>
        <img
          src="/red_rose.png"
          alt=""
          className="w-14 h-14 md:w-20 md:h-20 opacity-60 rotate-[160deg]"
          draggable={false}
        />
      </div>

      {phase === "landing" && (
        <ValentineLanding onOpen={() => setPhase("letter")} />
      )}

      {phase === "letter" && (
        <LoveLetter onYes={() => setPhase("celebration")} />
      )}

      {phase === "celebration" && <CelebrationScreen />}
    </main>
  )
}
