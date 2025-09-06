import UpgradeRequired from '@/components/common/upgrade-required'
import { hasActivePlan } from '@/lib/billing'
import { AUTO_LOGIN_EMAIL } from '@/lib/env'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const userEmail = AUTO_LOGIN_EMAIL

  const hasActiveSubscription = await hasActivePlan(userEmail)

  if (!hasActiveSubscription) return <UpgradeRequired />

  return <>{children}</>
}
