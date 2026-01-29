import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '../data/portfolio'
import { Skill } from '../types'

export function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="skills" className="py-24" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.h2
          className="text-3xl font-semibold mb-12 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent">#</span> Infrastructure Stack
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(150px,auto)]">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface SkillCardProps {
  skill: Skill
  index: number
  inView: boolean
}

function SkillCard({ skill, index, inView }: SkillCardProps) {
  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1 sm:col-span-2',
    large: 'col-span-1 sm:col-span-2',
  }

  return (
    <motion.div
      className={`bento-card glass ${sizeClasses[skill.size]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="text-xl">{skill.icon}</span>
        <h3 className="text-base font-semibold flex-1">{skill.title}</h3>
        {skill.status && (
          <span className="text-xs px-2 py-1 rounded uppercase bg-accent-dim text-accent">
            {skill.status}
          </span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {skill.tags.map((tag) => (
          <span key={tag} className="skill-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Metric */}
      {skill.metric && (
        <div className="mt-6 pt-4 border-t border-gray-800">
          <span className="text-2xl font-bold text-accent">{skill.metric.value}</span>
          <span className="block text-xs text-gray-600">{skill.metric.label}</span>
        </div>
      )}

      {/* Cloud Badges */}
      {skill.cloudBadges && (
        <div className="flex gap-2 mt-4">
          {skill.cloudBadges.map((badge) => (
            <span key={badge.name} className={`cloud-badge ${badge.type}`}>
              {badge.name}
            </span>
          ))}
        </div>
      )}

      {/* Chart */}
      {skill.showChart && (
        <div className="flex items-end gap-1 h-16 mt-6">
          {[60, 80, 45, 90, 70, 85, 95].map((height, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-accent rounded-t"
              initial={{ height: 0 }}
              animate={inView ? { height: `${height}%` } : { height: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
