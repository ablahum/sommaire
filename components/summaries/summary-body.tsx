import { ExternalLink } from 'lucide-react'
import { DownloadSummaryButton } from './download-summary-button'
import { Button } from '../ui/button'

export function SummaryBody({
  title,
  originalFileUrl,
  summaryText,
  fileName,
  createdAt,
}: {
  title: string
  originalFileUrl: string
  summaryText: string
  fileName: string
  createdAt: string
}) {
  return (
    <div className='flex justify-between items-center gap-4'>
      <h1 className='text-2xl lg:text-4xl font-bold lg:tracking-tight bg-linear-to-r from-cyan-600 via-cyan-800 to-gray-900 bg-clip-text text-transparent truncate'>
        {title}
      </h1>

      <div className='flex gap-4'>
        <Button
          variant='ghost'
          size='sm'
          className='bg-transparent text-cyan-600 hover:bg-cyan-600 hover:text-white'
          asChild
        >
          <a
            href={originalFileUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            <ExternalLink className='h-4 w-4' />
            <span className='hidden sm:inline'>
              View <span className='hidden md:inline'>Original</span>
            </span>
          </a>
        </Button>

        <DownloadSummaryButton
          title={title}
          summaryText={summaryText}
          fileName={fileName}
          createdAt={createdAt}
        />
      </div>
    </div>
  )
}
