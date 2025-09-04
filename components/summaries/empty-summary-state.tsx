import { FileText } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function EmptySummaryState() {
  return (
    <div className='text-center lg:my-36 my-24'>
      <div className='flex flex-col items-center gap-2'>
        <FileText className='w-16 h-16 mb-2 text-cyan-600' />

        <h2 className='text-xl font-semibold'>No Summary</h2>

        <p className='text-gray-600 max-w-md'>
          Upload your first PDF to get started with AI-Powered Summaries.
        </p>

        <Link href='/upload'>
          <Button
            variant={'link'}
            className='mt-2 text-white bg-linear-to-r from-cyan-600 to-cyan-800 hover:from-cyan-800 hover:to-cyan-600 hover:scale-105 transition-all duration-300 hover:no-underline'
          >
            Create Your First Summary
          </Button>
        </Link>
      </div>
    </div>
  )
}
