'use client'

import {
  buttonVariants,
  containerVariants,
  itemVariants,
} from '@/utils/animations'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from '../common/motion-wrapper'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export default function HeroSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 transition-all animate-in lg:px-12 max-w-7xl gap-16'
    >
      <div className='flex flex-col gap-4 items-center'>
        <MotionDiv
          variants={itemVariants}
          className='relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-cyan-200 via-cyan-500 to-cyan-800 animate-gradient-x group'
        >
          <Badge
            variant={'secondary'}
            className='relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200'
          >
            <Sparkles className='h-8 w-8 mr-2 text-cyan-600 animate-pulse'></Sparkles>

            <p className='text-base text-cyan-600'>Powered by AI</p>
          </Badge>
        </MotionDiv>

        <MotionH1
          variants={itemVariants}
          className='font-bold text-center'
        >
          Instantly turn{' '}
          <span className='bg-linear-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent'>
            PDF
          </span>{' '}
          into{' '}
          <span className='relative inline-block'>
            <MotionSpan
              whileHover={buttonVariants}
              className='relative z-10 px-2'
            >
              clear
            </MotionSpan>
            <span
              className='absolute inset-0 bg-cyan-200/50 -rotate-2 rounded-lg transform -skew-y-1'
              aria-hidden='true'
            ></span>
          </span>{' '}
          summaries
        </MotionH1>

        <MotionH2
          variants={itemVariants}
          className='text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600'
        >
          Get a beautiful summary reel of the document in seconds.
        </MotionH2>
      </div>

      <MotionDiv
        variants={itemVariants}
        whileHover={buttonVariants}
      >
        <Button
          variant='link'
          className='text-white text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 bg-linear-to-r from-slate-900 to-cyan-500 hover:from-cyan-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300'
        >
          <Link
            href='/dashboard'
            className='flex gap-2 items-center'
          >
            <span>Try Sommaire</span>

            <ArrowRight className='animate-pulse' />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  )
}
