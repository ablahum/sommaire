import { AUTO_LOGIN_USERID } from '@/lib/env'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const file = createUploadthing()

// UPLOADTHING'S MIDDLEWARE (AUTH) -----------------------
export const ourFileRouter = {
  pdfUploader: file({ pdf: { maxFileSize: '32MB' } })
    .middleware(async ({ req }) => {
      const userId = AUTO_LOGIN_USERID

      return { userId }
    })

    .onUploadComplete(async ({ metadata, file }) => {
      return {
        userId: metadata.userId,
        fileUrl: file.ufsUrl,
        fileName: file.name
      }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
