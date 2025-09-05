import { Calendar, ChevronLeft, Clock, FileText } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
// import { SourceInfo } from './source-info'

export function SummaryHeader({
  createdAt,
  readingTime,
  fileName,
  wordCount,
}: {
  createdAt: string
  readingTime: string
  fileName: string
  wordCount: string
}) {
  return (
    <div className='flex gap-4 items-center justify-between'>
      <div className='flex flex-wrap items-center gap-4'>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <Calendar className='h-4 w-4 text-cyan-600' />
          {new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <Clock className='h-4 w-4 text-cyan-600' />
          {Number(readingTime) > 1
            ? `${readingTime} mins`
            : `${readingTime} min`}{' '}
          read
        </div>

        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <FileText className='h-4 w-4 text-cyan-600' />
          {wordCount?.toLocaleString()} words
        </div>

        {fileName && (
          <div className='hidden sm:flex items-center gap-2 text-sm text-gray-600'>
            <FileText className='h-4 w-4 text-cyan-600' />

            {fileName}
          </div>
        )}
      </div>

      <Link href='/dashboard'>
        <Button
          variant='link'
          className='text-white bg-linear-to-r from-cyan-600 to-cyan-800 hover:from-cyan-800 hover:to-cyan-600 hover:scale-105 transition-all duration-300 group hover:no-underline'
        >
          <Link
            href='/dashboard'
            className='flex items-center gap-2'
          >
            <ChevronLeft />
            Back
          </Link>
        </Button>
      </Link>
    </div>
  )
}
