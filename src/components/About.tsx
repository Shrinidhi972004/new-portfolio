import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { stats } from '../data/portfolio'

export function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section id="about" className="py-24" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.h2
          className="text-3xl font-semibold mb-12 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent">#</span> About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
          {/* About Terminal */}
          <motion.div
            className="glass overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Terminal Header */}
            <div className="py-2 px-4 bg-primary-tertiary border-b border-gray-800">
              <span className="text-xs text-gray-500">whoami.txt</span>
            </div>

            {/* Content */}
            <div className="p-8">
              <p className="text-gray-600 italic mb-6">
                /* DevOps Engineer with a passion for automation */
              </p>
              <p className="text-gray-400 mb-6">
                I specialize in designing and implementing{' '}
                <span className="text-accent">cloud-native architectures</span>, building{' '}
                <span className="text-accent">CI/CD pipelines</span>, and creating{' '}
                <span className="text-accent">Infrastructure as Code</span> solutions that scale.
              </p>
              <p className="text-gray-400 mb-8">
                With expertise in containerization, orchestration, and observability, I help teams
                ship faster while maintaining reliability and security.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-800">
                {stats.map((stat, index) => (
                  <StatItem
                    key={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    inView={inView}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ASCII Art */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass p-6">
              <pre className="text-xs leading-tight text-accent text-center whitespace-pre">
{`┌─────────────────────┐
│  ╔═══════════════╗  │
│  ║   ◉     ◉   ║  │
│  ║      ▽      ║  │
│  ║   ╲_____╱   ║  │
│  ╚═══════════════╝  │
│    DEVOPS_HUMAN     │
│   [CAFFEINATED]     │
└─────────────────────┘`}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface StatItemProps {
  value: number
  suffix: string
  label: string
  inView: boolean
  delay: number
}

function StatItem({ value, suffix, label, inView, delay }: StatItemProps) {
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!inView || !countRef.current) return

    const target = value
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      if (countRef.current) {
        countRef.current.textContent = current.toFixed(value % 1 === 0 ? 0 : 1)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.5 + delay }}
    >
      <span className="text-3xl font-bold text-accent">
        <span ref={countRef}>0</span>
        {suffix}
      </span>
      <span className="block text-xs text-gray-600 uppercase mt-1">{label}</span>
    </motion.div>
  )
}
