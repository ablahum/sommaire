import { pricingPlans } from '@/lib/pricing'
import { getUserUploadCount } from './summaries'
import { getPriceIdForActiveUser } from './billing'

export async function hasReachedUploadLimit(email: string, userId: string | null = null) {
  try {
    const uploadCount = await getUserUploadCount(userId)
    const priceId = await getPriceIdForActiveUser(email)
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
