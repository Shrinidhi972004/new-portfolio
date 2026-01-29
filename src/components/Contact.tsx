import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { contactInfo, socialLinks } from '../data/portfolio'
import { playClickSound } from '../store/themeStore'
import { sendContactMessage } from '../services/api'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    playClickSound()

    try {
      await sendContactMessage(data)
      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="contact" className="py-24" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.h2
          className="text-3xl font-semibold mb-12 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent">#</span> Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            className="glass overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="py-2 px-4 bg-primary-tertiary border-b border-gray-800">
              <span className="text-xs text-gray-500">contact_info.json</span>
            </div>
            <div className="p-6">
              <pre className="text-sm leading-[1.8] mb-8 overflow-x-auto">
{`{
  `}<span className="json-key">"status"</span>: <span className="json-string">"{contactInfo.status}"</span>,
{`  `}<span className="json-key">"location"</span>: <span className="json-string">"{contactInfo.location}"</span>,
{`  `}<span className="json-key">"response_time"</span>: <span className="json-string">"{contactInfo.responseTime}"</span>,
{`  `}<span className="json-key">"links"</span>: {`{
    `}<span className="json-key">"github"</span>: <span className="json-string">"{contactInfo.links.github}"</span>,
{`    `}<span className="json-key">"linkedin"</span>: <span className="json-string">"{contactInfo.links.linkedin}"</span>,
{`    `}<span className="json-key">"email"</span>: <span className="json-string">"{contactInfo.links.email}"</span>
{`  }`}
{`}`}
              </pre>

              <div className="flex gap-4 flex-wrap">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-700 rounded text-sm text-gray-200 
                             hover:border-accent hover:text-accent transition-all"
                    onClick={() => playClickSound()}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="glass overflow-hidden"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="py-2 px-4 bg-primary-tertiary border-b border-gray-800">
              <span className="text-xs text-gray-500">send_message.sh</span>
            </div>
            <div className="p-6 space-y-6">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder=" "
                  autoComplete="name"
                />
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                {errors.name && (
                  <span className="text-xs text-red-500 mt-1 block">{errors.name.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder=" "
                  autoComplete="email"
                />
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                {errors.email && (
                  <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>
                )}
              </div>

              {/* Subject */}
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  {...register('subject')}
                  className={`form-input ${errors.subject ? 'border-red-500' : ''}`}
                  placeholder=" "
                />
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                {errors.subject && (
                  <span className="text-xs text-red-500 mt-1 block">{errors.subject.message}</span>
                )}
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  id="message"
                  {...register('message')}
                  className={`form-input min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                  placeholder=" "
                  rows={5}
                />
                <label htmlFor="message" className="form-label !top-8">
                  Message
                </label>
                {errors.message && (
                  <span className="text-xs text-red-500 mt-1 block">{errors.message.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`w-full btn-primary transition-all ${
                  status === 'success' ? 'bg-green-500 border-green-500' : ''
                } ${status === 'error' ? 'bg-red-500 border-red-500' : ''}`}
              >
                {status === 'idle' && 'Send Message'}
                {status === 'loading' && 'Sending...'}
                {status === 'success' && '✓ Sent!'}
                {status === 'error' && 'Failed - Try Again'}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
