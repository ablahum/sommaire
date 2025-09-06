import BgGradient from '@/components/common/bg-gradient'
import UploadForm from '@/components/upload/upload-form'
import { UploadHeader } from '@/components/upload/upload-header'
import { AUTO_LOGIN_EMAIL, AUTO_LOGIN_USERID } from '@/lib/env'
import { hasReachedUploadLimit } from '@/lib/limits'
import { redirect } from 'next/navigation'

export default async function Page() {
  const userId = AUTO_LOGIN_USERID
  const userEmail = AUTO_LOGIN_EMAIL

  const { hasReachedLimit } = await hasReachedUploadLimit(userEmail, userId)
  if (hasReachedLimit) redirect('/dashboard')

  return (
    <section className='min-h-screen'>
      <BgGradient />

      <div className='container max-w-7xl lg:py-48 md:py-36 py-24 px-4'>
        <div className='flex flex-col items-center justify-center gap-8 text-center'>
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  )
}
