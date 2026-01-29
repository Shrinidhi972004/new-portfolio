import { useEffect } from 'react'
import { useThemeStore } from './store/themeStore'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { Scanlines } from './components/Scanlines'

function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    // Apply theme class to both html and body for maximum compatibility
    document.documentElement.className = theme
    document.body.className = theme
  }, [theme])

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Scanlines />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
