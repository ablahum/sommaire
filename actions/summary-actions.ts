'use server'

import { deleteSummaryById, getSummaryFileUrlById } from '@/lib/summaries'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { UTApi } from 'uploadthing/server'

const utAPI = new UTApi()

// DELETE FILE FROM UPLOADTHING --------------------------
async function deleteFile(fileUrl: string) {
  try {
    const url = new URL(fileUrl)
    const segments = url.pathname.split('/').filter(Boolean)
    const fileIndex = segments.findIndex(seg => seg === 'f')
    const fileKey =
      fileIndex !== -1 && segments[fileIndex + 1]
        ? segments[fileIndex + 1]
        : segments.at(-1)

    if (!fileKey)
      throw new Error('Unable to parse UploadThing file key from URL')

    await utAPI.deleteFiles([fileKey])

    return true
  } catch (err) {
    console.error('Error deleting file from UploadThing:', err)

    return false
  }
}

// DELETE SUMMARY FROM DB -------------------------------
export async function deleteSummary({ summaryId }: { summaryId: string }) {
  try {
    const user = await currentUser()
    const userId = user?.id
    if (!userId) throw new Error('User not found')

    const fileUrl = await getSummaryFileUrlById(summaryId, userId)
    if (!fileUrl) return { success: false, message: 'Summary not found' }

    const uploadThingDelete = await deleteFile(fileUrl)
    const deletedId = await deleteSummaryById(summaryId, userId)

    if (deletedId) {
      revalidatePath('/dashboard')
      return {
        success: true,
        message: uploadThingDelete
          ? 'Summary and file deleted successfully'
          : 'Summary deleted, but file deletion failed',
      }
    }

    return { success: false, message: 'Failed to delete summary' }
  } catch (err) {
    console.error('Error Deleting Summary', err)

    return { success: false, message: 'Error deleting summary' }
  }
}
