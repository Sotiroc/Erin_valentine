"use client"

interface ValentineLandingProps {
  onOpen: () => void
}

export function ValentineLanding({ onOpen }: ValentineLandingProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10">
      <div className="text-center space-y-8 max-w-lg mx-auto">
        {/* Big pulsing heart */}
        <div className="relative inline-block">
          <HeartIcon className="w-28 h-28 md:w-36 md:h-36 text-primary mx-auto animate-[pulse-heart_1.5s_ease-in-out_infinite]" />
          <Sparkles />
        </div>

        {/* Title */}
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif text-foreground font-bold text-balance">
            You Have a Valentine
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Someone has a special message for you...
          </p>
        </div>

        {/* Open button */}
        <div className="pt-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={onOpen}
            className="px-10 py-5 text-xl md:text-2xl font-serif font-semibold rounded-full
                       bg-primary text-primary-foreground
                       shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40
                       hover:scale-105 active:scale-95
                       transition-all duration-300 ease-out
                       animate-gentle-bounce"
          >
            Open Your Valentine
          </button>
        </div>

        <p className="text-muted-foreground/60 text-sm animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          Tap to reveal your message
        </p>
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

function Sparkles() {
  const positions = [
    { top: "5%", left: "0%" },
    { top: "15%", left: "92%" },
    { top: "45%", left: "-5%" },
    { top: "55%", left: "100%" },
    { top: "85%", left: "5%" },
    { top: "80%", left: "88%" },
    { top: "35%", left: "50%" },
    { top: "65%", left: "50%" },
  ]

  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-2.5 h-2.5 bg-accent rounded-full animate-[sparkle_2s_ease-in-out_infinite]"
          style={{
            top: pos.top,
            left: pos.left,
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}
    </>
  )
}
