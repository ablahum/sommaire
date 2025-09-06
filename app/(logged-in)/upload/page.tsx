import BgGradient from '@/components/common/bg-gradient'
import UploadForm from '@/components/upload/upload-form'
import { UploadHeader } from '@/components/upload/upload-header'
import { hasReachedUploadLimit } from '@/lib/limits'
import { redirect } from 'next/navigation'

export default async function Page() {
  const userId = 'user_30drthVvapnRdw1VWejcY70wGwe'
  const userEmail = 'ablahum@gmail.com'

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
