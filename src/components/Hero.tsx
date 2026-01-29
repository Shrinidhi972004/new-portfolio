import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { terminalLines } from '../data/portfolio'
import { playClickSound } from '../store/themeStore'

interface TerminalLine {
  type: string
  text: string
  delay: number
}

export function Hero() {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([])
  const [showHeroContent, setShowHeroContent] = useState(false)
  const [terminalComplete, setTerminalComplete] = useState(false)

  const typeLines = useCallback(async () => {
    for (let i = 0; i < terminalLines.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, terminalLines[i].delay))
      setDisplayedLines((prev) => [...prev, terminalLines[i]])
    }
    setTerminalComplete(true)
    setTimeout(() => setShowHeroContent(true), 500)
  }, [])

  useEffect(() => {
    typeLines()
  }, [typeLines])

  return (
    <header
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative"
    >
      {/* Terminal Window */}
      <AnimatePresence>
        {!showHeroContent && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[700px] glass mb-12"
          >
            {/* Terminal Header */}
            <div className="flex items-center p-4 bg-primary-tertiary border-b border-gray-800 rounded-t-lg">
              <div className="flex gap-2 mr-4">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27ca40]" />
              </div>
              <span className="text-xs text-gray-500 flex-1 text-center">
                system_diagnostics.sh
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 min-h-[200px] text-sm leading-[1.8]">
              <div className="mb-4 max-h-[300px] overflow-y-auto">
                {displayedLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`terminal-line ${line.type}`}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </div>
              {!terminalComplete && (
                <div className="flex items-center gap-2">
                  <span className="text-accent">$</span>
                  <span className="animate-blink text-accent">_</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <AnimatePresence>
        {showHeroContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.p
              className="text-lg text-gray-500 mb-4 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative">
                // Hello, World
                <span className="absolute left-0 top-0 opacity-80 text-red-500 animate-glitch-1 clip-path-[polygon(0_0,100%_0,100%_45%,0_45%)]">
                  // Hello, World
                </span>
                <span className="absolute left-0 top-0 opacity-80 text-cyan-400 animate-glitch-2 clip-path-[polygon(0_55%,100%_55%,100%_100%,0_100%)]">
                  // Hello, World
                </span>
              </span>
            </motion.p>

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              I'm <span className="text-accent">Shrinidhi</span>
            </motion.h1>

            <motion.h2
              className="text-2xl font-normal text-gray-500 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-accent">{'{'}</span>
              <span className="mx-2">DevOps Engineer</span>
              <span className="text-accent">{'}'}</span>
            </motion.h2>

            <motion.p
              className="text-base text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Building resilient infrastructure & automating everything
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="#projects"
                className="btn-primary glitch-btn"
                onClick={(e) => {
                  e.preventDefault()
                  playClickSound()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>View Projects</span>
              </a>
              <a
                href="#contact"
                className="btn-secondary glitch-btn"
                onClick={(e) => {
                  e.preventDefault()
                  playClickSound()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>Get In Touch</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: showHeroContent ? 1 : 0 }}
        transition={{ delay: 1 }}
      >
        <span>scroll</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ↓
        </motion.span>
      </motion.div>
    </header>
  )
}
