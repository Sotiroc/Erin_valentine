"use client"

import { useState, useEffect } from "react"

const noMessages = [
  "No",
  "Are you sure?",
  "I think you are mistaken",
  "Really sure?",
  "Think again!",
  "You might regret this!",
  "Give it another thought!",
  "Are you being serious rn?",
  "That's not the right answer...",
  "Change your mind!",
  "But whyyy?",
  "Please reconsider!",
  "Just click Yes already!",
  "Pretty please?",
  "Pretty please with a cherry on top?",
]

interface LoveLetterProps {
  onYes: () => void
}

export function LoveLetter({ onYes }: LoveLetterProps) {
  const [show, setShow] = useState(false)
  const [noCount, setNoCount] = useState(0)
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number } | null>(null)

  const yesButtonScale = Math.min(1 + noCount * 0.12, 2.2)
  const noButtonText = noCount === 0 ? noMessages[0] : noMessages[((noCount - 1) % (noMessages.length - 1)) + 1]

  useEffect(() => {
    // Trigger slide-in animation
    const timer = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const moveNoButton = () => {
    const padding = 24
    // The button has max-width capped to viewport, so use a generous
    // width matching that cap to guarantee it stays fully visible
    const btnWidth = Math.min(350, window.innerWidth - padding * 2)
    const btnHeight = 60

    const availableX = Math.max(0, window.innerWidth - btnWidth - padding * 2)
    const availableY = Math.max(0, window.innerHeight - btnHeight - padding * 2)
    const newX = padding + Math.random() * availableX
    const newY = padding + Math.random() * availableY
    setNoButtonPosition({ x: newX, y: newY })
    setNoCount((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      <div
        className={`w-full max-w-xl mx-auto transition-all duration-700 ease-out ${
          show
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[60vh]"
        }`}
      >
        {/* Letter card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-primary/20 border border-primary/10 overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-2 bg-gradient-to-r from-pink-400 via-red-400 to-pink-400" />

          {/* Rose decoration on letter */}
          <div className="flex justify-center -mt-1 pt-4">
            <img
              src="/red_rose.png"
              alt=""
              className="w-14 h-14 md:w-18 md:h-18 opacity-80"
              draggable={false}
            />
          </div>

          {/* Letter content */}
          <div className="px-6 md:px-10 py-6 md:py-8 letter-scroll max-h-[60vh] overflow-y-auto">
            <div className="text-center space-y-5">
              <h2 className="font-script text-3xl md:text-4xl text-primary">
                Hey You
              </h2>

              <div className="space-y-4 text-foreground/85 text-base md:text-lg leading-relaxed font-light">
                <p>
                  I can’t believe how much has changed in such a short time.
                  A month ago you packed up your life, came down from Joburg,
                  and now we’re here, living our best lives in Durban.
                </p>

                <p>
                  Waking up next to you, doing life side by side,
                  and turning everyday moments into something special
                  has taught me so much about you
                  and about us.
                </p>

                <p>
                  You’re a massive a weirdo, into strange, loud, obnoxious, funny-tasting things,
                  and yet I’m still so madly in love with you
                  (even more than coconut water).
                </p>

                <p>
                  Thank you for choosing me,
                  for taking this leap with me,
                  and for making our place feel like home already.
                </p>

                <p>
                </p>
              </div>

              {/* The question */}
              <div className="pt-4 pb-2">
                <p className="font-serif text-2xl md:text-3xl text-foreground font-bold text-balance">
                  Will you be my Valentine?
                </p>
              </div>

              {/* Signature */}
              <div className="text-foreground/60">
                <p className="font-script text-xl">
                  With all my love,
                </p>
                <HeartIcon className="w-6 h-6 text-primary mx-auto my-1 animate-pulse-heart" />
                <p className="font-script text-2xl text-primary">
                  Seth Sotiralis
                </p>
              </div>
            </div>
          </div>

          {/* Decorative bottom bar */}
          <div className="h-1 bg-gradient-to-r from-pink-300 via-red-300 to-pink-300" />
        </div>

        {/* Buttons below the letter */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 relative min-h-[120px]">
          <button
            onClick={onYes}
            className="px-10 py-4 text-xl font-semibold rounded-full
                       bg-primary text-primary-foreground
                       shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40
                       active:scale-95 transition-all duration-300"
            style={{
              transform: `scale(${yesButtonScale})`,
              transition: "transform 0.3s ease-out",
            }}
          >
            Yes! &hearts;
          </button>

          <button
            onClick={moveNoButton}
            onMouseEnter={noCount >= 2 ? moveNoButton : undefined}
            className="px-8 py-4 text-lg font-semibold rounded-full
                       bg-white text-foreground/60 border-2 border-foreground/15
                       hover:bg-secondary transition-colors duration-200"
            style={noButtonPosition ? {
              position: "fixed",
              left: noButtonPosition.x,
              top: noButtonPosition.y,
              maxWidth: "calc(100vw - 48px)",
              zIndex: 50,
              transition: "left 0.2s ease-out, top 0.2s ease-out",
            } : undefined}
          >
            {noButtonText}
          </button>
        </div>

      </div>
    </div>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}
