import BgGradient from '@/components/common/bg-gradient'
import EmptySummaryState from '@/components/summaries/empty-summary-state'
import SummaryCard from '@/components/summaries/summary-card'

import { Button } from '@/components/ui/button'
import { AUTO_LOGIN_EMAIL, AUTO_LOGIN_USERID } from '@/lib/env'
import { hasReachedUploadLimit } from '@/lib/limits'
import { getSummaries } from '@/lib/summaries'
import { ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
  const userId = AUTO_LOGIN_USERID
  const userEmail = AUTO_LOGIN_EMAIL

  // CHECK IF USER HAS REACHED THEIR LIMIT --------------
  const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(
    userEmail,
    userId,
  )

  // GET SUMMARIES --------------------------------------
  const summaries = await getSummaries(AUTO_LOGIN_USERID)

  console.log('INI SUMMARIES:', summaries)

  return (
    <main className='min-h-screen'>
      <BgGradient />

      <div className='container flex flex-col gap-4'>
        <div className='px-4 py-12 sm:py-24 flex flex-col gap-8'>
          <div className='flex gap-4 justify-between items-center'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-bold tracking-tight bg-linear-to-r from-cyan-600 to-gray-900 bg-clip-text text-transparent'>
                Your Summaries
              </h1>

              <p className='text-gray-600'>
                Transform your PDFs into concise, actionable insights
              </p>
            </div>

            {!hasReachedLimit && (
              <div className='flex-start'>
                <Button
                  variant='link'
                  className='bg-linear-to-r from-cyan-600 to-cyan-800 hover:from-cyan-800 hover:to-cyan-600 hover:scale-105 transition-all duration-300 group hover:no-underline'
                >
                  <Link
                    href='/upload'
                    className='flex items-center text-white gap-2'
                  >
                    <Plus />
                    New Summary
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {hasReachedLimit && (
            <div className='mb-6'>
              <div className='bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800'>
                <p className='text-sm'>
                  You've reached the limit of {uploadLimit} uploads on the Basic
                  plan.{' '}
                  <Link
                    href='/#pricing'
                    className='text-rose-800 underline font-medium underline-offset-4 inline-flex items-center'
                  >
                    Click here to upgrade to Pro{' '}
                    <ArrowRight className='w-4 h-4 inline-block' />
                  </Link>{' '}
                  for unlimited uploads.
                </p>
              </div>
            </div>
          )}

          {summaries.length === 0 ? (
            <EmptySummaryState />
          ) : (
            <div className='grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm_px-0'>
              {summaries.map((summary, idx) => (
                <SummaryCard
                  key={idx}
                  summary={summary}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
