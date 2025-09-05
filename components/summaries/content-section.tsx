import { parseEmojiPoint, splitByDiamondSymbol } from '@/utils/summary-helpers'
import { MotionDiv } from '../common/motion-wrapper'
import { containerVariants, itemVariants } from '@/utils/animations'

const EmojiPoint = ({ point }: { point: string }) => {
  const { emoji, text } = parseEmojiPoint(point) ?? {}

  return (
    <MotionDiv
      variants={itemVariants}
      className='group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all'
    >
      <div className='absolute inset-0 bg-linear-to from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl' />
      <div className='relative flex items-start gap-3'>
        <span className='text-lg lg:text-xl shrink-0 pt-1'>{emoji}</span>
        <p className='text-lg lg:text-xl text-muted-foreground/90 leading-relaxed'>
          {text}
        </p>
      </div>
    </MotionDiv>
  )
}

export default function ContentSection({
  points,
}: {
  title: string
  points: string[]
}) {
  const processedPoints: string[] = points.flatMap(point =>
    splitByDiamondSymbol(point),
  )

  return (
    <MotionDiv
      variants={containerVariants}
      key={processedPoints.join('')}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='space-y-4'
    >
      {processedPoints.map((point, index) => {
        return (
          <EmojiPoint
            key={`point-${index}`}
            point={point}
          />
        )
      })}
    </MotionDiv>
  )
}
