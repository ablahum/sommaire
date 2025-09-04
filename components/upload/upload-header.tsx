import { Sparkles } from 'lucide-react'
import { Badge } from '../ui/badge'

export function UploadHeader() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 text-center'>
      <div className='relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-cyan-200 via-cyan-600 to-cyan-800 animate-gradient-x group'>
        <Badge
          variant={'secondary'}
          className='relative sm:px-6 px-2 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200 gap-2'
        >
          <Sparkles className='h-8 w-8 text-cyan-600 animate-pulse'></Sparkles>

          <p className='sm:text-base text-cyan-600 text-sm'>
            AI-Powered Content Creation
          </p>
        </Badge>
      </div>

      <div className='capitalize text-3xl font-bold tracking-tight sm:text-4xl'>
        Start Uploading{' '}
        <span className='relative inline-block'>
          <span className='relative z-10'>Your PDF</span>

          <span
            className='absolute inset-0 bg-cyan-200/50 
          -rotate-2 rounded-lg transform -skew-y-1'
            aria-hidden='true'
          ></span>
        </span>
      </div>

      <div className='text-lg leading-8 max-w-2xl text-gray-600'>
        <p>Upload your PDF and let our AI do the magic! ✨</p>
      </div>
    </div>
  )
}
