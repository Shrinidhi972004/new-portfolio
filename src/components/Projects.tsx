import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projects } from '../data/portfolio'
import { Project } from '../types'
import { playClickSound } from '../store/themeStore'

export function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="projects" className="py-24" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.h2
          className="text-3xl font-semibold mb-12 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent">#</span> Project Case Studies
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  inView: boolean
}

function ProjectCard({ project, index, inView }: ProjectCardProps) {
  return (
    <motion.article
      className="project-card glass"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="text-xs px-2 py-1 rounded bg-accent-dim text-accent inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-glow" />
            {project.badges.live}
          </span>
          <span className="text-xs px-2 py-1 rounded bg-primary-tertiary text-gray-400 border border-gray-800">
            {project.badges.tech}
          </span>
        </div>
        <h3 className="text-xl font-semibold">{project.title}</h3>
      </div>

      {/* Architecture Diagram */}
      <div className="p-4 bg-primary-tertiary">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {project.architecture.nodes.map((node, i) => (
            <span key={node} className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-primary-secondary border border-accent rounded text-xs text-accent">
                {node}
              </span>
              {project.architecture.arrows[i] && (
                <span className="text-gray-600 text-lg">{project.architecture.arrows[i]}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="p-6">
        <p className="text-gray-400">{project.description}</p>
      </div>

      {/* Challenges */}
      <div className="px-6">
        <h4 className="text-sm font-semibold mb-4">⚡ Challenges Solved</h4>
        <ul className="text-sm text-gray-400 space-y-2">
          {project.challenges.map((challenge, i) => (
            <li key={i} className="relative pl-6">
              <span className="absolute left-0 text-accent">{'>'}</span>
              {challenge}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="p-6 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-xs px-2 py-1 bg-primary-tertiary rounded text-gray-600">
            {tech}
          </span>
        ))}
      </div>

      {/* Link */}
      <div className="px-6 pb-6 flex gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent text-sm hover:underline transition-all inline-flex items-center gap-2"
            onClick={() => playClickSound()}
          >
            <span>View on GitHub →</span>
          </a>
        )}
      </div>
    </motion.article>
  )
}
