import { useEffect, useRef, useState } from 'react'

const PORTFOLIO = [
  {
    id: 1,
    title: 'Nexus Finance',
    category: 'Web App · UI/UX',
    description: 'Complete design system and dashboard for a fintech startup managing $2B+ in transactions.',
    span: 'lg:col-span-2',
    height: 'h-72 lg:h-80',
    color: ['#0D0D1A', '#1A0D2E', '#2D1B4E'],
    accentColor: '#B54FFF',
    icon: '◈',
  },
  {
    id: 2,
    title: 'Aura Wellness',
    category: 'Branding',
    description: 'Holistic brand identity for a wellness platform with 400K monthly users.',
    span: 'lg:col-span-1',
    height: 'h-72 lg:h-80',
    color: ['#0A0F1A', '#0D1A2E', '#1A2B4E'],
    accentColor: '#7B2FE0',
    icon: '◎',
  },
  {
    id: 3,
    title: 'Orbit CMS',
    category: 'Web Dev · React',
    description: 'Headless CMS with real-time collaboration — built from scratch in 8 weeks.',
    span: 'lg:col-span-1',
    height: 'h-72',
    color: ['#0F0A1A', '#1A0D24', '#2E1A3D'],
    accentColor: '#9333EA',
    icon: '⬡',
  },
  {
    id: 4,
    title: 'Terrain Maps',
    category: 'UI/UX · Web',
    description: 'Interactive geospatial visualization tool for environmental researchers.',
    span: 'lg:col-span-1',
    height: 'h-72',
    color: ['#0A0F0D', '#0D1A14', '#1A2E1D'],
    accentColor: '#A855F7',
    icon: '▣',
  },
  {
    id: 5,
    title: 'Pulse Studio',
    category: 'Branding · Web',
    description: 'Full creative direction for a music production studio — from brand to digital.',
    span: 'lg:col-span-2',
    height: 'h-72',
    color: ['#1A0A0D', '#2E0D14', '#4E1A1D'],
    accentColor: '#C026D3',
    icon: '◉',
  },
]

// SVG placeholder that visually suggests a design project
function ProjectVisual({ project }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 30% 40%, ${project.color[1]} 0%, ${project.color[0]} 60%, ${project.color[0]} 100%)`,
      }}
    >
      {/* Abstract geometric background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={project.accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={project.accentColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid */}
        <pattern id={`grid-${project.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={project.accentColor} strokeWidth="0.4" strokeOpacity="0.3" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
        {/* Geometric shapes */}
        <circle cx="320" cy="60" r="80" fill="none" stroke={project.accentColor} strokeWidth="0.8" strokeOpacity="0.4" />
        <circle cx="320" cy="60" r="50" fill="none" stroke={project.accentColor} strokeWidth="0.5" strokeOpacity="0.3" />
        <rect x="40" y="120" width="120" height="80" rx="8" fill={`url(#grad-${project.id})`} />
        <rect x="180" y="160" width="80" height="12" rx="6" fill={project.accentColor} fillOpacity="0.3" />
        <rect x="180" y="180" width="120" height="8" rx="4" fill={project.accentColor} fillOpacity="0.15" />
        <rect x="180" y="196" width="100" height="8" rx="4" fill={project.accentColor} fillOpacity="0.1" />
        {/* Decorative lines */}
        <line x1="40" y1="80" x2="200" y2="80" stroke={project.accentColor} strokeWidth="0.5" strokeOpacity="0.25" />
        <line x1="40" y1="240" x2="360" y2="240" stroke={project.accentColor} strokeWidth="0.5" strokeOpacity="0.2" />
      </svg>

      {/* Center icon */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{
            background: `rgba(${parseInt(project.accentColor.slice(1, 3), 16)}, ${parseInt(project.accentColor.slice(3, 5), 16)}, ${parseInt(project.accentColor.slice(5, 7), 16)}, 0.15)`,
            border: `1px solid ${project.accentColor}33`,
          }}
        >
          <span style={{ color: project.accentColor }}>{project.icon}</span>
        </div>
        <span
          className="font-display text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            color: project.accentColor,
            background: `${project.accentColor}18`,
            border: `1px solid ${project.accentColor}30`,
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, ${project.color[0]}CC 100%)`,
        }}
      />
    </div>
  )
}

function PortfolioCard({ project, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${project.span} ${project.height} relative rounded-2xl overflow-hidden border border-border cursor-pointer transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } hover:border-violet-neon/40`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual placeholder */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
      >
        <ProjectVisual project={project} />
      </div>

      {/* Hover overlay with info */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-400"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.7) 50%, rgba(10,10,15,0.1) 100%)'
            : 'linear-gradient(to top, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.3) 50%, transparent 100%)',
        }}
      >
        <div
          className="transition-all duration-400"
          style={{
            transform: hovered ? 'translateY(0)' : 'translateY(4px)',
            opacity: 1,
          }}
        >
          <span className="section-label text-[10px] mb-2 block">{project.category}</span>
          <h3 className="font-display text-xl font-semibold text-off-white tracking-tight mb-2">
            {project.title}
          </h3>
          <p
            className="font-body text-muted text-xs leading-relaxed transition-all duration-400"
            style={{
              maxHeight: hovered ? '60px' : '0px',
              opacity: hovered ? 1 : 0,
              overflow: 'hidden',
            }}
          >
            {project.description}
          </p>
        </div>

        {/* View arrow */}
        <div
          className="mt-4 flex items-center gap-2 transition-all duration-400"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
          }}
        >
          <span className="font-display text-violet-neon text-xs font-medium">View Case Study</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B54FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
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
    <section id="portfolio" className="relative py-28 lg:py-36 bg-surface">
      {/* Top border fade */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #2A2A38 30%, #B54FFF44 50%, #2A2A38 70%, transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-violet-neon" />
            <span className="section-label">Selected Work</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="section-title text-4xl sm:text-5xl font-semibold tracking-[-0.02em]">
              Projects that moved{' '}
              <span className="text-gradient">the needle</span>
            </h2>
            <p className="font-body text-muted text-sm max-w-xs lg:text-right">
              A curated selection of work we're proud to put our name on.
            </p>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PORTFOLIO.map((project, i) => (
            <PortfolioCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all button */}
        <div
          className={`mt-10 flex justify-center transition-all duration-700 delay-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button className="btn-ghost text-sm group">
            View All Projects
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #2A2A38 30%, #B54FFF44 50%, #2A2A38 70%, transparent)' }}
      />
    </section>
  )
}
