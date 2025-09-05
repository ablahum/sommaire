import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function NavigationControls({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  onSectionSelect,
}: {
  currentSection: number
  totalSections: number
  onPrevious: () => void
  onNext: () => void
  onSectionSelect: (index: number) => void
}) {
  return (
    <div className='absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-cyan-500/10'>
      <div className='flex justify-between items-center'>
        <Button
          variant='ghost'
          size='icon'
          onClick={onPrevious}
          disabled={currentSection === 0}
          className={cn(
            'rounded-full w-12 h-12 bg-linear-to-r from-cyan-600 to-cyan-800 hover:from-cyan-800 hover:to-cyan-600 hover:scale-105 transition-all duration-300 group hover:no-underline',
            currentSection === 0
              ? 'opacity-50'
              : 'hover:scale-105 transition-all duration-300',
          )}
        >
          <ChevronLeft className='h-6 w-6 text-white' />
        </Button>

        <div className='flex gap-2'>
          {Array.from({ length: totalSections }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSectionSelect(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                currentSection === index
                  ? 'bg-linear-to-r from-cyan-500 to-cyan-600'
                  : 'bg-cyan-500/20 hover:bg-cyan-500/30',
              )}
            />
          ))}
        </div>

        <Button
          variant='ghost'
          size='icon'
          onClick={onNext}
          disabled={currentSection === totalSections - 1}
          className={cn(
            'rounded-full w-12 h-12 bg-linear-to-r from-cyan-600 to-cyan-800 hover:from-cyan-800 hover:to-cyan-600 hover:scale-105 transition-all duration-300 group hover:no-underline',
            currentSection === totalSections - 1
              ? 'opacity-50'
              : 'hover:scale-105 transition-all duration-300',
          )}
        >
          <ChevronRight className='h-6 w-6 text-white' />
        </Button>
      </div>
    </div>
  )
}
