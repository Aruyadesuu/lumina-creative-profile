import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: '120+', label: 'Projects Shipped' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '8yr', label: 'In The Field' },
]

export default function Hero() {
  const sweepRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grain-texture"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1A0D2E 0%, #0A0A0F 60%)' }}
    >
      {/* Animated violet sweep beam */}
      <div
        ref={sweepRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Primary sweep */}
        <div
          className="absolute animate-sweep"
          style={{
            width: '140%',
            height: '55%',
            top: '-10%',
            left: '-20%',
            background: 'linear-gradient(135deg, transparent 25%, rgba(123,47,224,0.07) 50%, rgba(181,79,255,0.12) 65%, rgba(123,47,224,0.05) 80%, transparent 100%)',
            filter: 'blur(40px)',
            transform: 'rotate(-15deg)',
          }}
        />
        {/* Secondary ambient orb */}
        <div
          className="absolute rounded-full animate-pulse-glow"
          style={{
            width: '600px',
            height: '600px',
            top: '-200px',
            right: '-100px',
            background: 'radial-gradient(circle, rgba(181,79,255,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Bottom accent orb */}
        <div
          className="absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            bottom: '-100px',
            left: '20%',
            background: 'radial-gradient(circle, rgba(123,47,224,0.05) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(181,79,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(181,79,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Eyebrow label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-violet-neon" />
            <span className="section-label">Digital Design Agency</span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-[82px] font-semibold leading-[1.05] tracking-[-0.03em] text-off-white mb-6 max-w-4xl">
            We craft digital{' '}
            <span className="relative inline-block">
              <span className="text-gradient">experiences</span>
              {/* Underline accent */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="4"
                viewBox="0 0 100 4"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 2 Q25 0 50 2 Q75 4 100 2"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7B2FE0" stopOpacity="0" />
                    <stop offset="40%" stopColor="#B54FFF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#7B2FE0" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{' '}
            <br className="hidden sm:block" />
            that leave a mark.
          </h1>

          {/* Subheading */}
          <p className="font-body text-muted text-lg leading-relaxed max-w-xl mb-10 font-light">
            Lumina transforms ambitious brands into unforgettable digital identities — through design systems, interfaces, and strategies built to endure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-20">
            <button
              onClick={scrollToContact}
              className="btn-primary glow-violet text-sm"
            >
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={scrollToPortfolio}
              className="btn-ghost text-sm"
            >
              View Our Work
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            {STATS.map((stat, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold text-off-white">
                  {stat.value}
                </span>
                <span className="font-body text-muted text-sm">{stat.label}</span>
                {i < STATS.length - 1 && (
                  <div className="hidden sm:block w-px h-8 bg-border ml-6" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Floating badge — desktop only */}
        <div
          className={`hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-3 transition-all duration-1000 delay-500 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          <div className="card-glass p-6 animate-float glow-violet w-[200px] text-center">
            <div className="w-10 h-10 rounded-full bg-violet-glow border border-violet-neon/30 flex items-center justify-center mx-auto mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B54FFF" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <p className="font-display text-off-white text-sm font-medium">Award-winning</p>
            <p className="font-body text-muted text-xs mt-1">Awwwards & CSS Design Awards</p>
          </div>
        </div>
      </div>

      {/* Bottom divider fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0F)' }}
      />
    </section>
  )
}
