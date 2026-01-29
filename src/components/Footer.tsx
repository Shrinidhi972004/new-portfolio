import { useState, useEffect } from 'react'

export function Footer() {
  const [uptime, setUptime] = useState(0)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <div className="text-xs text-accent mb-6 overflow-hidden">
            ═══════════════════════════════════════════════════════════════
          </div>
          <p className="text-sm text-gray-400 mb-4">
            <span className="text-gray-600">// Built with</span>{' '}
            <span className="text-accent">React</span>,{' '}
            <span className="text-accent">TypeScript</span> &{' '}
            <span className="text-accent">TailwindCSS</span>
          </p>
          <p className="text-xs text-gray-600">
            © {currentYear} Shrinidhi |{' '}
            <span className="text-accent">
              System Uptime: {formatUptime(uptime)}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
