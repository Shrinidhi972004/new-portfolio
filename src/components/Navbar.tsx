import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore, playClickSound } from '../store/themeStore'

const navLinks = [
  { href: '#about', label: './about' },
  { href: '#skills', label: './skills' },
  { href: '#projects', label: './projects' },
  { href: '#contact', label: './contact' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, soundEnabled, toggleTheme, toggleSound } = useThemeStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    playClickSound()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleThemeToggle = () => {
    playClickSound()
    toggleTheme()
  }

  const handleSoundToggle = () => {
    // Play sound before toggling so user hears feedback when turning off
    if (soundEnabled) {
      playClickSound()
    }
    toggleSound()
    // Play sound after toggling if turning on
    if (!soundEnabled) {
      setTimeout(() => playClickSound(), 50)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] py-4 transition-all duration-300 ${
        isScrolled ? 'glass' : ''
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-lg font-semibold text-gray-200 hover:text-accent transition-colors"
          aria-label="Home"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="text-accent">[</span>
          <span className="dark:text-gray-200 text-gray-900 hover:text-accent transition-colors">
            devops
          </span>
          <span className="text-accent">]</span>
        </a>

        {/* System Status */}
        <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
          <span>System Healthy</span>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 border-none bg-transparent cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <div className="relative w-6 h-0.5 bg-accent transition-all">
            <span
              className={`absolute w-6 h-0.5 bg-accent transition-all ${
                isMenuOpen ? 'top-0 rotate-45' : '-top-2'
              }`}
            />
            <span
              className={`absolute w-6 h-0.5 bg-accent transition-all ${
                isMenuOpen ? 'top-0 -rotate-45' : 'top-2'
              }`}
            />
          </div>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 list-none" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                role="menuitem"
                className="text-gray-400 text-sm hover:text-accent transition-colors relative
                         after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px]
                         after:bg-accent after:transition-all hover:after:w-full"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li role="none">
            <button
              className="px-3 py-1.5 border border-gray-700 rounded text-gray-200 hover:border-accent hover:text-accent transition-all"
              onClick={handleThemeToggle}
              aria-label="Toggle dark/light mode"
              title="Toggle theme"
            >
              {theme === 'dark' ? '◐' : '◑'}
            </button>
          </li>
          <li role="none">
            <button
              className="px-3 py-1.5 border border-gray-700 rounded text-gray-200 hover:border-accent hover:text-accent transition-all"
              onClick={handleSoundToggle}
              aria-label="Toggle sound effects"
              title="Toggle sound"
            >
              {soundEnabled ? '♪' : '♪̶'}
            </button>
          </li>
        </ul>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 right-0 glass flex flex-col items-center gap-4 py-6 list-none md:hidden"
              role="menubar"
            >
              {navLinks.map((link) => (
                <li key={link.href} role="none">
                  <a
                    href={link.href}
                    role="menuitem"
                    className="text-gray-400 text-sm hover:text-accent transition-colors"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li role="none" className="flex gap-4">
                <button
                  className="px-3 py-1.5 border border-gray-700 rounded text-gray-200 hover:border-accent hover:text-accent transition-all"
                  onClick={handleThemeToggle}
                  aria-label="Toggle dark/light mode"
                >
                  {theme === 'dark' ? '◐' : '◑'}
                </button>
                <button
                  className="px-3 py-1.5 border border-gray-700 rounded text-gray-200 hover:border-accent hover:text-accent transition-all"
                  onClick={handleSoundToggle}
                  aria-label="Toggle sound effects"
                >
                  {soundEnabled ? '♪' : '♪̶'}
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
