import { currentUser } from '@clerk/nextjs/server'
import { UploadThingError } from 'uploadthing/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const file = createUploadthing()

// UPLOADTHING'S MIDDLEWARE (AUTH) -----------------------
export const ourFileRouter = {
  pdfUploader: file({ pdf: { maxFileSize: '32MB' } })
    .middleware(async ({ req }) => {
      const user = await currentUser()

      if (!user) throw new UploadThingError('Unauthorized')

      return { userId: user.id }
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
