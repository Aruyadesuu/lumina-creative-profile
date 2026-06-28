import { useEffect, useRef, useState } from 'react'

const SERVICES_OPTIONS = ['UI/UX Design', 'Web Development', 'Brand Identity', 'Full Package', 'Something Else']
const BUDGET_OPTIONS = ['< $5K', '$5K – $15K', '$15K – $50K', '$50K+', 'Let\'s discuss']

function InputError({ message }) {
  if (!message) return null
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-red-400 text-xs font-body">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </p>
  )
}

const CONTACT_INFO = [
  {
    label: 'Email',
    value: 'hello@luminacreative.io',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B54FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Based in',
    value: 'Jakarta & Remote Worldwide',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B54FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: 'Response time',
    value: 'Within 24 hours',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B54FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

export default function Contact() {
  const headerRef = useRef(null)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.15 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  const validate = (data) => {
    const errs = {}
    if (!data.name.trim()) errs.name = 'Your name is required.'
    if (!data.email.trim()) {
      errs.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!data.service) errs.service = 'Please select a service.'
    if (!data.message.trim()) {
      errs.message = 'Tell us about your project.'
    } else if (data.message.trim().length < 20) {
      errs.message = 'Please add a bit more detail (min. 20 chars).'
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Live re-validate field if already touched
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value })
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] || '' }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const newErrors = validate(form)
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] || '' }))
  }

  const handleServiceSelect = (service) => {
    setForm((prev) => ({ ...prev, service }))
    if (touched.service) {
      setErrors((prev) => ({ ...prev, service: '' }))
    }
  }

  const handleBudgetSelect = (budget) => {
    setForm((prev) => ({ ...prev, budget }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]))
    setTouched(allTouched)
    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="contact" className="relative py-28 lg:py-36">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-violet-glow border border-violet-neon/40 flex items-center justify-center mx-auto mb-6 glow-violet">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B54FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-display text-3xl font-semibold text-off-white mb-3 tracking-tight">
              Message received.
            </h3>
            <p className="font-body text-muted text-base max-w-sm mx-auto">
              We'll review your project brief and reach out within 24 hours. Keep an eye on your inbox.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' }); setTouched({}); setErrors({}) }}
              className="mt-8 btn-ghost text-sm"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="relative py-28 lg:py-36">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(123,47,224,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-14 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-violet-neon" />
            <span className="section-label">Get In Touch</span>
          </div>
          <h2 className="section-title text-4xl sm:text-5xl font-semibold tracking-[-0.02em] max-w-xl">
            Let's build something{' '}
            <span className="text-gradient">worth remembering</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left: Contact info */}
          <div
            className={`lg:col-span-2 flex flex-col gap-8 transition-all duration-700 delay-100 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="font-body text-muted text-sm leading-relaxed">
              Whether you have a fully-formed project brief or just a rough idea — we want to hear it. Fill in the form and we'll set up an intro call.
            </p>

            <div className="divider" />

            <div className="flex flex-col gap-5">
              {CONTACT_INFO.map((info) => (
                <div key={info.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-glow border border-violet-neon/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {info.icon}
                  </div>
                  <div>
                    <p className="font-body text-muted text-xs mb-0.5">{info.label}</p>
                    <p className="font-body text-off-white text-sm">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider" />

            <div>
              <p className="font-body text-muted text-xs mb-4 uppercase tracking-widest">Follow Us</p>
              <div className="flex gap-3">
                {['Twitter / X', 'Dribbble', 'LinkedIn'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="font-body text-muted text-xs border border-border rounded-full px-3 py-1.5 hover:border-violet-neon/40 hover:text-violet-neon transition-colors duration-200"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-body text-muted text-xs mb-2 block">
                    Full Name <span className="text-violet-neon">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Alex Johnson"
                    className={`input-field ${errors.name ? 'input-error' : ''}`}
                  />
                  <InputError message={errors.name} />
                </div>
                <div>
                  <label className="font-body text-muted text-xs mb-2 block">
                    Email Address <span className="text-violet-neon">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="alex@company.com"
                    className={`input-field ${errors.email ? 'input-error' : ''}`}
                  />
                  <InputError message={errors.email} />
                </div>
              </div>

              {/* Company (optional) */}
              <div>
                <label className="font-body text-muted text-xs mb-2 block">
                  Company / Startup <span className="text-border text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="input-field"
                />
              </div>

              {/* Service selector */}
              <div>
                <label className="font-body text-muted text-xs mb-2 block">
                  Service Needed <span className="text-violet-neon">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleServiceSelect(opt)}
                      className={`font-body text-xs px-3.5 py-2 rounded-full border transition-all duration-200 ${
                        form.service === opt
                          ? 'bg-violet-neon text-void border-violet-neon font-medium'
                          : 'border-border text-muted hover:border-violet-neon/40 hover:text-off-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <InputError message={errors.service} />
              </div>

              {/* Budget selector */}
              <div>
                <label className="font-body text-muted text-xs mb-2 block">
                  Estimated Budget <span className="text-border text-xs">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleBudgetSelect(opt)}
                      className={`font-body text-xs px-3.5 py-2 rounded-full border transition-all duration-200 ${
                        form.budget === opt
                          ? 'bg-surface-2 text-violet-neon border-violet-neon/60'
                          : 'border-border text-muted hover:border-violet-neon/30 hover:text-off-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="font-body text-muted text-xs mb-2 block">
                  Project Brief <span className="text-violet-neon">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={5}
                  placeholder="Tell us what you're building, what stage you're at, and what you need help with..."
                  className={`input-field resize-none leading-relaxed ${errors.message ? 'input-error' : ''}`}
                />
                <div className="flex items-start justify-between mt-1">
                  <InputError message={errors.message} />
                  <span className="font-body text-border text-xs ml-auto">
                    {form.message.length} / 500
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary justify-center text-sm py-4 mt-1 glow-violet transition-all duration-300 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Send Brief
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>

              <p className="font-body text-border text-xs text-center">
                No spam, no sales calls. We read every message personally.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
