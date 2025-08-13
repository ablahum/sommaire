import { pricingPlans } from '@/utils/constants'
import { getDbConnection } from './db'
import { getUserUploadCount } from './summaries'

export async function getPriceIdForActiveUser(email: string) {
  const sql = await getDbConnection()

  const query = await sql`
    SELECT price_id
    FROM users
    WHERE email = ${email}
    AND status = 'active'
  `

  return query?.[0]?.price_id || null
}

export async function hasActivePlan(email: string) {
  const sql = await getDbConnection()

  const query = await sql`
    SELECT price_id, status
    FROM users
    WHERE email = ${email}
    AND status = 'active'
    AND price_id IS NOT NULL
  `

  return query && query.length > 0
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId)
  const priceId = await getPriceIdForActiveUser(userId)
  const isPro = pricingPlans.find(plan => plan.priceId === priceId)?.id === 'pro'
  const uploadLimit: number = isPro ? 1000 : 3

  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit }
}
