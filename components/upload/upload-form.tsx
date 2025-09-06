'use client'

import { generateSummary, storeSummary } from '@/actions/upload-actions'
import { useUploadThing } from '@/utils/uploadthing'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import UploadFormInput from './upload-form-input'

const schema = z.object({
  file: z
    .instanceof(File, { message: 'Invalid file' })
    .refine(
      file => file.size <= 20 * 1024 * 1024,
      'File size must be less than 20MB',
    )
    .refine(
      file => file.type.startsWith('application/pdf'),
      'File must be a PDF',
    ),
})

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {},

    onUploadError: err => {
      console.error('error occurred while uploading', err)

      toast.error('Error occurred while uploading', {
        description: err.message,
      })
    },

    onUploadBegin: data => {},
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      // GET THE FILE ---------------------------------
      const formData = new FormData(e.currentTarget)
      const file = formData.get('file') as File

      // FILE VALIDATION ------------------------------
      const validatedFields = schema.safeParse({ file })

      if (!validatedFields.success) {
        toast.custom(() => (
          <div className='text-gray-600 bg-linear-to-tl from-cyan-600/50 to-white p-4 rounded-xl flex flex-col gap-2'>
            <div className='font-semibold'>❌ Something went wrong</div>
            <div className='text-sm'>
              {validatedFields.error.flatten().fieldErrors.file?.[0] ??
                'Invalid file'}
            </div>
          </div>
        ))

        setIsLoading(false)
        return
      }

      toast.custom(() => (
        <div className='text-gray-600 bg-linear-to-tl from-cyan-600/50 to-white p-4 rounded-xl flex flex-col gap-2'>
          <div className='font-semibold'>📑 Uploading PDF</div>
          <div className='text-sm'>We are Uploading your PDF...</div>
        </div>
      ))

      // UPLOAD VALIDATED FILE TO UPLOADTHING ---------
      const uploadResponse = await startUpload([file])

      if (!uploadResponse || uploadResponse.length === 0) {
        toast.custom(() => (
          <div className='text-gray-600 bg-linear-to-tl from-cyan-600/50 to-white p-4 rounded-xl flex flex-col gap-2'>
            <div className='font-semibold'>❌ Something went wrong</div>
            <div className='text-sm'>Please use a different file</div>
          </div>
        ))

        setIsLoading(false)
        return
      }

      // PROCESS THE FILE -----------------------------
      toast.custom(() => (
        <div className='text-gray-600 bg-linear-to-tl from-cyan-600/50 to-white p-4 rounded-xl flex flex-col gap-2'>
          <div className='font-semibold'>📑 Processing PDF...</div>
          <div className='text-sm'>
            Hang tight! Our AI is reading through your document! ✨
          </div>
        </div>
      ))

      // generate file summary
      const uploadFileUrl = uploadResponse[0].serverData.fileUrl
      const summary = await generateSummary({
        fileUrl: uploadFileUrl,
        fileName: file.name,
      })

      const { data = null, message = null } = summary || {}

      if (data) {
        let storeResult: any

        toast.custom(() => (
          <div className='text-gray-600 bg-linear-to-tl from-cyan-600/50 to-white p-4 rounded-xl flex flex-col gap-2'>
            <div className='font-semibold'>📑 Saving PDF...</div>
            <div className='text-sm'>
              Hang tight! We are Saving your Summary! 💫
            </div>
          </div>
        ))

        // save summary to db -------------------------
        if (data.summary) {
          storeResult = await storeSummary({
            summary: data.summary,
            fileUrl: uploadFileUrl,
            title: data.title,
            fileName: file.name,
          })

          toast.custom(() => (
            <div className='text-gray-600 bg-linear-to-tl from-cyan-600/50 to-white p-4 rounded-xl flex flex-col gap-2'>
              <div className='font-semibold'>🤩 Summary Generated</div>
              <div className='text-sm'>
                Your PDF has been successfully summarized and saved! 💫
              </div>
            </div>
          ))

          formRef.current?.reset()

          // redirect to summary page
          router.push(`/summaries/${storeResult.data.id}`)
        }
      }
    } catch (err) {
      setIsLoading(false)

      formRef.current?.reset()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-8 w-full max-w-2xl mx-auto'>
      <UploadFormInput
        ref={formRef}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
