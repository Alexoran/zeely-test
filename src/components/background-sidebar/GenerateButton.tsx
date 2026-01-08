import { useBackgroundStore, MAX_PROMPT_CHARS } from '@/store/background-store'
import { Button } from '@/components/ui/button'
import generationIcon from '@/assets/generation-icon.svg'

export function GenerateButton() {
  const prompt = useBackgroundStore((s) => s.prompt)
  const isGenerating = useBackgroundStore((s) => s.isGenerating)
  const startGeneration = useBackgroundStore((s) => s.startGeneration)

  const isOverLimit = prompt.length > MAX_PROMPT_CHARS

  return (
    <Button
      onClick={startGeneration}
      disabled={isGenerating || isOverLimit}
      className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 text-white gap-[8px] rounded-[100px]"
    >
      <img src={generationIcon} alt="" className="w-4 h-4" />
      {isGenerating ? 'Generating...' : 'Generate BG for 1 credit'}
    </Button>
  )
}
