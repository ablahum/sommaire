'use client'

import { z } from 'zod'
import UploadFormInput from './upload-form-input'
import { useUploadThing } from '@/utils/uploadthing'
import { toast } from 'sonner'
import { generatePdfSummary, storePdfSummaryAction } from '@/actions/upload-actions'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const schema = z.object({
  file: z
    .instanceof(File, { message: 'Invalid file' })
    .refine(file => file.size <= 20 * 1024 * 1024, 'File size must be less than 20MB')
    .refine(file => file.type.startsWith('application/pdf'), 'File must be a PDF')
})

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      console.log('uploaded successfully!')
    },

    onUploadError: err => {
      console.error('error occurred while uploading', err)
      toast.error('Error occurred while uploading', {
        description: err.message
      })
    },

    onUploadBegin: data => {
      console.log('upload has begun for', data)
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      const formData = new FormData(e.currentTarget)
      const file = formData.get('file') as File
      const validatedFields = schema.safeParse({ file })

      if (!validatedFields.success) {
        toast.error('❌ Something went wrong', {
          description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file'
        })

        setIsLoading(false)
        return
      }

      toast('📑 Uploading PDF', {
        description: 'We are Uploading your PDF...'
      })

      const uploadResponse = await startUpload([file])
      if (!uploadResponse || uploadResponse.length === 0) {
        toast.error('❌ Something went wrong', {
          description: 'Please use a different file'
        })

        setIsLoading(false)
        return
      }

      toast('📑 Processing PDF', {
        description: 'Hang tight! Our AI is reading through your document! ✨'
      })

      const uploadFileUrl = uploadResponse[0].serverData.fileUrl
      const summary = await generatePdfSummary({
        fileUrl: uploadFileUrl,
        fileName: file.name
      })

      const { data = null, message = null } = summary || {}

      if (data) {
        let storeResult: any

        toast('📑 Saving PDF', {
          description: 'Hang tight! We are Saving your Summary! 💫'
        })

        if (data.summary) {
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: uploadFileUrl,
            title: data.title,
            fileName: file.name
          })

          toast('🤩 Summary Generated', {
            description: 'Your PDF has been successfully summarized and saved! 💫'
          })

          formRef.current?.reset()
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
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
