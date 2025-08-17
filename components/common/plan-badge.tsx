import { currentUser } from '@clerk/nextjs/server'
import { Crown } from 'lucide-react'
import { getPriceIdForActiveUser } from '@/lib/billing'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import { pricingPlans } from '@/lib/pricing'

export default async function PlanBadge() {
  const user = await currentUser()
  if (!user?.id) return null

  let priceId: string | null = null
  priceId = await getPriceIdForActiveUser(user.id)

  let planName = 'Buy a plan'
  const plan = pricingPlans.find(plan => plan.priceId === priceId)

  if (plan) planName = plan.name

  return (
    <Badge
      variant='outline'
      className={cn('ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center', !priceId && 'from-red-100 to-red-200 border-red-300')}
    >
      <Crown className={cn('w-3 h-3 mr-1 text-amber-600', !priceId && 'text-red-600')} />
      {planName}
    </Badge>
  )
}
