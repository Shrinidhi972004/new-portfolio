import { useEffect, useState, useCallback } from 'react'

interface CursorPosition {
  x: number
  y: number
}

export function CustomCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])

  useEffect(() => {
    // Check for touch devices
    if ('ontouchstart' in window) {
      return
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, .bento-card, .project-card'
    )

    const handleElementEnter = () => setIsHovering(true)
    const handleElementLeave = () => setIsHovering(false)

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementEnter)
      el.addEventListener('mouseleave', handleElementLeave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter)
        el.removeEventListener('mouseleave', handleElementLeave)
      })
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <>
      {/* Outer cursor with crosshair */}
      <div
        className={`cursor-outer ${isHovering ? 'scale-150 opacity-100' : ''}`}
        style={{
          left: position.x,
          top: position.y,
          opacity: isVisible ? (isHovering ? 1 : 0.5) : 0,
        }}
      >
        {/* Crosshair lines */}
        <span className="absolute w-[1px] h-2.5 bg-accent left-1/2 -top-3 -translate-x-1/2" />
        <span className="absolute w-2.5 h-[1px] bg-accent top-1/2 -left-3 -translate-y-1/2" />
        <span className="absolute w-[1px] h-2.5 bg-accent left-1/2 -bottom-3 -translate-x-1/2" />
        <span className="absolute w-2.5 h-[1px] bg-accent top-1/2 -right-3 -translate-y-1/2" />
      </div>
      
      {/* Inner cursor dot */}
      <div
        className={`cursor-inner ${isHovering ? 'scale-50' : ''}`}
        style={{
          left: position.x,
          top: position.y,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}
