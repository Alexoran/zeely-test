import { useBackgroundStore } from '@/store/background-store'
import { BackgroundSidebar } from '@/components/background-sidebar'
import { Button } from '@/components/ui/button'

function App() {
  const openSidebar = useBackgroundStore((s) => s.openSidebar)
  const selectedId = useBackgroundStore((s) => s.selectedId)
  const backgrounds = useBackgroundStore((s) => s.backgrounds)

  const selectedBg = backgrounds.find((bg) => bg.id === selectedId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-amber-50 flex items-center justify-center p-8">
      <div className="fixed top-20 left-20 w-72 h-72 bg-violet-300 rounded-full blur-[128px] opacity-40 pointer-events-none" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-amber-200 rounded-full blur-[128px] opacity-50 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200 rounded-full blur-[200px] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">
            AI Background Studio
          </h1>
          <p className="text-neutral-500 text-lg">
            Create stunning backgrounds for your products
          </p>
        </div>

        {/* Phone mockup with selected background */}
        <div className="relative">
          {/* Phone frame */}
          <div className="relative w-[280px] h-[560px] bg-neutral-900 rounded-[48px] p-3 shadow-2xl shadow-neutral-900/20">
            <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-neutral-800">
              {selectedBg && (
                <img
                  src={selectedBg.src}
                  alt="Selected background"
                  className="w-full h-full object-cover"
                />
              )}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-32 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                  <span className="text-white/40 text-xs">Product</span>
                </div>
              </div>

              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-neutral-900 rounded-full" />
            </div>
          </div>

          <div className="absolute -right-16 top-20 bg-white px-4 py-2 rounded-full shadow-lg shadow-neutral-900/10 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-neutral-700">AI Ready</span>
          </div>

          <div className="absolute -left-12 bottom-32 bg-white px-4 py-2 rounded-full shadow-lg shadow-neutral-900/10">
            <span className="text-sm font-medium text-neutral-700">1 credit</span>
          </div>
        </div>

        <Button
          onClick={openSidebar}
          className="px-8 h-12 text-base bg-neutral-900 hover:bg-neutral-800 rounded-full shadow-lg shadow-neutral-900/20 hover:shadow-xl hover:shadow-neutral-900/25 transition-all"
        >
          Change background
        </Button>

        <p className="text-neutral-400 text-sm">
          Click to open the background generator
        </p>
      </div>

      <BackgroundSidebar />
    </div>
  )
}

export default App
