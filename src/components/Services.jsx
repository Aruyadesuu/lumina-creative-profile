import { useEffect, useRef, useState } from 'react'

const SERVICES = [
  {
    id: '01',
    title: 'UI/UX Design',
    tagline: 'Interfaces that think ahead.',
    description:
      'We design systems that feel intuitive before the user has time to think. From zero-to-one product design to complex design systems — every pixel is intentional.',
    features: ['User Research & Personas', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B54FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    accent: 'from-violet-deep/20 to-transparent',
  },
  {
    id: '02',
    title: 'Web Development',
    tagline: 'Code that performs under pressure.',
    description:
      'Production-grade web applications built with modern stacks. Performance, accessibility, and scalability aren\'t afterthoughts — they\'re the foundation.',
    features: ['React / Next.js Builds', 'Performance Optimization', 'API Integration', 'Animation & Interaction'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B54FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    accent: 'from-violet-neon/20 to-transparent',
  },
  {
    id: '03',
    title: 'Brand Identity',
    tagline: 'Identity with staying power.',
    description:
      'Brand systems built to evolve with your company. We go beyond logos — we define the visual language, voice, and spatial presence of your entire brand.',
    features: ['Logo & Mark Design', 'Brand Guidelines', 'Motion Identity', 'Print & Digital Assets'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B54FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    accent: 'from-violet-deep/20 to-transparent',
  },
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`card-glass group relative overflow-hidden transition-all duration-700 hover:border-violet-neon/30 hover:-translate-y-1 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Top gradient accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        style={{ background: 'linear-gradient(90deg, transparent, #B54FFF, transparent)' }}
      />

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-11 h-11 rounded-xl bg-violet-glow border border-violet-neon/20 flex items-center justify-center group-hover:border-violet-neon/50 transition-colors duration-300">
            {service.icon}
          </div>
          <span className="font-display text-[11px] font-medium text-border tracking-[0.2em] mt-1">
            {service.id}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-semibold text-off-white mb-1 tracking-tight">
          {service.title}
        </h3>
        <p className="font-body text-violet-neon text-sm mb-4 font-light italic">
          {service.tagline}
        </p>

        {/* Divider */}
        <div className="divider mb-5" />

        {/* Description */}
        <p className="font-body text-muted text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Feature list */}
        <ul className="flex flex-col gap-2.5">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2.5">
              <div className="w-1 h-1 rounded-full bg-violet-neon flex-shrink-0" />
              <span className="font-body text-muted text-xs">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom CTA on hover */}
      <div className="px-8 pb-7 -mt-1">
        <button className="flex items-center gap-1.5 text-violet-neon text-xs font-display font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
          Learn more
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function Services() {
  const headerRef = useRef(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.2 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="relative py-28 lg:py-36">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(123,47,224,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-violet-neon" />
            <span className="section-label">What We Do</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="section-title text-4xl sm:text-5xl font-semibold max-w-lg leading-tight tracking-[-0.02em]">
              Services built for
              <br />
              <span className="text-gradient">impact at every scale</span>
            </h2>
            <p className="font-body text-muted text-sm leading-relaxed max-w-xs lg:text-right">
              Three disciplines. One unified vision. All executed by a team obsessed with quality.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div
          className={`mt-12 card-glass p-8 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-700 delay-500 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <p className="font-display text-off-white font-medium mb-1">
              Need something custom?
            </p>
            <p className="font-body text-muted text-sm">
              We take on specialized projects beyond our core services.
            </p>
          </div>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-ghost text-sm whitespace-nowrap"
          >
            Let's Talk
          </button>
        </div>
      </div>
    </section>
  )
}
