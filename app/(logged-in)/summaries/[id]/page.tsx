import BgGradient from '@/components/common/bg-gradient'
import { SummaryBody } from '@/components/summaries/summary-body'
import { SummaryHeader } from '@/components/summaries/summary-header'
import { SummaryViewer } from '@/components/summaries/summary-viewer'
import { getSummaryById } from '@/lib/summaries'
import { notFound } from 'next/navigation'

export default async function SummaryPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const id = params.id
  const summary = await getSummaryById(id)

  if (!summary) notFound()

  const {
    title,
    summary_text,
    file_name,
    word_count,
    created_at,
    original_file_url,
  } = summary
  const readingTime = Math.ceil((word_count || 0) / 200)

  return (
    <div className='relative isolate min-h-screen'>
      <BgGradient />

      <div className='container'>
        <div className='px-4 py-12 sm:py-24 flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <SummaryHeader
              createdAt={created_at}
              readingTime={readingTime.toString()}
              fileName={file_name}
              wordCount={word_count}
            />

            <SummaryBody
              title={title}
              originalFileUrl={original_file_url}
              summaryText={summary_text}
              fileName={file_name}
              createdAt={created_at}
            />
          </div>

          <div className='flex justify-center'>
            <SummaryViewer summary={summary.summary_text} />
          </div>
        </div>
      </div>
    </div>
  )
}
