export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 bg-violet-neon rounded-sm rotate-45" />
            <div className="absolute inset-[2px] bg-void rounded-sm rotate-45" />
          </div>
          <span className="font-display font-semibold text-off-white tracking-tight text-sm">
            Lumina<span className="text-violet-neon">.</span>
          </span>
        </div>

        <p className="font-body text-muted text-xs text-center">
          © {currentYear} Lumina Creative. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {['Privacy', 'Terms', 'Cookies'].map((item) => (
            <a key={item} href="#" className="font-body text-muted text-xs hover:text-off-white transition-colors duration-200">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
