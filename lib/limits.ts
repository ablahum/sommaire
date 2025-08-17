import { pricingPlans } from '@/lib/pricing'
import { getUserUploadCount } from './summaries'
import { getPriceIdForActiveUser } from './billing'

export async function hasReachedUploadLimit(userId: string) {
  try {
    const uploadCount = await getUserUploadCount(userId)
    const priceId = await getPriceIdForActiveUser(userId)
    const isPro = pricingPlans.find(plan => plan.priceId === priceId)?.id === 'pro'
    const uploadLimit: number = isPro ? 1000 : 3

    return {
      hasReachedLimit: uploadCount >= uploadLimit,
      uploadLimit
    }
  } catch (err) {
    console.error('Error checking upload limit for user:', err)

    return {
      hasReachedLimit: true,
      uploadLimit: 0
    }
  }
}
