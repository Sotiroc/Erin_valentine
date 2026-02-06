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
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })

  const yesButtonScale = Math.min(1 + noCount * 0.12, 2.2)
  const noButtonText = noCount === 0 ? noMessages[0] : noMessages[((noCount - 1) % (noMessages.length - 1)) + 1]

  useEffect(() => {
    // Trigger slide-in animation
    const timer = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const moveNoButton = () => {
    // Clamp to viewport so the button never flies off screen
    const btnWidth = 200
    const btnHeight = 56
    const padding = 16
    const maxX = (window.innerWidth - btnWidth) / 2 - padding
    const maxY = (window.innerHeight - btnHeight) / 2 - padding
    const clampedMaxX = Math.max(40, maxX)
    const clampedMaxY = Math.max(40, maxY)

    const newX = (Math.random() - 0.5) * clampedMaxX * 2
    const newY = (Math.random() - 0.5) * clampedMaxY * 2
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
                My Dearest Erin,
              </h2>

              <div className="space-y-4 text-foreground/85 text-base md:text-lg leading-relaxed font-light">
                <p>
                  From the very first moment I met you, I knew there was something
                  extraordinary about you. Your smile has this way of lighting up
                  an entire room, and your laugh is the kind of melody that I never
                  want to stop hearing.
                </p>

                <p>
                  Every day with you feels like a gift I didn&apos;t know I deserved.
                  You have this incredible ability to make the ordinary feel magical,
                  and the simplest moments with you become my favorite memories.
                  Whether we&apos;re talking for hours or just sitting in comfortable
                  silence, everything feels right when I&apos;m with you.
                </p>

                <p>
                  You are my favorite person to talk to, my favorite person to laugh with,
                  and my favorite person to simply be around. You make me want to be
                  the best version of myself, and I hope I can make you even half as
                  happy as you make me.
                </p>

                <p>
                  I love the way your eyes light up when you talk about the things
                  you&apos;re passionate about. I love how kind and thoughtful you are
                  with everyone around you. I love every little thing about you,
                  even the things you might not love about yourself.
                </p>

                <p>
                  On this Valentine&apos;s Day, I want you to know that you are my
                  favorite person, my best adventure, my greatest blessing, and
                  the love of my life. There is no one else I would rather share
                  this journey with.
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
                  Forever Yours
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
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: "transform 0.2s ease-out",
            }}
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
