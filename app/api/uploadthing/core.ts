import { createUploadthing, type FileRouter } from 'uploadthing/next'

const file = createUploadthing()

// UPLOADTHING'S MIDDLEWARE (AUTH) -----------------------
export const ourFileRouter = {
  pdfUploader: file({ pdf: { maxFileSize: '32MB' } })
    .middleware(async ({ req }) => {
      const userId = 'user_30drthVvapnRdw1VWejcY70wGwe'

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
