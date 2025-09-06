import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function CTASection() {
  return (
    <section className='bg-gray-50'>
      <div className='py-12 lg:py-24 max-w-5xl mx-auto  px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items gap-8 justify-center space-y-4 text-center'>
          <div className='space-y-2 flex flex-col items-center gap-2 mb-0'>
            <h2 className='text-2xl tracking-tighter sm:text-3xl md:text-4xl font-bold m-0 bg-linear-to-r from-cyan-600 to-gray-900 bg-clip-text text-transparent leading-tight'>
              Ready to Save Hours of Reading Time?
            </h2>

            <p className='max-w-[700px] text-gray-600 md:text-xl md:leading-relaxed lg:leading-relaxed xl:leading-relaxed dark:text-gray-400'>
              Transforming lengthy documents into clear, actionable insights
              starts with our AI-powered summarizer.
            </p>
          </div>

          <div className='flex flex-col gap-2 min-[400px]:flex-row justify-center'>
            <div>
              <Button
                size='lg'
                variant='link'
                className='w-full min-[400px]:w-auto bg-gradient-to-r bg-linear-to-r from-cyan-600 to-cyan-800 hover:from-cyan-800 hover:to-cyan-600 hover:scale-105 transition-all duration-300 group hover:no-underline text-white'
              >
                <Link
                  href='/dashboard'
                  className='flex items-center justify-center'
                >
                  Get Started
                  <ArrowRight className='ml-2 h-4 w-4 animate-pulse' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
