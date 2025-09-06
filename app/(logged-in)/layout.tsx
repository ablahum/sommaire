import UpgradeRequired from '@/components/common/upgrade-required'
import { hasActivePlan } from '@/lib/billing'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const userEmail = 'ablahum@gmail.com'

  const hasActiveSubscription = await hasActivePlan(userEmail)

  if (!hasActiveSubscription) return <UpgradeRequired />

  return <>{children}</>
}
