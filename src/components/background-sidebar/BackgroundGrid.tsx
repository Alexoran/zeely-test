import { useBackgroundStore } from '@/store/background-store'
import { BackgroundThumbnail } from './BackgroundThumbnail'

export function BackgroundGrid() {
  const backgrounds = useBackgroundStore((s) => s.backgrounds)
  const selectedId = useBackgroundStore((s) => s.selectedId)
  const selectBackground = useBackgroundStore((s) => s.selectBackground)

  return (
    <div className="flex flex-col gap-[10px]">
      <h3 className="text-[14px] font-semibold text-black">Your backgrounds</h3>
      <div className="grid grid-cols-3 gap-3">
        {backgrounds.map((bg) => (
          <BackgroundThumbnail
            key={bg.id}
            background={bg}
            isSelected={selectedId === bg.id}
            onSelect={() => selectBackground(bg.id)}
          />
        ))}
      </div>
    </div>
  )
}
