'use client'

import { pricingPlans } from '@/lib/pricing'
import { cn } from '@/lib/utils'
import { PriceType } from '@/types/billing'
import {
  containerVariants,
  itemVariants,
  listVariants,
} from '@/utils/animations'
import { ArrowRight, CheckIcon } from 'lucide-react'
import Link from 'next/link'
import { MotionDiv, MotionSection } from '../common/motion-wrapper'

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => (
  <MotionDiv
    variants={listVariants}
    whileHover={{ scale: 1.02 }}
    className='relative w-full max-w-lg 
    hover:scale-105 hover:transition-all duration-300'
  >
    <div
      className={cn(
        'relative flex flex-col h-full gap-4 z-10 p-8 border-2 border-cyan-600 rounded-2xl',
      )}
    >
      <MotionDiv
        variants={listVariants}
        className='flex justify-between items-center gap-4'
      >
        <div className='flex flex-col gap-2'>
          <p className='text-lg lg:text-xl font-bold capitalize'>{name}</p>

          <p>{description}</p>
        </div>
      </MotionDiv>

      <MotionDiv
        variants={listVariants}
        className='flex gap-2 justify-center'
      >
        <p className='text-5xl tracking-tight font-extrabold'>${price}</p>

        <div className='flex items-center'>
          <p className='text-sm'>/month</p>
        </div>
      </MotionDiv>

      <MotionDiv
        variants={listVariants}
        className='space-y-2.5 leading-relaxed text-base flex-1 flex flex-col gap-2'
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className='flex items-center gap-2 m-0'
          >
            <CheckIcon size={18} />

            <span>{item}</span>
          </li>
        ))}
      </MotionDiv>

      <MotionDiv
        variants={listVariants}
        className='space-y-2 flex justify-center w-full'
      >
        <Link
          href={paymentLink}
          className={cn(
            'w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-cyan-600 to-cyan-800 hover:from-cyan-800 hover:to-cyan-600 text-white py-2',
            id === 'pro' &&
              'from-cyan-800 to-cyan-600 hover:from-cyan-600 hover:to-cyan-800',
          )}
        >
          Buy Now <ArrowRight size={18} />
        </Link>
      </MotionDiv>
    </div>
  </MotionDiv>
)

export default function PricingSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
      className='relative overflow-hidden'
      id='pricing'
    >
      <div className='py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8'>
        <MotionDiv
          variants={itemVariants}
          className='flex items-center justify-center w-full'
        >
          <h2 className='uppercase font-bold tracking-wider text-xl text-cyan-600'>
            Pricing
          </h2>
        </MotionDiv>

        <div className='relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8'>
          {pricingPlans.map(plan => (
            <PricingCard
              key={plan.id}
              {...plan}
            />
          ))}
        </div>
      </div>
    </MotionSection>
  )
}
