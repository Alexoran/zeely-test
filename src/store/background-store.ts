import { create } from 'zustand'

export const MAX_PROMPT_CHARS = 250

export type Background = {
  id: string
  src: string
  isGenerating?: boolean
  progress?: number
  timeRemaining?: string
}

type HistoryState = {
  prompt: string
}

type BackgroundState = {
  // Sidebar state
  isOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void

  // Prompt
  prompt: string
  setPrompt: (prompt: string) => void

  // Backgrounds
  backgrounds: Background[]
  selectedId: string | null
  selectBackground: (id: string) => void

  // Generation
  isGenerating: boolean
  startGeneration: () => void

  // History (undo/redo)
  history: HistoryState[]
  historyIndex: number
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  saveToHistory: (newPrompt: string) => void

  regeneratePrompt: () => void
}

const SAMPLE_PROMPTS = [
  'Animate glowing rays pulsating from behind the bottle, leaves gently swaying, and golden sparkles floating upward for a natural, radiant effect.',
  'Create a warm sunset backdrop with soft orange and pink gradients, gentle lens flares dancing across the scene.',
  'Design a minimalist studio setting with soft shadows and clean white background for professional product shots.',
  'Generate a cozy autumn forest scene with falling leaves and warm golden hour lighting.',
]

const getRandomPrompt = (excludeCurrent?: string): string => {
  const available = SAMPLE_PROMPTS.filter((p) => p !== excludeCurrent)
  return available[Math.floor(Math.random() * available.length)]
}

export const useBackgroundStore = create<BackgroundState>((set, get) => ({
  isOpen: false,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),

  prompt: SAMPLE_PROMPTS[0],
  setPrompt: (prompt) => set({ prompt }),

  // Backgrounds - initial mock data
  backgrounds: [
    { id: '1', src: '/mock/bg-1.svg' },
    { id: '2', src: '/mock/bg-2.svg' },
    { id: '3', src: '/mock/bg-3.svg' },
    { id: '4', src: '/mock/bg-4.svg' },
    { id: '5', src: '/mock/bg-5.svg' },
    { id: '6', src: '/mock/bg-6.svg' },
  ],
  selectedId: '2', // Default selected

  selectBackground: (id) => {
    set({ selectedId: id })
  },

  // Generation
  isGenerating: false,
  startGeneration: () => {
    const state = get()
    if (state.isGenerating) return

    // Save current prompt to history if it changed
    const lastHistoryPrompt = state.history[state.historyIndex]?.prompt
    if (state.prompt !== lastHistoryPrompt) {
      state.saveToHistory(state.prompt)
    }

    const newId = `gen-${Date.now()}`
    const newBackground: Background = {
      id: newId,
      src: '/mock/bg-generating.svg',
      isGenerating: true,
      progress: 0,
      timeRemaining: '1 minute left',
    }

    set({
      isGenerating: true,
      backgrounds: [newBackground, ...state.backgrounds],
    })

    // Simulate generation progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      const remaining = Math.ceil((100 - progress) / 5) * 3

      if (progress >= 100) {
        clearInterval(interval)
        set((s) => ({
          isGenerating: false,
          backgrounds: s.backgrounds.map((bg) =>
            bg.id === newId
              ? {
                  ...bg,
                  isGenerating: false,
                  progress: undefined,
                  timeRemaining: undefined,
                  src: `/mock/bg-${Math.floor(Math.random() * 6) + 1}.svg`,
                }
              : bg
          ),
          selectedId: newId,
        }))
      } else {
        set((s) => ({
          backgrounds: s.backgrounds.map((bg) =>
            bg.id === newId
              ? {
                  ...bg,
                  progress,
                  timeRemaining:
                    remaining > 60
                      ? `${Math.ceil(remaining / 60)} minute left`
                      : `${remaining} seconds left`,
                }
              : bg
          ),
        }))
      }
    }, 300)
  },

  // History - stores all prompt states, historyIndex points to current
  history: [{ prompt: SAMPLE_PROMPTS[0] }],
  historyIndex: 0,
  canUndo: false,
  canRedo: false,

  saveToHistory: (newPrompt: string) => {
    const state = get()

    // Remove any redo states and add new state
    const newHistory = state.history.slice(0, state.historyIndex + 1)
    newHistory.push({ prompt: newPrompt })

    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
      prompt: newPrompt,
      canUndo: true,
      canRedo: false,
    })
  },

  undo: () => {
    const state = get()
    if (state.historyIndex <= 0) return

    const newIndex = state.historyIndex - 1
    const prevState = state.history[newIndex]

    set({
      prompt: prevState.prompt,
      historyIndex: newIndex,
      canUndo: newIndex > 0,
      canRedo: true,
    })
  },

  redo: () => {
    const state = get()
    if (state.historyIndex >= state.history.length - 1) return

    const newIndex = state.historyIndex + 1
    const nextState = state.history[newIndex]

    set({
      prompt: nextState.prompt,
      historyIndex: newIndex,
      canUndo: true,
      canRedo: newIndex < state.history.length - 1,
    })
  },

  regeneratePrompt: () => {
    const state = get()
    const newPrompt = getRandomPrompt(state.prompt)
    state.saveToHistory(newPrompt)
  },
}))
