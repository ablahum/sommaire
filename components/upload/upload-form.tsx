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

      // GET THE FILE ---------------------------------
      const formData = new FormData(e.currentTarget)
      const file = formData.get('file') as File

      // FILE VALIDATION ------------------------------
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

      // UPLOAD VALIDATED FILE TO UPLOADTHING ---------
      const uploadResponse = await startUpload([file])

      if (!uploadResponse || uploadResponse.length === 0) {
        toast.error('❌ Something went wrong', {
          description: 'Please use a different file'
        })

        setIsLoading(false)
        return
      }

      // PROCESS THE FILE -----------------------------
      toast('📑 Processing PDF', {
        description: 'Hang tight! Our AI is reading through your document! ✨'
      })

      // generate file summary
      const uploadFileUrl = uploadResponse[0].serverData.fileUrl
      const summary = await generateSummary({
        fileUrl: uploadFileUrl,
        fileName: file.name
      })

      const { data = null, message = null } = summary || {}

      if (data) {
        let storeResult: any

        toast('📑 Saving PDF', {
          description: 'Hang tight! We are Saving your Summary! 💫'
        })

        // save summary to db -------------------------
        if (data.summary) {
          storeResult = await storeSummary({
            summary: data.summary,
            fileUrl: uploadFileUrl,
            title: data.title,
            fileName: file.name
          })

          toast('🤩 Summary Generated', {
            description: 'Your PDF has been successfully summarized and saved! 💫'
          })

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
