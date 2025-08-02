'use server'

// import { getDbConnection } from '@/lib/db'
// import { formatFileNameAsTitle } from '@/utils/format-utils'
// import { auth } from '@clerk/nextjs/server'
// import { revalidatePath } from 'next/cache'
import { generateSummaryFromOpenAI } from '@/lib/openai'
import { generateSummaryFromGemini } from '@/lib/gemini'
import { fetchAndExtractPDF } from '@/lib/langchain'

interface PdfSummary {
  userId?: string
  fileUrl: string
  summary: string
  title: string
  fileName: string
}

// export async function getPDFText({ fileUrl, fileName }: { fileUrl: string; fileName: string }) {
//   if (!fileUrl) {
//     return {
//       success: false,
//       message: 'File Upload failed',
//       data: null
//     }
//   }
// }

export async function generatePdfSummary({ fileUrl, fileName }: { fileUrl: string; fileName: string }) {
  if (!fileUrl)
    return {
      success: false,
      message: 'File Upload failed',
      data: null
    }

  try {
    const pdfText = await fetchAndExtractPDF(fileUrl)
    let summary

    try {
      summary = await generateSummaryFromGemini(pdfText)
    } catch (err) {
      console.error('Gemini API Error:', err)

      if (err instanceof Error && err.message === 'RATE_LIMIT_EXCEEDED') {
        try {
          console.error('Gemini rate limit exceeded, trying OpenAI as fallback...')

          summary = await generateSummaryFromOpenAI(pdfText)
        } catch (openAIError) {
          console.error('OpenAI API also failed:', openAIError)

          summary = 'Failed to generate summary with available AI providers.'
        }
      } else {
        try {
          console.error('Gemini failed, trying OpenAI as fallback...')

          summary = await generateSummaryFromOpenAI(pdfText)

          console.log(summary)
        } catch (openAIError) {
          console.error('OpenAI API also failed:', openAIError)

          summary = 'Failed to generate summary with available AI providers.'
        }
      }
    }

    if (!summary)
      return {
        success: false,
        message: 'Failed to Generate Summary',
        data: null
      }

    // const formattedFileName = formatFileNameAsTitle(fileName)

    // return {
    //   success: true,
    //   message: 'Summary generated successfully',
    //   data: {
    //     title: formattedFileName,
    //     summary
    //   }
    // }
  } catch (err) {
    console.error(err)

    return {
      success: false,
      message: 'File Upload failed',
      data: null
    }
  }
}

// async function savePdfSummary({ userId, fileUrl, summary, title, fileName }: PdfSummary) {
//   //sql inserting pdf summary
//   try {
//     const sql = await getDbConnection()
//     const [savedSummary] = await sql`
//         INSERT INTO pdf_summaries (
//           user_id,
//           original_file_url,
//           summary_text,
//           title,
//           file_name
//         ) VALUES (
//           ${userId},
//           ${fileUrl},
//           ${summary},
//           ${title},
//           ${fileName}
//     ) RETURNING id, summary_text`
//     return savedSummary
//   } catch (error) {
//     console.log('Error saving PDF Summary', error)
//     throw error
//   }
// }

// export async function storePdfSummaryAction({ fileUrl, summary, title, fileName }: PdfSummary) {
//   //user is Logged in and has a userId
//   //savePdf Summary
//   //savePdfSUmmary()
//   let savedSummary: any
//   try {
//     const { userId } = await auth()
//     if (!userId) {
//       return {
//         success: false,
//         message: 'User not found'
//       }
//     }
//     savedSummary = await savePdfSummary({
//       userId,
//       fileUrl,
//       summary,
//       title,
//       fileName
//     })

//     if (!savedSummary) {
//       return {
//         success: false,
//         message: 'Failed to save PDF summary, please try again!'
//       }
//     }
//   } catch (error) {
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : 'Error Saving PDF Summary'
//     }
//   }
//   //Step 6: Revalidate our cache
//   revalidatePath(`/summaries/${savedSummary.id}`)
//   return {
//     success: true,
//     message: 'PDF Summary saved Successfully',
//     data: {
//       id: savedSummary.id
//     }
//   }
// }
