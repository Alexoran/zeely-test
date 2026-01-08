import type { Background } from '@/store/background-store'
import { CircularProgress } from './CircularProgress'
import { cn } from '@/lib/utils'

type BackgroundThumbnailProps = {
  background: Background
  isSelected: boolean
  onSelect: () => void
}

export function BackgroundThumbnail({
  background,
  isSelected,
  onSelect,
}: BackgroundThumbnailProps) {
  const { isGenerating, progress, timeRemaining, src } = background

  return (
    <button
      onClick={onSelect}
      disabled={isGenerating}
      className={cn(
        'relative w-[112px] h-[198px] rounded-lg overflow-hidden transition-all',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
        !isGenerating && 'hover:opacity-90 cursor-pointer',
        isGenerating && 'cursor-default'
      )}
    >
      {/* Background image */}
      <img
        src={src}
        alt="Background option"
        className={cn(
          'w-full h-full object-cover',
          isGenerating && 'brightness-50'
        )}
      />

      {/* Selection border */}
      {isSelected && !isGenerating && (
        <div className="absolute inset-0 rounded-lg border-[2px] border-black pointer-events-none" />
      )}

      {/* Generating overlay */}
      {isGenerating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CircularProgress progress={progress ?? 0} />
          {timeRemaining && (
            <span className="absolute bottom-[13px] text-white text-[12px] font-semibold">
              {timeRemaining}
            </span>
          )}
        </div>
      )}

      {/* Default badge */}
      {isSelected && !isGenerating && (
        <div className="absolute top-[8px] left-[8px] bg-white/90 text-[#404040] text-[10px] font-bold w-[50px] h-[19px] grid place-items-center rounded-md uppercase border border-[#C0BDB4]">
          <span className="translate-y-px">Default</span>
        </div>
      )}

    </button>
  )
}
