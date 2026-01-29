import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  soundEnabled: boolean
  toggleTheme: () => void
  toggleSound: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      soundEnabled: true,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),
      toggleSound: () =>
        set((state) => ({
          soundEnabled: !state.soundEnabled,
        })),
    }),
    {
      name: 'portfolio-theme',
    }
  )
)

// Sound utility
export const playClickSound = () => {
  const { soundEnabled } = useThemeStore.getState()
  if (!soundEnabled) return

  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'square'
    gainNode.gain.value = 0.15

    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.08)
  } catch {
    console.log('Audio not supported')
  }
}
