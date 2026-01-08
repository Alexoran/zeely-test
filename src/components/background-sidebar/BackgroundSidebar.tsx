import { useBackgroundStore } from '@/store/background-store'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetCloseButton,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BackgroundIdeaSection } from './BackgroundIdeaSection'
import { GenerateButton } from './GenerateButton'
import { BackgroundGrid } from './BackgroundGrid'

export function BackgroundSidebar() {
  const isOpen = useBackgroundStore((s) => s.isOpen)
  const closeSidebar = useBackgroundStore((s) => s.closeSidebar)

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeSidebar()}>
      <SheetContent side="right" className="flex flex-col p-0">
        <SheetHeader className="px-5 pt-8 pb-0">
          <SheetTitle className="font-bold text-[22px]">Change background</SheetTitle>
          <SheetCloseButton />
        </SheetHeader>

        <ScrollArea className="flex-1 min-h-0">
          <div className="flex flex-col px-5 py-6">
            <BackgroundIdeaSection />
            <div className="mt-6">
              <GenerateButton />
            </div>
            <div className="mt-10">
              <BackgroundGrid />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
